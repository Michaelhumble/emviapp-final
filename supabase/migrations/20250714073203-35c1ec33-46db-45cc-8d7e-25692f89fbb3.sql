-- Update comment counts to match actual comments
UPDATE community_posts 
SET comments_count = (
  SELECT COUNT(*) 
  FROM community_post_comments 
  WHERE post_id = community_posts.id
);