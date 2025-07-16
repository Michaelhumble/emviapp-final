-- QA FIX #1: Fix foreign key relationship for salon_reviews to enable customer name joins
-- The issue is that salon_reviews.customer_id references auth.users(id) but PostgREST can't access auth schema directly

-- First, let's create a proper users view in the public schema for customer information
CREATE OR REPLACE VIEW public.users AS
SELECT 
  au.id,
  au.email,
  au.created_at,
  au.updated_at,
  p.full_name,
  p.avatar_url
FROM auth.users au
LEFT JOIN public.profiles p ON p.id = au.id;

-- Enable RLS on the view
ALTER VIEW public.users SET (security_invoker = true);

-- Create policies for the users view
CREATE POLICY "Users can view public user information"
  ON public.users
  FOR SELECT
  USING (true);

-- QA FIX #2: Fix salon_staff table to ensure proper team member tracking
ALTER TABLE public.salon_staff 
ADD COLUMN IF NOT EXISTS invitation_token TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS accepted_at TIMESTAMP WITH TIME ZONE;

-- QA FIX #3: Create a proper test salon if none exists for testing
INSERT INTO public.salons (
  id,
  salon_name,
  owner_id,
  address,
  phone,
  email,
  about,
  website,
  instagram_handle,
  services,
  amenities,
  logo_url,
  created_at,
  updated_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'EmviApp Test Salon',
  (SELECT id FROM auth.users LIMIT 1),
  '123 Beauty Street, Los Angeles, CA 90210',
  '(555) 123-4567',
  'test@emviapp.com',
  'A premium test salon for QA testing with all features enabled.',
  'https://emviapp.com',
  '@emviapp_test',
  '["Manicure", "Pedicure", "Gel Polish", "Nail Art", "Acrylic Nails"]'::jsonb,
  '["WiFi", "Refreshments", "Parking", "Music", "AC"]'::jsonb,
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- QA FIX #4: Create proper indexes for better performance
CREATE INDEX IF NOT EXISTS idx_salon_reviews_customer_created ON public.salon_reviews(customer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_salon_staff_salon_status ON public.salon_staff(salon_id, status);
CREATE INDEX IF NOT EXISTS idx_salon_staff_user_id_active ON public.salon_staff(user_id) WHERE status = 'active';

-- QA FIX #5: Create a function to get customer info for reviews (security definer to access auth schema)
CREATE OR REPLACE FUNCTION public.get_customer_info(customer_id UUID)
RETURNS TABLE(
  id UUID,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    au.id,
    COALESCE(p.full_name, split_part(au.email, '@', 1)) as full_name,
    au.email,
    p.avatar_url
  FROM auth.users au
  LEFT JOIN public.profiles p ON p.id = au.id
  WHERE au.id = customer_id;
END;
$$;