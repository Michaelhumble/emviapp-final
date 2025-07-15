-- Fix salon_staff table structure and relationships
ALTER TABLE public.salon_staff 
ADD COLUMN IF NOT EXISTS salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS invited_by UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS accepted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS invitation_token TEXT UNIQUE;

-- Create salon_reviews table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.salon_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  reply_text TEXT,
  replied_by UUID REFERENCES auth.users(id),
  replied_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.salon_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Salon owners can manage their staff" ON public.salon_staff;
DROP POLICY IF EXISTS "Staff can view their own record" ON public.salon_staff;
DROP POLICY IF EXISTS "Public can view active staff" ON public.salon_staff;

-- Create comprehensive RLS policies for salon_staff
CREATE POLICY "Salon owners and managers can manage staff"
  ON public.salon_staff
  FOR ALL
  USING (
    salon_id IN (
      SELECT id FROM public.salons WHERE owner_id = auth.uid()
      UNION
      SELECT salon_id FROM public.user_salon_access 
      WHERE user_id = auth.uid() AND access_type IN ('owner', 'manager')
    )
  );

CREATE POLICY "Staff can view their own record"
  ON public.salon_staff
  FOR SELECT
  USING (user_id = auth.uid() OR email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Anyone can view active staff for public display"
  ON public.salon_staff
  FOR SELECT
  USING (status = 'active');

-- RLS policies for salon_reviews
CREATE POLICY "Salon owners can manage reviews"
  ON public.salon_reviews
  FOR ALL
  USING (
    salon_id IN (
      SELECT id FROM public.salons WHERE owner_id = auth.uid()
      UNION
      SELECT salon_id FROM public.user_salon_access 
      WHERE user_id = auth.uid() AND access_type IN ('owner', 'manager')
    )
  );

CREATE POLICY "Customers can view and create their own reviews"
  ON public.salon_reviews
  FOR ALL
  USING (customer_id = auth.uid())
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Anyone can view active reviews"
  ON public.salon_reviews
  FOR SELECT
  USING (status = 'active');

-- Fix user_salon_access table structure
CREATE TABLE IF NOT EXISTS public.user_salon_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  access_type TEXT NOT NULL DEFAULT 'staff',
  granted_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, salon_id)
);

ALTER TABLE public.user_salon_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Salon owners can manage access"
  ON public.user_salon_access
  FOR ALL
  USING (
    salon_id IN (
      SELECT id FROM public.salons WHERE owner_id = auth.uid()
    ) OR user_id = auth.uid()
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_salon_staff_salon_id ON public.salon_staff(salon_id);
CREATE INDEX IF NOT EXISTS idx_salon_staff_user_id ON public.salon_staff(user_id);
CREATE INDEX IF NOT EXISTS idx_salon_staff_email ON public.salon_staff(email);
CREATE INDEX IF NOT EXISTS idx_salon_reviews_salon_id ON public.salon_reviews(salon_id);
CREATE INDEX IF NOT EXISTS idx_salon_reviews_customer_id ON public.salon_reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_user_salon_access_user_salon ON public.user_salon_access(user_id, salon_id);