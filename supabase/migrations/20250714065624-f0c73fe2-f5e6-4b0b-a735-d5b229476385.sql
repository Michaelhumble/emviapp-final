-- Create a profile for the existing user
INSERT INTO profiles (id, full_name, avatar_url) VALUES
('726a4454-a597-49f4-a4e6-42be6ba3da84', 'Madison Chen', NULL)
ON CONFLICT (id) DO NOTHING;