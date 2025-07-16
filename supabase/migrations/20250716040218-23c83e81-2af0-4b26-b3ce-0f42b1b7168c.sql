-- Create job applications table for 1-tap apply  
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL,
  artist_id UUID NOT NULL,
  cover_letter TEXT,
  portfolio_urls TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}',
  UNIQUE(job_id, artist_id)
);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for job_applications
CREATE POLICY "Artists can view their own applications"
ON public.job_applications FOR SELECT
USING (artist_id = auth.uid());

CREATE POLICY "Artists can create applications"
ON public.job_applications FOR INSERT
WITH CHECK (artist_id = auth.uid());

CREATE POLICY "Job posters can view applications to their jobs"
ON public.job_applications FOR SELECT
USING (job_id IN (SELECT id FROM jobs WHERE user_id = auth.uid()));

CREATE POLICY "Job posters can update application status"
ON public.job_applications FOR UPDATE
USING (job_id IN (SELECT id FROM jobs WHERE user_id = auth.uid()));

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_job_applications_artist_id ON public.job_applications(artist_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON public.job_applications(job_id);