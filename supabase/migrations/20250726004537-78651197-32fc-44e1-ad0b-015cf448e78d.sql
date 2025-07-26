-- Enable RLS on all public tables that don't have it
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_for_hire_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_time_off ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_comment_mentions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_event_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_post_mentions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.completed_bookings ENABLE ROW LEVEL SECURITY;

-- Drop any conflicting policies first (these might not exist, so we ignore errors)
DROP POLICY IF EXISTS "Users can manage their own activity logs" ON public.activity_log;
DROP POLICY IF EXISTS "Only admins can manage admin actions" ON public.admin_actions;
DROP POLICY IF EXISTS "System can manage rate limits" ON public.api_rate_limits;
DROP POLICY IF EXISTS "Users can manage their own applications" ON public.applications;
DROP POLICY IF EXISTS "Artists can manage their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Customers can view appointments they created" ON public.appointments;
DROP POLICY IF EXISTS "Artists can manage their own availability" ON public.artist_availability;
DROP POLICY IF EXISTS "Artists can manage their own clients" ON public.artist_clients;
DROP POLICY IF EXISTS "Anyone can view available artist profiles" ON public.artist_for_hire_profiles;
DROP POLICY IF EXISTS "Artists can manage their own profiles" ON public.artist_for_hire_profiles;
DROP POLICY IF EXISTS "Artists can create job applications" ON public.artist_job_applications;
DROP POLICY IF EXISTS "Job posters can view applications to their jobs" ON public.artist_job_applications;
DROP POLICY IF EXISTS "Job posters can update application status" ON public.artist_job_applications;
DROP POLICY IF EXISTS "Anyone can view artist services" ON public.artist_services;
DROP POLICY IF EXISTS "Artists can manage their own services" ON public.artist_services;
DROP POLICY IF EXISTS "Artists can manage their own time off" ON public.artist_time_off;
DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Artists can manage their availability" ON public.availability;
DROP POLICY IF EXISTS "Artists can manage their blocked times" ON public.blocked_times;
DROP POLICY IF EXISTS "System can insert booking audit logs" ON public.booking_audit_log;

-- Create missing basic RLS policies for authenticated users to manage their own data
CREATE POLICY "Users can manage their own activity logs" ON public.activity_log
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage admin actions" ON public.admin_actions
  FOR ALL USING (auth.uid() = admin_user_id);

CREATE POLICY "System can manage rate limits" ON public.api_rate_limits
  FOR ALL USING (true);

CREATE POLICY "Users can manage their own applications" ON public.applications
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Artists can manage their own appointments" ON public.appointments
  FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY "Customers can view appointments they created" ON public.appointments
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Artists can manage their own availability" ON public.artist_availability
  FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY "Artists can manage their own clients" ON public.artist_clients
  FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY "Anyone can view available artist profiles" ON public.artist_for_hire_profiles
  FOR SELECT USING (available_for_work = true);

CREATE POLICY "Artists can manage their own profiles" ON public.artist_for_hire_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Artists can create job applications" ON public.artist_job_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Job posters can view applications to their jobs" ON public.artist_job_applications
  FOR SELECT USING (job_id IN (SELECT id FROM jobs WHERE user_id = auth.uid()));

CREATE POLICY "Job posters can update application status" ON public.artist_job_applications
  FOR UPDATE USING (job_id IN (SELECT id FROM jobs WHERE user_id = auth.uid()));

CREATE POLICY "Anyone can view artist services" ON public.artist_services
  FOR SELECT USING (true);

CREATE POLICY "Artists can manage their own services" ON public.artist_services
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Artists can manage their own time off" ON public.artist_time_off
  FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY "System can insert audit logs" ON public.audit_logs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Artists can manage their availability" ON public.availability
  FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY "Artists can manage their blocked times" ON public.blocked_times
  FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY "System can insert booking audit logs" ON public.booking_audit_log
  FOR INSERT WITH CHECK (true);