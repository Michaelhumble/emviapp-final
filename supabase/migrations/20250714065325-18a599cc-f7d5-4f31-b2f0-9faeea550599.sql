-- Create some realistic user profiles for the community posts with proper UUIDs
INSERT INTO profiles (id, full_name, avatar_url) VALUES
('726a4454-a597-49f4-a4e6-42be6ba3da84', 'Madison Chen', NULL),
('826b5565-b608-50f5-b5f7-53cf7cb4eb95', 'Alex Rivera', NULL),
('926c6676-c719-61f6-c6f8-64df8dc5fc06', 'Jess Thompson', NULL),
('036d7787-d820-72f7-d7f9-75ef9ed6fd17', 'Yuki Tanaka', NULL),
('146e8898-e931-83f8-e8f0-86ff0fe7fe28', 'Emma Wilson', NULL),
('256f9909-f042-94f9-f9f1-97ff1gf8ff39', 'Sofia Garcia', NULL),
('366f0010-f153-05f0-f0f2-08ff2ff9ff40', 'Taylor Kim', NULL),
('476f1121-f264-16f1-f1f3-19ff3ff0ff51', 'Jordan Lee', NULL),
('586f2232-f375-27f2-f2f4-20ff4ff1ff62', 'Casey Brown', NULL),
('696f3343-f486-38f3-f3f5-31ff5ff2ff73', 'Riley Davis', NULL),
('706f4454-f597-49f4-f4f6-42ff6ff3ff84', 'Morgan Taylor', NULL),
('816f5565-f608-50f5-f5f7-53ff7ff4ff95', 'Avery Johnson', NULL)
ON CONFLICT (id) DO NOTHING;

-- Update existing posts with different user IDs
UPDATE community_posts 
SET user_id = CASE 
  WHEN content LIKE '%Rose-water nails%' THEN '926c6676-c719-61f6-c6f8-64df8dc5fc06'
  WHEN content LIKE '%Cluster lashes%' THEN '146e8898-e931-83f8-e8f0-86ff0fe7fe28'
  WHEN content LIKE '%Clean girl satin%' THEN '256f9909-f042-94f9-f9f1-97ff1gf8ff39'
  WHEN content LIKE '%LED neck mask%' THEN '366f0010-f153-05f0-f0f2-08ff2ff9ff40'
  WHEN content LIKE '%Glass skin%' THEN '476f1121-f264-16f1-f1f3-19ff3ff0ff51'
  WHEN content LIKE '%PDRN serum%' THEN '586f2232-f375-27f2-f2f4-20ff4ff1ff62'
  WHEN content LIKE '%K-beauty slugging%' THEN '696f3343-f486-38f3-f3f5-31ff5ff2ff73'
  WHEN content LIKE '%Gua sha%' THEN '706f4454-f597-49f4-f4f6-42ff6ff3ff84'
  WHEN content LIKE '%Peptide%' THEN '816f5565-f608-50f5-f5f7-53ff7ff4ff95'
  WHEN content LIKE '%Under-eye brightening%' THEN '726a4454-a597-49f4-a4e6-42be6ba3da84'
  WHEN content LIKE '%TikTok #morningshed%' THEN '826b5565-b608-50f5-b5f7-53cf7cb4eb95'
  WHEN content LIKE '%CANMAKE%' THEN '036d7787-d820-72f7-d7f9-75ef9ed6fd17'
  ELSE user_id
END;