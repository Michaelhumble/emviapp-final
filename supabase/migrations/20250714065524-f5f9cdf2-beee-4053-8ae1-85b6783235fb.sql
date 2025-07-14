-- Insert actual comments for the existing posts using the existing user_id
INSERT INTO community_post_comments (post_id, user_id, content, created_at) VALUES
-- Comments for the under-eye brightening post
((SELECT id FROM community_posts WHERE content LIKE '%Under-eye brightening hack%' LIMIT 1), 
 '726a4454-a597-49f4-a4e6-42be6ba3da84', 
 'This actually works! I tried it this morning and my eyes looked so much brighter!', 
 NOW() - INTERVAL '2 hours'),

((SELECT id FROM community_posts WHERE content LIKE '%Under-eye brightening hack%' LIMIT 1), 
 '726a4454-a597-49f4-a4e6-42be6ba3da84', 
 'What kind of liquid highlighter do you recommend? Looking for drugstore options 💕', 
 NOW() - INTERVAL '1 hour'),

((SELECT id FROM community_posts WHERE content LIKE '%Under-eye brightening hack%' LIMIT 1), 
 '726a4454-a597-49f4-a4e6-42be6ba3da84', 
 'Game changer! My dark circles are basically invisible now ✨', 
 NOW() - INTERVAL '30 minutes'),

-- Comments for the rose-water nails post
((SELECT id FROM community_posts WHERE content LIKE '%Rose-water nails%' LIMIT 1), 
 '726a4454-a597-49f4-a4e6-42be6ba3da84', 
 'Obsessed with this trend! Did you use actual rose water or just rose-scented products?', 
 NOW() - INTERVAL '3 hours'),

((SELECT id FROM community_posts WHERE content LIKE '%Rose-water nails%' LIMIT 1), 
 '726a4454-a597-49f4-a4e6-42be6ba3da84', 
 'The dreamy translucent finish is everything! 🌹 Definitely trying this weekend', 
 NOW() - INTERVAL '1 hour'),

-- Comments for the cluster lashes post  
((SELECT id FROM community_posts WHERE content LIKE '%Cluster lashes%' LIMIT 1), 
 '726a4454-a597-49f4-a4e6-42be6ba3da84', 
 'Team clusters all the way! Individual lashes take me forever but clusters are so quick', 
 NOW() - INTERVAL '4 hours'),

((SELECT id FROM community_posts WHERE content LIKE '%Cluster lashes%' LIMIT 1), 
 '726a4454-a597-49f4-a4e6-42be6ba3da84', 
 'What brand do you use? Some cluster lashes feel so heavy on my eyes', 
 NOW() - INTERVAL '2 hours');