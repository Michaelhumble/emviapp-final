-- Add policy to allow service role (edge functions) to insert paid jobs as drafts
-- This is needed for the create-job-checkout edge function to create draft jobs

CREATE POLICY "Service role can insert paid jobs"
ON public.jobs
FOR INSERT
WITH CHECK (pricing_tier != 'free' OR auth.role() = 'service_role');