
-- Add foreign key constraint between community_stories.user_id and auth.users.id
-- This will enable LEFT JOINs to work properly in Supabase queries
ALTER TABLE community_stories
ADD CONSTRAINT fk_community_stories_user
FOREIGN KEY (user_id)
REFERENCES auth.users(id)
ON DELETE CASCADE;
