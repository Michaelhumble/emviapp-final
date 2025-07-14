-- Add comments to the correct table that useComments hook expects
INSERT INTO community_comments (story_id, user_id, content, created_at) VALUES
-- Comments for under-eye brightening post 
((SELECT id FROM community_posts WHERE content LIKE '%Under-eye brightening hack%' LIMIT 1),
 '726a4454-a597-49f4-a4e6-42be6ba3da84',
 'OMG this actually works! Tried it this morning and got so many compliments 😍',
 NOW() - INTERVAL '3 hours'),

((SELECT id FROM community_posts WHERE content LIKE '%Under-eye brightening hack%' LIMIT 1),
 '726a4454-a597-49f4-a4e6-42be6ba3da84', 
 'What highlighter do you use? Looking for budget-friendly options!',
 NOW() - INTERVAL '2 hours'),

((SELECT id FROM community_posts WHERE content LIKE '%Under-eye brightening hack%' LIMIT 1),
 '726a4454-a597-49f4-a4e6-42be6ba3da84',
 'Game changer! My under eyes look so much brighter ✨',
 NOW() - INTERVAL '1 hour'),

-- Comments for cluster lashes post
((SELECT id FROM community_posts WHERE content LIKE '%Cluster lashes%' LIMIT 1),
 '726a4454-a597-49f4-a4e6-42be6ba3da84',
 'Team clusters! Individual lashes take FOREVER but these look just as good',
 NOW() - INTERVAL '4 hours'),

((SELECT id FROM community_posts WHERE content LIKE '%Cluster lashes%' LIMIT 1),
 '726a4454-a597-49f4-a4e6-42be6ba3da84',
 'Which brand do you recommend? Some feel so heavy on my eyes',
 NOW() - INTERVAL '2 hours'),

-- Comments for rose-water nails
((SELECT id FROM community_posts WHERE content LIKE '%Rose-water nails%' LIMIT 1),
 '726a4454-a597-49f4-a4e6-42be6ba3da84',
 'This trend is so dreamy! Did you mix actual rose water or use rose-scented polish?',
 NOW() - INTERVAL '5 hours'),

((SELECT id FROM community_posts WHERE content LIKE '%Rose-water nails%' LIMIT 1),
 '726a4454-a597-49f4-a4e6-42be6ba3da84',
 'The translucent finish is everything 🌹 Definitely trying this weekend!',
 NOW() - INTERVAL '1 hour');