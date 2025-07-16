-- Enhanced post and comment system tables

-- Add missing columns to community_posts if not exists
ALTER TABLE public.community_posts 
ADD COLUMN IF NOT EXISTS mentions text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS hashtags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS views_count integer DEFAULT 0;

-- Create post mentions table for tracking @mentions
CREATE TABLE IF NOT EXISTS public.community_post_mentions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id uuid REFERENCES public.community_posts(id) ON DELETE CASCADE,
  mentioned_user_id uuid NOT NULL,
  mentioned_by_user_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on mentions table
ALTER TABLE public.community_post_mentions ENABLE ROW LEVEL SECURITY;

-- Policies for mentions
CREATE POLICY "Anyone can view mentions" ON public.community_post_mentions
  FOR SELECT USING (true);

CREATE POLICY "Users can create mentions" ON public.community_post_mentions
  FOR INSERT WITH CHECK (auth.uid() = mentioned_by_user_id);

-- Add nested replies support to comments
ALTER TABLE public.community_post_comments 
ADD COLUMN IF NOT EXISTS thread_level integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS reply_to_user_id uuid;

-- Create comment mentions table
CREATE TABLE IF NOT EXISTS public.community_comment_mentions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id uuid REFERENCES public.community_post_comments(id) ON DELETE CASCADE,
  mentioned_user_id uuid NOT NULL,
  mentioned_by_user_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on comment mentions
ALTER TABLE public.community_comment_mentions ENABLE ROW LEVEL SECURITY;

-- Policies for comment mentions
CREATE POLICY "Anyone can view comment mentions" ON public.community_comment_mentions
  FOR SELECT USING (true);

CREATE POLICY "Users can create comment mentions" ON public.community_comment_mentions
  FOR INSERT WITH CHECK (auth.uid() = mentioned_by_user_id);

-- Create notifications table for real-time engagement
CREATE TABLE IF NOT EXISTS public.community_notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  type text NOT NULL, -- 'comment', 'reply', 'mention', 'reaction', 'like'
  message text NOT NULL,
  post_id uuid REFERENCES public.community_posts(id) ON DELETE CASCADE,
  comment_id uuid REFERENCES public.community_post_comments(id) ON DELETE CASCADE,
  triggered_by_user_id uuid NOT NULL,
  read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  metadata jsonb DEFAULT '{}'
);

-- Enable RLS on notifications
ALTER TABLE public.community_notifications ENABLE ROW LEVEL SECURITY;

-- Policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.community_notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" ON public.community_notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own notifications" ON public.community_notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Function to create notifications
CREATE OR REPLACE FUNCTION public.create_community_notification(
  p_user_id uuid,
  p_type text,
  p_message text,
  p_post_id uuid DEFAULT NULL,
  p_comment_id uuid DEFAULT NULL,
  p_triggered_by uuid DEFAULT NULL,
  p_metadata jsonb DEFAULT '{}'
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  notification_id uuid;
BEGIN
  INSERT INTO public.community_notifications (
    user_id, type, message, post_id, comment_id, triggered_by_user_id, metadata
  ) VALUES (
    p_user_id, p_type, p_message, p_post_id, p_comment_id, 
    COALESCE(p_triggered_by, auth.uid()), p_metadata
  ) RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$;

-- Trigger to auto-create notifications on new comments
CREATE OR REPLACE FUNCTION public.handle_new_comment_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  post_author_id uuid;
  commenter_name text;
BEGIN
  -- Get post author and commenter info
  SELECT user_id INTO post_author_id 
  FROM public.community_posts 
  WHERE id = NEW.post_id;
  
  SELECT full_name INTO commenter_name 
  FROM public.profiles 
  WHERE id = NEW.user_id;
  
  -- Don't notify if commenting on own post
  IF post_author_id != NEW.user_id THEN
    PERFORM public.create_community_notification(
      post_author_id,
      'comment',
      COALESCE(commenter_name, 'Someone') || ' commented on your post',
      NEW.post_id,
      NEW.id,
      NEW.user_id
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for comment notifications
DROP TRIGGER IF EXISTS trigger_comment_notification ON public.community_post_comments;
CREATE TRIGGER trigger_comment_notification
  AFTER INSERT ON public.community_post_comments
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_comment_notification();

-- Enable realtime for all community tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_post_comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_post_likes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_post_reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_notifications;

-- Set replica identity for realtime
ALTER TABLE public.community_posts REPLICA IDENTITY FULL;
ALTER TABLE public.community_post_comments REPLICA IDENTITY FULL;
ALTER TABLE public.community_post_likes REPLICA IDENTITY FULL;
ALTER TABLE public.community_post_reactions REPLICA IDENTITY FULL;
ALTER TABLE public.community_notifications REPLICA IDENTITY FULL;