-- Schedule the seo-reindex-cron job to run every 2 hours
SELECT cron.schedule(
  'seo-reindex-cron',
  '0 */2 * * *', -- Every 2 hours
  $$
  SELECT net.http_post(
    url := 'https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/seo-reindex-cron',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aHFianJoYmFqcGFiZmR3bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTk2OTMsImV4cCI6MjA1NzU3NTY5M30.1YGaLgfnwqmzn3f28IzmTxDKKX5NoJ1V8IbI3V4-WmM'
    ),
    body := jsonb_build_object('trigger', 'cron', 'timestamp', now())
  ) AS request_id;
  $$
);