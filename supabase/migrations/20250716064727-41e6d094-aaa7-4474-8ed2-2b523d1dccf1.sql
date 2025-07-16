-- Fix realtime publication and add missing tables

-- Only add tables that aren't already in the publication
DO $$
BEGIN
  -- Add new tables to realtime publication
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'community_post_mentions'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.community_post_mentions;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'community_comment_mentions'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.community_comment_mentions;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'community_notifications'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.community_notifications;
  END IF;
END $$;

-- Set replica identity for new tables
ALTER TABLE public.community_post_mentions REPLICA IDENTITY FULL;
ALTER TABLE public.community_comment_mentions REPLICA IDENTITY FULL;
ALTER TABLE public.community_notifications REPLICA IDENTITY FULL;