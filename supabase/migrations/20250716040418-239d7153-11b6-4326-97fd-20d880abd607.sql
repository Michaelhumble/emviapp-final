-- Create job applications table  
CREATE TABLE IF NOT EXISTS public.artist_job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL,
  user_id UUID NOT NULL,
  cover_letter TEXT,
  portfolio_urls TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE public.artist_job_applications ENABLE ROW LEVEL SECURITY;