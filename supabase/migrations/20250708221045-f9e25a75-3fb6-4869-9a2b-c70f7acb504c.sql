-- Add policy to allow service role (edge functions) to update job status from draft to active
-- This is needed for the webhook-job-posting edge function to activate paid jobs after payment

CREATE POLICY "Service role can update job status"
ON public.jobs
FOR UPDATE
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');