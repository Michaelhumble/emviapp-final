-- Create RPC functions for incrementing/decrementing post likes
CREATE OR REPLACE FUNCTION increment_post_likes(post_id UUID)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE public.community_posts 
  SET likes_count = likes_count + 1 
  WHERE id = post_id;
$$;

CREATE OR REPLACE FUNCTION decrement_post_likes(post_id UUID)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE public.community_posts 
  SET likes_count = GREATEST(likes_count - 1, 0)
  WHERE id = post_id;
$$;