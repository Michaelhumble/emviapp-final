-- Add performance indexes for jobs explorer queries
CREATE INDEX IF NOT EXISTS jobs_active_ix
  ON public.jobs (status, created_at DESC)
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS jobs_expired_ix
  ON public.jobs (status, expires_at DESC NULLS LAST);

CREATE INDEX IF NOT EXISTS jobs_category_ix
  ON public.jobs (status, category, created_at DESC);
