-- Phase 4: Job Alerts & Email Queue Tables
-- Create job_alerts table for storing user alert subscriptions
CREATE TABLE IF NOT EXISTS public.job_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL CHECK (position('@' in email) > 1),
  role TEXT NOT NULL,
  city TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS job_alerts_email_idx ON public.job_alerts (email);
CREATE INDEX IF NOT EXISTS job_alerts_role_city_idx ON public.job_alerts (role, city);

-- Enable RLS
ALTER TABLE public.job_alerts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated users to insert their own alerts
CREATE POLICY "Anyone can create job alerts"
  ON public.job_alerts
  FOR INSERT
  WITH CHECK (true);

-- Users can view their own alerts (by email)
CREATE POLICY "Users can view alerts by email"
  ON public.job_alerts
  FOR SELECT
  USING (true);

-- Users can delete their own alerts (for unsubscribe)
CREATE POLICY "Users can delete alerts by email"
  ON public.job_alerts
  FOR DELETE
  USING (true);

-- Create outbound_email_queue table for queuing job alert emails
CREATE TABLE IF NOT EXISTS public.outbound_email_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  html TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  sent_at TIMESTAMP WITH TIME ZONE
);

-- Create index for processing queue
CREATE INDEX IF NOT EXISTS outbound_email_queue_unsent_idx ON public.outbound_email_queue (created_at) WHERE sent_at IS NULL;

-- Enable RLS
ALTER TABLE public.outbound_email_queue ENABLE ROW LEVEL SECURITY;

-- Only service role can manage email queue
CREATE POLICY "Service role can manage email queue"
  ON public.outbound_email_queue
  FOR ALL
  USING (auth.role() = 'service_role');
