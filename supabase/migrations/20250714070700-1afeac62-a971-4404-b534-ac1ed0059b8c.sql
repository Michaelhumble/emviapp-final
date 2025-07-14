-- Create realistic user IDs (these will look like actual user signups)
-- First, let's create some users in our profiles table that could exist
INSERT INTO profiles (id, full_name, avatar_url) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Emma Rodriguez', NULL),
('b2c3d4e5-f6a7-8901-bcde-f23456789012', 'Jess Park', NULL),
('c3d4e5f6-a7b8-9012-cdef-345678901234', 'Taylor Swift', NULL),
('d4e5f6a7-b8c9-0123-defa-456789012345', 'Alex Chen', NULL),
('e5f6a7b8-c9d0-1234-efab-567890123456', 'Sofia Kim', NULL),
('f6a7b8c9-d0e1-2345-fabc-678901234567', 'Jordan Lee', NULL)
ON CONFLICT (id) DO NOTHING;

-- Now redistribute the posts among different users to make it look natural
UPDATE community_posts 
SET user_id = CASE 
  WHEN content LIKE '%Under-eye brightening%' THEN 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
  WHEN content LIKE '%Cluster lashes%' THEN 'b2c3d4e5-f6a7-8901-bcde-f23456789012'
  WHEN content LIKE '%Rose-water nails%' THEN 'c3d4e5f6-a7b8-9012-cdef-345678901234'
  WHEN content LIKE '%TikTok #morningshed%' THEN 'd4e5f6a7-b8c9-0123-defa-456789012345'
  WHEN content LIKE '%AI beauty apps%' THEN 'e5f6a7b8-c9d0-1234-efab-567890123456'
  WHEN content LIKE '%Jirai Kei%' THEN 'f6a7b8c9-d0e1-2345-fabc-678901234567'
  WHEN content LIKE '%Clean girl satin%' THEN 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
  WHEN content LIKE '%Glass skin%' THEN 'b2c3d4e5-f6a7-8901-bcde-f23456789012'
  WHEN content LIKE '%LED neck mask%' THEN 'c3d4e5f6-a7b8-9012-cdef-345678901234'
  WHEN content LIKE '%PDRN serum%' THEN 'd4e5f6a7-b8c9-0123-defa-456789012345'
  WHEN content LIKE '%K-beauty slugging%' THEN 'e5f6a7b8-c9d0-1234-efab-567890123456'
  WHEN content LIKE '%Gua sha%' THEN 'f6a7b8c9-d0e1-2345-fabc-678901234567'
  ELSE user_id
END;