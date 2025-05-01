
-- SQL for listing_validation_logs table
-- This should be run via Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.listing_validation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id TEXT NOT NULL,
  listing_type TEXT NOT NULL,
  error_reason TEXT,
  referrer TEXT,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_agent TEXT,
  ip_address TEXT
);

-- Add comment to table
COMMENT ON TABLE public.listing_validation_logs IS 'Logs invalid or broken listing accesses';

-- Add Row Level Security to the table
ALTER TABLE public.listing_validation_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for insert
CREATE POLICY "Anyone can insert listing validation logs" 
ON public.listing_validation_logs FOR INSERT 
WITH CHECK (true);

-- Create policy for select (only admins can read)
CREATE POLICY "Only admins can read logs" 
ON public.listing_validation_logs FOR SELECT 
USING (auth.uid() IN (
  SELECT id FROM public.users WHERE role = 'admin'
));
