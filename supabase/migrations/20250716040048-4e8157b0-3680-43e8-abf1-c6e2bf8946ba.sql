-- Add RLS policies for artist_offers
CREATE POLICY "Artists can view offers sent to them"
ON public.artist_offers FOR SELECT
USING (artist_id = auth.uid());

CREATE POLICY "Salon owners can view their sent offers"
ON public.artist_offers FOR SELECT  
USING (salon_id IN (
  SELECT id FROM salons WHERE owner_id = auth.uid()
  UNION
  SELECT salon_id FROM user_salon_access 
  WHERE user_id = auth.uid() AND access_type IN ('owner', 'manager')
));

CREATE POLICY "Salon owners can create offers"
ON public.artist_offers FOR INSERT
WITH CHECK (salon_id IN (
  SELECT id FROM salons WHERE owner_id = auth.uid()
  UNION
  SELECT salon_id FROM user_salon_access 
  WHERE user_id = auth.uid() AND access_type IN ('owner', 'manager')
));

CREATE POLICY "Artists can update offers sent to them"
ON public.artist_offers FOR UPDATE
USING (artist_id = auth.uid());