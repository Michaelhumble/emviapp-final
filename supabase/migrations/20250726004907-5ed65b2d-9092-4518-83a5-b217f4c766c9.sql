-- Add missing policies for the remaining tables that need them
CREATE POLICY "System can manage contact messages" ON public.contact_messages
  FOR ALL USING (true);

CREATE POLICY "Users can view their own credit earnings" ON public.credit_earnings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage credit earnings" ON public.credit_earnings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can manage their own customer credits" ON public.customer_credits
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all default artist data" ON public.default_artist_data
  FOR SELECT USING (true);

CREATE POLICY "Users can view their own device sessions" ON public.device_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own device sessions" ON public.device_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own followers" ON public.followers
  FOR SELECT USING (auth.uid() = viewer_id OR auth.uid() = artist_id);

CREATE POLICY "Users can manage their own follows" ON public.followers
  FOR INSERT WITH CHECK (auth.uid() = viewer_id);

CREATE POLICY "Users can delete their own follows" ON public.followers
  FOR DELETE USING (auth.uid() = viewer_id);

CREATE POLICY "Anyone can view public job postings" ON public.jobs
  FOR SELECT USING (status = 'active');

CREATE POLICY "Users can create their own job postings" ON public.jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own job postings" ON public.jobs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own job postings" ON public.jobs
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "System can manage notifications" ON public.notifications
  FOR ALL USING (true);

CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can manage payment logs" ON public.payment_logs
  FOR ALL USING (true);

CREATE POLICY "System can manage payments" ON public.payments
  FOR ALL USING (true);

CREATE POLICY "Users can view their own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can create their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "System can manage profile views" ON public.profile_views
  FOR ALL USING (true);

CREATE POLICY "Users can view profile views of their own profile" ON public.profile_views
  FOR SELECT USING (auth.uid() = artist_id);

CREATE POLICY "System can manage referrals" ON public.referrals
  FOR ALL USING (true);

CREATE POLICY "Users can view referrals they made or received" ON public.referrals
  FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

CREATE POLICY "Anyone can view active salon sales" ON public.salon_sales
  FOR SELECT USING (status = 'active');

CREATE POLICY "Users can manage their own salon sales" ON public.salon_sales
  FOR ALL USING (auth.uid() = seller_id);

CREATE POLICY "System can manage salon credits" ON public.salon_credits
  FOR ALL USING (true);

CREATE POLICY "Salon owners can view their salon credits" ON public.salon_credits
  FOR SELECT USING (salon_id IN (SELECT id FROM salons WHERE owner_id = auth.uid()));

CREATE POLICY "System can manage salon staff" ON public.salon_staff
  FOR ALL USING (true);

CREATE POLICY "Salon owners can manage their staff" ON public.salon_staff
  FOR ALL USING (salon_id IN (SELECT id FROM salons WHERE owner_id = auth.uid()));

CREATE POLICY "Staff can view their own record" ON public.salon_staff
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public salons" ON public.salons
  FOR SELECT USING (true);

CREATE POLICY "Users can create salons" ON public.salons
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Salon owners can update their salons" ON public.salons
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "System can manage services" ON public.services
  FOR ALL USING (true);

CREATE POLICY "Anyone can view services" ON public.services
  FOR SELECT USING (true);

CREATE POLICY "System can manage shares tracking" ON public.shares_tracking
  FOR ALL USING (true);

CREATE POLICY "Users can view their own shares" ON public.shares_tracking
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage team invites" ON public.team_invites
  FOR ALL USING (true);

CREATE POLICY "Salon owners can manage team invites for their salons" ON public.team_invites
  FOR ALL USING (salon_id IN (SELECT id FROM salons WHERE owner_id = auth.uid()));

CREATE POLICY "Users can manage their own user activity" ON public.user_activity
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "System can insert user activity" ON public.user_activity
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own unlocks" ON public.user_unlocks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage user unlocks" ON public.user_unlocks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "System can manage user tags" ON public.user_tags
  FOR ALL USING (true);

CREATE POLICY "Users can view their own tags" ON public.user_tags
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage users table" ON public.users
  FOR ALL USING (true);

CREATE POLICY "Users can view their own user record" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own user record" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Enable RLS on remaining tables
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.default_artist_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.device_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shares_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_unlocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Add missing portfolio items policy
CREATE POLICY "Anyone can view portfolio items" ON public.portfolio_items
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own portfolio items" ON public.portfolio_items
  FOR ALL USING (auth.uid() = user_id);