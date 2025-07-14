-- Clear existing comments and add more realistic, varied comment counts
DELETE FROM community_post_comments;

-- Add varied, realistic comments to ALL community posts with different comment counts
INSERT INTO community_post_comments (post_id, user_id, content, created_at) VALUES

-- Under-eye brightening hack post (5 comments)
('84ed9f83-456a-452f-8e82-705e750ebcae', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'OMG this actually works! Tried it this morning and got so many compliments 😍', NOW() - INTERVAL '3 hours'),
('84ed9f83-456a-452f-8e82-705e750ebcae', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'What highlighter do you use? Looking for budget-friendly options!', NOW() - INTERVAL '2 hours'),
('84ed9f83-456a-452f-8e82-705e750ebcae', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Game changer! My under eyes look so much brighter ✨', NOW() - INTERVAL '1 hour'),
('84ed9f83-456a-452f-8e82-705e750ebcae', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Need to try this ASAP! Always looking tired after work', NOW() - INTERVAL '45 minutes'),
('84ed9f83-456a-452f-8e82-705e750ebcae', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Works amazing with cream highlighter too!', NOW() - INTERVAL '30 minutes'),

-- Cluster lashes post (2 comments)
('879829e6-18d3-4931-b6bd-f2509b0a9bd2', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Team clusters! Individual lashes take FOREVER but these look just as good', NOW() - INTERVAL '4 hours'),
('879829e6-18d3-4931-b6bd-f2509b0a9bd2', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Which brand do you recommend? Some feel so heavy on my eyes', NOW() - INTERVAL '2 hours'),

-- Rose-water nails post (4 comments)
('1fbe1177-4ffa-45a6-9f6c-83a967b72801', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'This trend is so dreamy! Did you mix actual rose water or use rose-scented polish?', NOW() - INTERVAL '5 hours'),
('1fbe1177-4ffa-45a6-9f6c-83a967b72801', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'The translucent finish is everything 🌹 Definitely trying this weekend!', NOW() - INTERVAL '1 hour'),
('1fbe1177-4ffa-45a6-9f6c-83a967b72801', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Rose water + clear coat = genius! Thanks for the tip about bubbles', NOW() - INTERVAL '30 minutes'),
('1fbe1177-4ffa-45a6-9f6c-83a967b72801', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Just ordered rose water essence to try this! 💅', NOW() - INTERVAL '15 minutes'),

-- Clean girl satin skin post (1 comment)
('7e001f9f-4bd1-412e-a249-b1e773c7395d', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Yes! Finally someone who gets it. Less is more ✨', NOW() - INTERVAL '6 hours'),

-- LED neck masks post (6 comments)
('c4305cc3-a730-4847-823e-3bf4f124222c', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Ooh which brand did you get? I need this for my tech neck!', NOW() - INTERVAL '7 hours'),
('c4305cc3-a730-4847-823e-3bf4f124222c', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'LED therapy is the future! I use mine for my face too', NOW() - INTERVAL '5 hours'),
('c4305cc3-a730-4847-823e-3bf4f124222c', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Netflix + LED mask = perfect night routine 📺✨', NOW() - INTERVAL '3 hours'),
('c4305cc3-a730-4847-823e-3bf4f124222c', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Does it actually work for neck lines?', NOW() - INTERVAL '2 hours'),
('c4305cc3-a730-4847-823e-3bf4f124222c', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Been using mine for 2 months, definite improvement!', NOW() - INTERVAL '1 hour'),
('c4305cc3-a730-4847-823e-3bf4f124222c', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Link please? My neck needs this 🙏', NOW() - INTERVAL '30 minutes'),

-- Glass skin 2.0 post (3 comments)
('2867aa9a-78fb-4b71-aa7c-918971e90557', '726a4454-a597-49f4-a4e6-42be6ba3da84', '대박! Your skin looks amazing! What double essence do you use?', NOW() - INTERVAL '8 hours'),
('2867aa9a-78fb-4b71-aa7c-918971e90557', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Glass skin goals! 7 steps is dedication but so worth it', NOW() - INTERVAL '6 hours'),
('2867aa9a-78fb-4b71-aa7c-918971e90557', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Korean skincare is on another level! Need to step up my game', NOW() - INTERVAL '4 hours'),

-- PDRN serum post (2 comments)
('a62366bc-e272-4b6c-8fe1-2fff37a76387', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Salmon DNA sounds wild but if it works it works! 🐟', NOW() - INTERVAL '9 hours'),
('a62366bc-e272-4b6c-8fe1-2fff37a76387', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'PDRN is a game changer! Been using it for 2 months', NOW() - INTERVAL '7 hours'),

-- Hydrogel mask post (1 comment)
('421cee2b-1188-49d3-be0e-00cb360a8dd9', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Hydrogel masks are my summer savior! So cooling 💧', NOW() - INTERVAL '10 hours'),

-- CANMAKE post (4 comments)
('f43ab3a0-914f-44b0-b75f-c4078c7e1712', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'CANMAKE質がいいのに安い！Personal color palettes are amazing', NOW() - INTERVAL '11 hours'),
('f43ab3a0-914f-44b0-b75f-c4078c7e1712', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Japanese drugstore makeup hits different! Quality is insane', NOW() - INTERVAL '9 hours'),
('f43ab3a0-914f-44b0-b75f-c4078c7e1712', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Need to get my hands on this! J-beauty is so underrated', NOW() - INTERVAL '7 hours'),
('f43ab3a0-914f-44b0-b75f-c4078c7e1712', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Where can I buy CANMAKE in the US?', NOW() - INTERVAL '5 hours'),

-- Jirai Kei makeup post (3 comments)
('c320c707-fbf1-4154-81a5-3d3c51e2b2af', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Jirai kei is so aesthetic! Can''t wait for the tutorial 💔', NOW() - INTERVAL '12 hours'),
('c320c707-fbf1-4154-81a5-3d3c51e2b2af', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Dark romantic vibes are everything! You nail this style', NOW() - INTERVAL '10 hours'),
('c320c707-fbf1-4154-81a5-3d3c51e2b2af', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Harajuku street style inspiration! Please share tips', NOW() - INTERVAL '8 hours'),

-- Morning shed routine post (2 comments)
('ab1dfc87-ecb6-41d0-aa04-bb8765510705', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'Morning shed is life! 5 minutes and I''m glowing ✨', NOW() - INTERVAL '13 hours'),
('ab1dfc87-ecb6-41d0-aa04-bb8765510705', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'TikTok trends that actually work! Love efficient routines', NOW() - INTERVAL '11 hours'),

-- AI beauty apps post (1 comment)
('b884aea4-40d6-4dc3-be95-f6202eeea071', '726a4454-a597-49f4-a4e6-42be6ba3da84', 'AI is scary good! It matched me better than Sephora staff 😂', NOW() - INTERVAL '14 hours');