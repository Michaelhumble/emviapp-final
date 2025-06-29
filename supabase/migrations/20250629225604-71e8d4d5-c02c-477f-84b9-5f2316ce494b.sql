
-- Insert sample jobs into the jobs table with NULL user_id to avoid foreign key constraint
INSERT INTO public.jobs (
  title,
  description,
  category,
  location,
  pricing_tier,
  status,
  user_id,
  contact_info,
  compensation_type,
  compensation_details,
  requirements,
  created_at
) VALUES 
(
  'Senior Nail Technician - Full Time',
  'We are seeking an experienced nail technician to join our busy salon. Must have 3+ years experience with gel, acrylic, and nail art. Excellent customer service skills required. Competitive pay and benefits package.',
  'Nail Technician',
  'Los Angeles, CA',
  'free',
  'active',
  NULL,
  '{"owner_name": "Sarah Johnson", "phone": "(555) 123-4567", "email": "sarah@beautysalon.com"}',
  'hourly',
  '$18-25/hour plus tips',
  'Valid nail technician license required. 3+ years experience. Reliable transportation.',
  NOW()
),
(
  'Salon Manager - Premium Location',
  'Luxury nail salon in Beverly Hills seeking experienced salon manager. Oversee daily operations, staff scheduling, inventory management, and customer relations. Previous management experience in beauty industry required.',
  'Management',
  'Beverly Hills, CA',
  'premium',
  'active',
  NULL,
  '{"owner_name": "Michael Chen", "phone": "(555) 987-6543", "email": "hiring@luxurynails.com"}',
  'salary',
  '$55,000-65,000 annually',
  'Bachelor degree preferred. 5+ years salon management experience. Strong leadership and communication skills.',
  NOW()
);
