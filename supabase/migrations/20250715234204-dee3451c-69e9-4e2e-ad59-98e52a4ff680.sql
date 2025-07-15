-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_salon_staff_salon_id ON public.salon_staff(salon_id);
CREATE INDEX IF NOT EXISTS idx_salon_staff_user_id ON public.salon_staff(user_id);
CREATE INDEX IF NOT EXISTS idx_salon_staff_email ON public.salon_staff(email);
CREATE INDEX IF NOT EXISTS idx_salon_staff_invitation_token ON public.salon_staff(invitation_token);
CREATE INDEX IF NOT EXISTS idx_salon_reviews_salon_id ON public.salon_reviews(salon_id);
CREATE INDEX IF NOT EXISTS idx_salon_reviews_customer_id ON public.salon_reviews(customer_id);

-- Update existing booking policies to ensure proper salon access
DROP POLICY IF EXISTS "Salon owners can view salon bookings" ON public.bookings;
CREATE POLICY "Salon owners can view salon bookings"
  ON public.bookings
  FOR SELECT
  USING (
    recipient_id IN (
      SELECT ss.user_id FROM public.salon_staff ss
      INNER JOIN public.salons s ON s.id = ss.salon_id
      WHERE s.owner_id = auth.uid() AND ss.user_id IS NOT NULL
    )
  );