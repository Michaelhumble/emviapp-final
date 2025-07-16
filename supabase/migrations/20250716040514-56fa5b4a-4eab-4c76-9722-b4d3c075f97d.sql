-- Add policies for artist_job_applications
CREATE POLICY "Artists can view their own applications"
ON public.artist_job_applications FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Artists can create applications"
ON public.artist_job_applications FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Job posters can view applications to their jobs"
ON public.artist_job_applications FOR SELECT
USING (job_id IN (SELECT id FROM jobs WHERE user_id = auth.uid()));

CREATE POLICY "Job posters can update application status"
ON public.artist_job_applications FOR UPDATE
USING (job_id IN (SELECT id FROM jobs WHERE user_id = auth.uid()));

-- Create AI recommendations table
CREATE TABLE IF NOT EXISTS public.ai_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  recommendation_type TEXT NOT NULL CHECK (recommendation_type IN ('job_match', 'artist_match', 'salon_match')),
  target_id UUID NOT NULL,
  score NUMERIC(3,2) DEFAULT 0.0,
  reasons TEXT[],
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  shown_at TIMESTAMP WITH TIME ZONE,
  clicked BOOLEAN DEFAULT false,
  dismissed BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;

-- Add policies for ai_recommendations
CREATE POLICY "Users can view their own recommendations"
ON public.ai_recommendations FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can update their recommendation interactions"
ON public.ai_recommendations FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "System can insert recommendations"
ON public.ai_recommendations FOR INSERT
WITH CHECK (true);