-- QA FIX #1: Fix salon_staff table to ensure proper team member tracking
ALTER TABLE public.salon_staff 
ADD COLUMN IF NOT EXISTS invitation_token TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS accepted_at TIMESTAMP WITH TIME ZONE;

-- QA FIX #2: Create proper indexes for better performance
CREATE INDEX IF NOT EXISTS idx_salon_reviews_customer_created ON public.salon_reviews(customer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_salon_staff_salon_status ON public.salon_staff(salon_id, status);
CREATE INDEX IF NOT EXISTS idx_salon_staff_user_id_active ON public.salon_staff(user_id) WHERE status = 'active';

-- QA FIX #3: Create a function to get customer info for reviews (security definer to access auth schema)
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

-- QA FIX #4: Create a view for customer data that can be joined with reviews
CREATE OR REPLACE VIEW public.review_customers AS
SELECT 
  au.id,
  COALESCE(p.full_name, split_part(au.email, '@', 1)) as full_name,
  au.email,
  p.avatar_url
FROM auth.users au
LEFT JOIN public.profiles p ON p.id = au.id;