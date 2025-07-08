-- Add policy to allow public viewing of active jobs
-- This is needed for the main jobs page to display all active job postings

CREATE POLICY "Anyone can view active jobs" 
ON public.jobs 
FOR SELECT 
USING (status = 'active');