-- Create materialized view for recently filled jobs
CREATE MATERIALIZED VIEW IF NOT EXISTS public.mv_jobs_recently_filled AS
SELECT 
  j.id,
  j.title,
  j.location,
  j.pricing_tier,
  j.expires_at,
  COALESCE(j.image_url, j.image_urls[1]) AS cover_img,
  COALESCE(j.expires_at, j.created_at) AS sort_key
FROM public.jobs j
WHERE j.status = 'expired'
ORDER BY COALESCE(j.expires_at, j.created_at) DESC
LIMIT 12;

-- Indexes to support fast reads and concurrent refresh
CREATE UNIQUE INDEX IF NOT EXISTS mv_jobs_recently_filled_id_idx
  ON public.mv_jobs_recently_filled (id);

CREATE INDEX IF NOT EXISTS mv_jobs_recently_filled_sort_idx
  ON public.mv_jobs_recently_filled (sort_key DESC);

-- Helper function to refresh the MV
CREATE OR REPLACE FUNCTION public.refresh_mv_jobs_recently_filled()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Requires a unique index on the materialized view (created above)
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.mv_jobs_recently_filled;
END;
$$;

-- Enable pg_cron and schedule refresh every 5 minutes
CREATE EXTENSION IF NOT EXISTS pg_cron;

DO $$
BEGIN
  -- Create the refresh schedule if it doesn't already exist
  IF NOT EXISTS (
    SELECT 1 FROM cron.job WHERE jobname = 'refresh-mv-jobs-recently-filled'
  ) THEN
    PERFORM cron.schedule(
      'refresh-mv-jobs-recently-filled',
      '*/5 * * * *',
      $$ REFRESH MATERIALIZED VIEW CONCURRENTLY public.mv_jobs_recently_filled; $$
    );
  END IF;
END $$;