-- First, create some realistic user profiles for the community posts
INSERT INTO profiles (id, full_name, avatar_url) VALUES
('726a4454-a597-49f4-a4e6-42be6ba3da84', 'Madison Chen', NULL),
('826b5565-b608-50f5-b5f7-53cf7cb4eb95', 'Alex Rivera', NULL),
('926c6676-c719-61g6-c6g8-64dg8dc5fc06', 'Jess Thompson', NULL),
('036d7787-d820-72h7-d7h9-75eh9ed6gd17', 'Yuki Tanaka', NULL),
('146e8898-e931-83i8-e8i0-86fi0fe7he28', 'Emma Wilson', NULL),
('256f9909-f042-94j9-f9j1-97gj1gf8if39', 'Sofia Garcia', NULL),
('366g0010-g153-05k0-g0k2-08hk2hg9jg40', 'Taylor Kim', NULL),
('476h1121-h264-16l1-h1l3-19il3ih0kh51', 'Jordan Lee', NULL),
('586i2232-i375-27m2-i2m4-20jm4ji1li62', 'Casey Brown', NULL),
('696j3343-j486-38n3-j3n5-31kn5kj2mj73', 'Riley Davis', NULL),
('706k4454-k597-49o4-k4o6-42lo6lk3nk84', 'Morgan Taylor', NULL),
('816l5565-l608-50p5-l5p7-53mp7ml4ol95', 'Avery Johnson', NULL)
ON CONFLICT (id) DO NOTHING;

-- Update existing posts with different user IDs and proper names
UPDATE community_posts 
SET user_id = CASE 
  WHEN id = '84ed9f83-456a-452f-8e82-705e750ebcae' THEN '726a4454-a597-49f4-a4e6-42be6ba3da84'
  WHEN id = 'f43ab3a0-914f-44b0-b75f-c4078c7e1712' THEN '036d7787-d820-72h7-d7h9-75eh9ed6gd17'
  WHEN id = 'ab1dfc87-ecb6-41d0-aa04-bb8765510705' THEN '826b5565-b608-50f5-b5f7-53cf7cb4eb95'
  ELSE user_id
END;

-- Update more posts to have different users (find some more post IDs first)
UPDATE community_posts 
SET user_id = CASE 
  WHEN content LIKE '%Rose-water nails%' THEN '926c6676-c719-61g6-c6g8-64dg8dc5fc06'
  WHEN content LIKE '%Cluster lashes%' THEN '146e8898-e931-83i8-e8i0-86fi0fe7he28'
  WHEN content LIKE '%Clean girl satin%' THEN '256f9909-f042-94j9-f9j1-97gj1gf8if39'
  WHEN content LIKE '%LED neck mask%' THEN '366g0010-g153-05k0-g0k2-08hk2hg9jg40'
  WHEN content LIKE '%Glass skin%' THEN '476h1121-h264-16l1-h1l3-19il3ih0kh51'
  WHEN content LIKE '%PDRN serum%' THEN '586i2232-i375-27m2-i2m4-20jm4ji1li62'
  WHEN content LIKE '%K-beauty slugging%' THEN '696j3343-j486-38n3-j3n5-31kn5kj2mj73'
  WHEN content LIKE '%Gua sha%' THEN '706k4454-k597-49o4-k4o6-42lo6lk3nk84'
  WHEN content LIKE '%Peptide%' THEN '816l5565-l608-50p5-l5p7-53mp7ml4ol95'
  ELSE user_id
END;