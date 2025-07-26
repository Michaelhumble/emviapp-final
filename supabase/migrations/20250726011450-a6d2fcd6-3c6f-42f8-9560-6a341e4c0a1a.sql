-- Fix remaining RLS policies with correct column names

-- Credit transfers - users can manage their own transfers
CREATE POLICY "Users can view their own credit transfers" ON public.credit_transfers
FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can create credit transfers" ON public.credit_transfers
FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Message likes - users can like messages
CREATE POLICY "Anyone can view message likes" ON public.message_likes
FOR SELECT USING (true);

CREATE POLICY "Users can create message likes" ON public.message_likes
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own likes" ON public.message_likes
FOR DELETE USING (auth.uid() = user_id);

-- Motivational messages - public read, system can create
CREATE POLICY "Anyone can view motivational messages" ON public.motivational_messages
FOR SELECT USING (true);

CREATE POLICY "System can manage motivational messages" ON public.motivational_messages
FOR ALL USING (true);

-- Salon promotions - salon owners can manage, public can view
CREATE POLICY "Anyone can view active salon promotions" ON public.salon_promotions
FOR SELECT USING (true);

CREATE POLICY "Salon owners can manage their promotions" ON public.salon_promotions
FOR ALL USING (auth.uid() = created_by_id);

-- Salon team members - salon owners and members can view
CREATE POLICY "Salon owners and members can view team" ON public.salon_team_members
FOR SELECT USING (
  auth.uid() IN (SELECT owner_id FROM salons WHERE id = salon_id) OR
  auth.uid() = user_id
);

CREATE POLICY "Salon owners can manage team members" ON public.salon_team_members
FOR ALL USING (auth.uid() IN (
  SELECT owner_id FROM salons WHERE id = salon_id
));

-- Salon team messages - team members can view and create
CREATE POLICY "Team members can view salon messages" ON public.salon_team_messages
FOR SELECT USING (auth.uid() IN (
  SELECT user_id FROM salon_team_members WHERE salon_id = salon_team_messages.salon_id
));

CREATE POLICY "Team members can create messages" ON public.salon_team_messages
FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Salon views - public can view, system can track views
CREATE POLICY "Anyone can view salon view stats" ON public.salon_views
FOR SELECT USING (true);

CREATE POLICY "System can track salon views" ON public.salon_views
FOR INSERT WITH CHECK (true);

-- Staff service assignments - staff and salon owners can manage
CREATE POLICY "Staff can view their assignments" ON public.staff_service_assignments
FOR SELECT USING (auth.uid() = staff_id);

CREATE POLICY "System can manage staff assignments" ON public.staff_service_assignments
FOR ALL USING (true);