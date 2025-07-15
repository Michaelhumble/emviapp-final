-- Add test staff members first
INSERT INTO public.salon_staff (
  salon_id,
  full_name,
  email,
  role,
  specialty,
  status,
  invitation_token
) VALUES 
(
  '726a4454-a597-49f4-a4e6-42be6ba3da84',
  'Maria Rodriguez',
  'maria.test@salon.com',
  'nail technician',
  'Gel Manicures, Nail Art',
  'active',
  'TESTINV1'
),
(
  '726a4454-a597-49f4-a4e6-42be6ba3da84',
  'Sarah Kim',
  'sarah.test@salon.com',
  'hair stylist',
  'Cuts, Color, Extensions',
  'pending',
  'TESTINV2'
);

-- Add test reviews
INSERT INTO public.salon_reviews (
  salon_id,
  customer_id,
  rating,
  review_text,
  status
) VALUES 
(
  '726a4454-a597-49f4-a4e6-42be6ba3da84',
  '726a4454-a597-49f4-a4e6-42be6ba3da84',
  5,
  'Amazing service! The staff was so professional and my nails look incredible. Will definitely be back!',
  'active'
),
(
  '726a4454-a597-49f4-a4e6-42be6ba3da84',
  '726a4454-a597-49f4-a4e6-42be6ba3da84',
  4,
  'Great experience overall. Clean facility and skilled technicians. Only minor wait time.',
  'active'
);