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

-- Create missing basic RLS policies for authenticated users to manage their own data
CREATE POLICY IF NOT EXISTS "Users can manage their own activity logs" ON public.activity_log
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Only admins can manage admin actions" ON public.admin_actions
  FOR ALL USING (auth.uid() = admin_user_id);

CREATE POLICY IF NOT EXISTS "Users can view their own AI recommendations" ON public.ai_recommendations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own AI recommendation interactions" ON public.ai_recommendations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "System can insert AI recommendations" ON public.ai_recommendations
  FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Users can view their own AI usage logs" ON public.ai_usage_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Service role can manage AI usage logs" ON public.ai_usage_logs
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "System can manage rate limits" ON public.api_rate_limits
  FOR ALL USING (true);

CREATE POLICY IF NOT EXISTS "Users can manage their own applications" ON public.applications
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Artists can manage their own appointments" ON public.appointments
  FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY IF NOT EXISTS "Customers can view appointments they created" ON public.appointments
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY IF NOT EXISTS "Artists can manage their own availability" ON public.artist_availability
  FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY IF NOT EXISTS "Artists can manage their own clients" ON public.artist_clients
  FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY IF NOT EXISTS "Anyone can view available artist profiles" ON public.artist_for_hire_profiles
  FOR SELECT USING (available_for_work = true);

CREATE POLICY IF NOT EXISTS "Artists can manage their own profiles" ON public.artist_for_hire_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Artists can create job applications" ON public.artist_job_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Artists can view their own applications" ON public.artist_job_applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Job posters can view applications to their jobs" ON public.artist_job_applications
  FOR SELECT USING (job_id IN (SELECT id FROM jobs WHERE user_id = auth.uid()));

CREATE POLICY IF NOT EXISTS "Job posters can update application status" ON public.artist_job_applications
  FOR UPDATE USING (job_id IN (SELECT id FROM jobs WHERE user_id = auth.uid()));

CREATE POLICY IF NOT EXISTS "Artists can view offers sent to them" ON public.artist_offers
  FOR SELECT USING (auth.uid() = artist_id);

CREATE POLICY IF NOT EXISTS "Artists can update offers sent to them" ON public.artist_offers
  FOR UPDATE USING (auth.uid() = artist_id);

CREATE POLICY IF NOT EXISTS "Anyone can view artist services" ON public.artist_services
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Artists can manage their own services" ON public.artist_services
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Artists can manage their own time off" ON public.artist_time_off
  FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY IF NOT EXISTS "System can insert audit logs" ON public.audit_logs
  FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Artists can manage their availability" ON public.availability
  FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY IF NOT EXISTS "Artists can manage their blocked times" ON public.blocked_times
  FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY IF NOT EXISTS "System can insert booking audit logs" ON public.booking_audit_log
  FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Users can view their own sent or received bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY IF NOT EXISTS "Users can create bookings as sender" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY IF NOT EXISTS "Users can update their own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY IF NOT EXISTS "Users can delete their own bookings" ON public.bookings
  FOR DELETE USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY IF NOT EXISTS "Anyone can view challenge entries" ON public.challenge_entries
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Users can create their own entries" ON public.challenge_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own entries" ON public.challenge_entries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Anyone can view challenge votes" ON public.challenge_votes
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Users can create votes" ON public.challenge_votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete their own votes" ON public.challenge_votes
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Anyone can view active challenges" ON public.challenges
  FOR SELECT USING (status = 'active');

CREATE POLICY IF NOT EXISTS "Admins can manage challenges" ON public.challenges
  FOR ALL USING (auth.uid() = created_by);

CREATE POLICY IF NOT EXISTS "Anyone can view comment mentions" ON public.community_comment_mentions
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Users can create comment mentions" ON public.community_comment_mentions
  FOR INSERT WITH CHECK (auth.uid() = mentioned_by_user_id);

CREATE POLICY IF NOT EXISTS "Anyone can view comments" ON public.community_comments
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can create comments" ON public.community_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own comments" ON public.community_comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete their own comments" ON public.community_comments
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Anyone can view event participants" ON public.community_event_participants
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can register for events" ON public.community_event_participants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own registrations" ON public.community_event_participants
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can cancel their own registrations" ON public.community_event_participants
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Anyone can view events" ON public.community_events
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can create events" ON public.community_events
  FOR INSERT WITH CHECK (auth.uid() = host_user_id);

CREATE POLICY IF NOT EXISTS "Event hosts can update their events" ON public.community_events
  FOR UPDATE USING (auth.uid() = host_user_id);

CREATE POLICY IF NOT EXISTS "Event hosts can delete their events" ON public.community_events
  FOR DELETE USING (auth.uid() = host_user_id);

CREATE POLICY IF NOT EXISTS "Anyone can view leaderboard" ON public.community_leaderboard
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "System can update leaderboard" ON public.community_leaderboard
  FOR ALL USING (true);

CREATE POLICY IF NOT EXISTS "Users can view their own notifications" ON public.community_notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own notifications" ON public.community_notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "System can create notifications" ON public.community_notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Anyone can view post comments" ON public.community_post_comments
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can create comments" ON public.community_post_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own comments" ON public.community_post_comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete their own comments" ON public.community_post_comments
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Anyone can view post likes" ON public.community_post_likes
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can like posts" ON public.community_post_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can remove their own likes" ON public.community_post_likes
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Anyone can view mentions" ON public.community_post_mentions
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Users can create mentions" ON public.community_post_mentions
  FOR INSERT WITH CHECK (auth.uid() = mentioned_by_user_id);

CREATE POLICY IF NOT EXISTS "Anyone can view post reactions" ON public.community_post_reactions
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can add reactions" ON public.community_post_reactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can remove their own reactions" ON public.community_post_reactions
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Anyone can view community posts" ON public.community_posts
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can create posts" ON public.community_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own posts" ON public.community_posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete their own posts" ON public.community_posts
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Anyone can view answered questions" ON public.community_questions
  FOR SELECT USING (status = 'answered');

CREATE POLICY IF NOT EXISTS "Users can view their own questions" ON public.community_questions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can create their own questions" ON public.community_questions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own questions" ON public.community_questions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Anyone can view community stories" ON public.community_stories
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can create stories" ON public.community_stories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own stories" ON public.community_stories
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete their own stories" ON public.community_stories
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Artists can view their own completed bookings" ON public.completed_bookings
  FOR SELECT USING (auth.uid() = artist_id);

CREATE POLICY IF NOT EXISTS "Salon owners can view salon completed bookings" ON public.completed_bookings
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM salon_staff 
    WHERE salon_staff.salon_id = completed_bookings.salon_id 
    AND salon_staff.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    AND salon_staff.role IN ('owner', 'manager')
  ));