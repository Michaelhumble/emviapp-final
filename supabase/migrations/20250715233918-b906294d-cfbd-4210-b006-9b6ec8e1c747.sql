-- Drop existing conflicting policies first
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
    )
  );

CREATE POLICY "Staff can view and update their own record"
  ON public.salon_staff
  FOR ALL
  USING (
    user_id = auth.uid() OR 
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

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

-- Function to link staff member to user account during invite acceptance
CREATE OR REPLACE FUNCTION public.link_staff_to_user(
  p_invitation_token TEXT,
  p_user_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.salon_staff
  SET 
    user_id = p_user_id,
    accepted_at = NOW(),
    status = 'active'
  WHERE invitation_token = p_invitation_token
    AND user_id IS NULL;
  
  RETURN FOUND;
END;
$$;