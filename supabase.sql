
-- Add auto_renew column to jobs table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'jobs'
        AND column_name = 'auto_renew'
    ) THEN
        ALTER TABLE public.jobs
        ADD COLUMN auto_renew BOOLEAN DEFAULT false;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'jobs'
        AND column_name = 'paid_at'
    ) THEN
        ALTER TABLE public.jobs
        ADD COLUMN paid_at TIMESTAMP WITH TIME ZONE;
    END IF;
END
$$;

-- Create a scheduled cron job to check and update expired listings daily
SELECT cron.schedule(
  'expire-job-listings-daily',
  '0 0 * * *', -- Run at midnight every day
  $$
  SELECT
    net.http_post(
        url:='https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/expire-listings',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aHFianJoYmFqcGFiZmR3bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTk2OTMsImV4cCI6MjA1NzU3NTY5M30.1YGaLgfnwqmzn3f28IzmTxDKKX5NoJ1V8IbI3V4-WmM"}'::jsonb,
        body:='{}'::jsonb
    ) as result;
  $$
);

