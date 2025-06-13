
-- Create table for CTA interactions
CREATE TABLE public.cta_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cta_type TEXT NOT NULL,
  story_id UUID REFERENCES public.community_stories(id) ON DELETE CASCADE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.cta_interactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for cta_interactions
CREATE POLICY "Anyone can view CTA interactions" 
  ON public.cta_interactions 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create CTA interactions" 
  ON public.cta_interactions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Enable real-time for CTA interactions
ALTER TABLE public.cta_interactions REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cta_interactions;

-- Create indexes for better performance
CREATE INDEX idx_cta_interactions_user_id ON public.cta_interactions(user_id);
CREATE INDEX idx_cta_interactions_story_id ON public.cta_interactions(story_id);
CREATE INDEX idx_cta_interactions_cta_type ON public.cta_interactions(cta_type);
