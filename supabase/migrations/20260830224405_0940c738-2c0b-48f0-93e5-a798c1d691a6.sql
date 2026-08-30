DROP POLICY IF EXISTS "Salon managers can view their own profiles" ON public.salon_staff;
DROP POLICY IF EXISTS "Salon managers can update their own profiles" ON public.salon_staff;

CREATE POLICY "Salon managers can view their own profiles" ON public.salon_staff
  FOR SELECT TO authenticated
  USING (email = auth.email());

CREATE POLICY "Salon managers can update their own profiles" ON public.salon_staff
  FOR UPDATE TO authenticated
  USING (email = auth.email()) WITH CHECK (email = auth.email());

DROP POLICY IF EXISTS "Staff can view their own records" ON public.salon_staff;
CREATE POLICY "Staff can view their own records" ON public.salon_staff
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());