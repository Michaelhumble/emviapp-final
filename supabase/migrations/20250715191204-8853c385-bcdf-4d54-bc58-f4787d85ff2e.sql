-- Create user_activity table for live activity feed
CREATE TABLE public.user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  activity_type TEXT NOT NULL, -- 'post_created', 'contest_entered', 'achievement_earned', 'user_joined', 'milestone_reached'
  activity_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_featured BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view activity"
  ON public.user_activity
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create activity"
  ON public.user_activity
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create shares_tracking table for leaderboard and rewards
CREATE TABLE public.shares_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  shared_content_type TEXT NOT NULL, -- 'post', 'profile', 'app'
  shared_content_id UUID, -- Optional, for specific content
  platform TEXT, -- 'instagram', 'tiktok', 'twitter', 'facebook', 'other'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  points_awarded INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.shares_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own shares"
  ON public.shares_tracking
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create shares"
  ON public.shares_tracking
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Add creator status and community stats to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS creator_status TEXT DEFAULT 'member';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS total_posts INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS total_likes_received INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS total_shares INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS community_points INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS badges JSONB DEFAULT '[]';

-- Add indexes for performance
CREATE INDEX idx_user_activity_user_id ON public.user_activity(user_id);
CREATE INDEX idx_user_activity_created_at ON public.user_activity(created_at DESC);
CREATE INDEX idx_user_activity_type ON public.user_activity(activity_type);
CREATE INDEX idx_shares_tracking_user_id ON public.shares_tracking(user_id);
CREATE INDEX idx_shares_tracking_created_at ON public.shares_tracking(created_at DESC);

-- Create function to update profile stats
CREATE OR REPLACE FUNCTION public.update_profile_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update profiles table when community_posts are created/updated
  IF TG_TABLE_NAME = 'community_posts' AND TG_OP = 'INSERT' THEN
    UPDATE public.profiles 
    SET 
      total_posts = total_posts + 1,
      community_points = community_points + 5 -- 5 points per post
    WHERE id = NEW.user_id;
    
    -- Create activity entry
    INSERT INTO public.user_activity (user_id, activity_type, activity_data)
    VALUES (NEW.user_id, 'post_created', jsonb_build_object(
      'post_id', NEW.id,
      'content_preview', left(NEW.content, 100)
    ));
    
  ELSIF TG_TABLE_NAME = 'community_post_likes' AND TG_OP = 'INSERT' THEN
    -- Update the post owner's like count
    UPDATE public.profiles 
    SET 
      total_likes_received = total_likes_received + 1,
      community_points = community_points + 2 -- 2 points per like received
    WHERE id = (SELECT user_id FROM public.community_posts WHERE id = NEW.post_id);
    
  ELSIF TG_TABLE_NAME = 'shares_tracking' AND TG_OP = 'INSERT' THEN
    UPDATE public.profiles 
    SET 
      total_shares = total_shares + 1,
      community_points = community_points + NEW.points_awarded
    WHERE id = NEW.user_id;
    
    -- Create activity entry
    INSERT INTO public.user_activity (user_id, activity_type, activity_data)
    VALUES (NEW.user_id, 'content_shared', jsonb_build_object(
      'platform', NEW.platform,
      'content_type', NEW.shared_content_type,
      'points_earned', NEW.points_awarded
    ));
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers
CREATE TRIGGER update_profile_stats_posts
  AFTER INSERT ON public.community_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_profile_stats();

CREATE TRIGGER update_profile_stats_likes
  AFTER INSERT ON public.community_post_likes
  FOR EACH ROW EXECUTE FUNCTION public.update_profile_stats();

CREATE TRIGGER update_profile_stats_shares
  AFTER INSERT ON public.shares_tracking
  FOR EACH ROW EXECUTE FUNCTION public.update_profile_stats();

-- Enable realtime for new tables only (existing tables already added)
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_activity;
ALTER PUBLICATION supabase_realtime ADD TABLE public.shares_tracking;

-- Set replica identity for realtime
ALTER TABLE public.user_activity REPLICA IDENTITY FULL;
ALTER TABLE public.shares_tracking REPLICA IDENTITY FULL;