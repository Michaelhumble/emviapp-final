-- Create a test affiliate partner for the customer account
INSERT INTO affiliate_partners (user_id, slug, status, commission_rate)
SELECT 
  id,
  'test-affiliate-' || substring(id::text from 1 for 8),
  'approved',
  0.30
FROM auth.users 
WHERE email = 'customer9@yahoo.com'
ON CONFLICT (user_id) DO NOTHING;