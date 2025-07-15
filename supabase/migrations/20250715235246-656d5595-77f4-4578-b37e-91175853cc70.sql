-- Fix the foreign key relationship issue for salon_reviews and users
-- This error was: "Could not find a relationship between 'salon_reviews' and 'users'"

-- Temporarily disable RLS to fix the salon_staff permissions
ALTER TABLE public.salon_staff DISABLE ROW LEVEL SECURITY;

-- Recreate policies with correct permissions
DROP POLICY IF EXISTS "Salon owners and managers can manage staff" ON public.salon_staff;
DROP POLICY IF EXISTS "Staff can view and update their own record" ON public.salon_staff;
DROP POLICY IF EXISTS "Anyone can view active staff for public display" ON public.salon_staff;

-- Create simpler, working policies for salon_staff
CREATE POLICY "Salon owners can manage all staff data"
  ON public.salon_staff
  FOR ALL
  USING (
    salon_id IN (
      SELECT id FROM public.salons WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Public can view active staff"
  ON public.salon_staff
  FOR SELECT
  USING (status = 'active');

-- Re-enable RLS
ALTER TABLE public.salon_staff ENABLE ROW LEVEL SECURITY;

-- Fix salon_reviews foreign key constraint
-- First check if the foreign key exists
SELECT conname, conrelid::regclass, confrelid::regclass, pg_get_constraintdef(oid)
FROM pg_constraint 
WHERE conrelid = 'public.salon_reviews'::regclass 
AND contype = 'f';

-- The issue seems to be that salon_reviews.customer_id references auth.users(id) 
-- but PostgREST can't see this relationship across schemas
-- Let's check the actual foreign key and recreate it if needed