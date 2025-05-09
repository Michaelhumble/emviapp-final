
-- Create webhook_logs table for auditing purposes
CREATE TABLE IF NOT EXISTS public.webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_id TEXT,
  status TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add comment to table
COMMENT ON TABLE public.webhook_logs IS 'Log of processed webhook events from Stripe';

-- Enable Row Level Security
ALTER TABLE public.webhook_logs ENABLE ROW LEVEL SECURITY;

-- Add policy to allow admins to view webhook logs
CREATE POLICY "Only admins can view webhook logs" 
  ON public.webhook_logs 
  FOR SELECT 
  USING (auth.uid() IN (
    SELECT id FROM public.users WHERE role = 'admin'
  ));

-- Add policy for inserting webhook logs (for edge functions)
CREATE POLICY "Edge functions can insert webhook logs" 
  ON public.webhook_logs 
  FOR INSERT 
  WITH CHECK (true);
