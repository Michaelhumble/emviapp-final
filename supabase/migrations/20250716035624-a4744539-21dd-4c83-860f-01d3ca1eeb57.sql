-- Add matchmaking fields to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS available_for_hire BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS looking_for_work BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS just_moved BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS moved_to_city TEXT,
ADD COLUMN IF NOT EXISTS moved_to_state TEXT,
ADD COLUMN IF NOT EXISTS moved_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS matchmaking_radius INTEGER DEFAULT 25;

-- Create offers/pokes table for salon to artist communication
CREATE TABLE IF NOT EXISTS public.artist_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL,
  artist_id UUID NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
  offer_type TEXT DEFAULT 'poke' CHECK (offer_type IN ('poke', 'job_offer', 'collaboration')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '7 days')
);

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

-- Add RLS policies for artist_offers
ALTER TABLE public.artist_offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artists can view offers sent to them"
ON public.artist_offers FOR SELECT
USING (artist_id = auth.uid());

CREATE POLICY "Salon owners can view their sent offers"
ON public.artist_offers FOR SELECT  
USING (salon_id IN (
  SELECT id FROM salons WHERE owner_id = auth.uid()
  UNION
  SELECT salon_id FROM user_salon_access 
  WHERE user_id = auth.uid() AND access_type IN ('owner', 'manager')
));

CREATE POLICY "Salon owners can create offers"
ON public.artist_offers FOR INSERT
WITH CHECK (salon_id IN (
  SELECT id FROM salons WHERE owner_id = auth.uid()
  UNION
  SELECT salon_id FROM user_salon_access 
  WHERE user_id = auth.uid() AND access_type IN ('owner', 'manager')
));

CREATE POLICY "Artists can update offers sent to them"
ON public.artist_offers FOR UPDATE
USING (artist_id = auth.uid());

-- Add RLS policies for job_applications
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

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

-- Add RLS policies for ai_recommendations
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own recommendations"
ON public.ai_recommendations FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can update their recommendation interactions"
ON public.ai_recommendations FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "System can insert recommendations"
ON public.ai_recommendations FOR INSERT
WITH CHECK (true);

-- Add foreign key constraints
ALTER TABLE public.artist_offers
ADD CONSTRAINT fk_artist_offers_artist 
FOREIGN KEY (artist_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.job_applications
ADD CONSTRAINT fk_job_applications_artist
FOREIGN KEY (artist_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.ai_recommendations
ADD CONSTRAINT fk_ai_recommendations_user
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_artist_offers_artist_id ON public.artist_offers(artist_id);
CREATE INDEX IF NOT EXISTS idx_artist_offers_salon_id ON public.artist_offers(salon_id);
CREATE INDEX IF NOT EXISTS idx_artist_offers_status ON public.artist_offers(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_artist_id ON public.job_applications(artist_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON public.job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_user_id ON public.ai_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_type ON public.ai_recommendations(recommendation_type);

-- Add updated_at trigger for artist_offers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_artist_offers_updated_at 
BEFORE UPDATE ON public.artist_offers 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();