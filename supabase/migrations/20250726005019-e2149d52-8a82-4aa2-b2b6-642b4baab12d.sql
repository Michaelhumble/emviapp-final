-- Enable RLS and add policies for tables that exist
-- Check which tables exist and add policies accordingly

-- Enable RLS on existing tables
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
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

-- Add policies for jobs table
CREATE POLICY "Anyone can view public job postings" ON public.jobs
  FOR SELECT USING (status = 'active');

CREATE POLICY "Users can create their own job postings" ON public.jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own job postings" ON public.jobs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own job postings" ON public.jobs
  FOR DELETE USING (auth.uid() = user_id);

-- Add policies for notifications table
CREATE POLICY "System can manage notifications" ON public.notifications
  FOR ALL USING (true);

CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Add policies for portfolio_items table
CREATE POLICY "Anyone can view portfolio items" ON public.portfolio_items
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own portfolio items" ON public.portfolio_items
  FOR ALL USING (auth.uid() = user_id);

-- Add policies for profiles table
CREATE POLICY "Anyone can view public profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can create their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Add policies for profile_views table
CREATE POLICY "System can manage profile views" ON public.profile_views
  FOR ALL USING (true);

CREATE POLICY "Users can view profile views of their own profile" ON public.profile_views
  FOR SELECT USING (auth.uid() = artist_id);

-- Add policies for referrals table
CREATE POLICY "System can manage referrals" ON public.referrals
  FOR ALL USING (true);

CREATE POLICY "Users can view referrals they made or received" ON public.referrals
  FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

-- Add policies for salon_credits table
CREATE POLICY "System can manage salon credits" ON public.salon_credits
  FOR ALL USING (true);

CREATE POLICY "Salon owners can view their salon credits" ON public.salon_credits
  FOR SELECT USING (salon_id IN (SELECT id FROM salons WHERE owner_id = auth.uid()));

-- Add policies for salon_sales table
CREATE POLICY "Anyone can view active salon sales" ON public.salon_sales
  FOR SELECT USING (status = 'active');

CREATE POLICY "Users can manage their own salon sales" ON public.salon_sales
  FOR ALL USING (auth.uid() = seller_id);

-- Add policies for salon_staff table
CREATE POLICY "System can manage salon staff" ON public.salon_staff
  FOR ALL USING (true);

CREATE POLICY "Salon owners can manage their staff" ON public.salon_staff
  FOR ALL USING (salon_id IN (SELECT id FROM salons WHERE owner_id = auth.uid()));

CREATE POLICY "Staff can view their own record" ON public.salon_staff
  FOR SELECT USING (auth.uid() = user_id);

-- Add policies for salons table
CREATE POLICY "Anyone can view public salons" ON public.salons
  FOR SELECT USING (true);

CREATE POLICY "Users can create salons" ON public.salons
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Salon owners can update their salons" ON public.salons
  FOR UPDATE USING (auth.uid() = owner_id);

-- Add policies for services table
CREATE POLICY "System can manage services" ON public.services
  FOR ALL USING (true);

CREATE POLICY "Anyone can view services" ON public.services
  FOR SELECT USING (true);

-- Add policies for shares_tracking table
CREATE POLICY "System can manage shares tracking" ON public.shares_tracking
  FOR ALL USING (true);

CREATE POLICY "Users can view their own shares" ON public.shares_tracking
  FOR SELECT USING (auth.uid() = user_id);

-- Add policies for team_invites table
CREATE POLICY "System can manage team invites" ON public.team_invites
  FOR ALL USING (true);

CREATE POLICY "Salon owners can manage team invites for their salons" ON public.team_invites
  FOR ALL USING (salon_id IN (SELECT id FROM salons WHERE owner_id = auth.uid()));

-- Add policies for user_activity table
CREATE POLICY "Users can manage their own user activity" ON public.user_activity
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "System can insert user activity" ON public.user_activity
  FOR INSERT WITH CHECK (true);

-- Add policies for user_unlocks table
CREATE POLICY "Users can view their own unlocks" ON public.user_unlocks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage user unlocks" ON public.user_unlocks
  FOR INSERT WITH CHECK (true);

-- Add policies for user_tags table
CREATE POLICY "System can manage user tags" ON public.user_tags
  FOR ALL USING (true);

CREATE POLICY "Users can view their own tags" ON public.user_tags
  FOR SELECT USING (auth.uid() = user_id);

-- Add policies for users table
CREATE POLICY "System can manage users table" ON public.users
  FOR ALL USING (true);

CREATE POLICY "Users can view their own user record" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own user record" ON public.users
  FOR UPDATE USING (auth.uid() = id);