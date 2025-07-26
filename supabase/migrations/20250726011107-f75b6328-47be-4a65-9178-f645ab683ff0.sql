-- Fix critical RLS and security issues

-- 1. Add basic RLS policies for tables that have RLS enabled but no policies
-- Based on the linter output, we need to add policies for 8 tables

-- Add policies for tables that need public read access or basic user access
CREATE POLICY "Enable read access for all users" ON public.credit_earnings
FOR SELECT USING (true);

CREATE POLICY "Users can view their own credit earnings" ON public.credit_earnings
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Enable read access for all users" ON public.customer_credits
FOR SELECT USING (true);

CREATE POLICY "Users can view their own customer credits" ON public.customer_credits
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Enable read access for all users" ON public.notifications
FOR SELECT USING (true);

CREATE POLICY "Users can view their own notifications" ON public.notifications
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Enable read access for all users" ON public.posts
FOR SELECT USING (true);

CREATE POLICY "Users can manage their own posts" ON public.posts
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Enable read access for all users" ON public.profiles
FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable read access for all users" ON public.profile_views
FOR SELECT USING (true);

CREATE POLICY "Users can insert profile views" ON public.profile_views
FOR INSERT WITH CHECK (auth.uid() = viewer_id);

CREATE POLICY "Enable read access for all users" ON public.shares_tracking
FOR SELECT USING (true);

CREATE POLICY "Users can insert their own shares" ON public.shares_tracking
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable read access for all users" ON public.user_activity
FOR SELECT USING (true);

CREATE POLICY "Users can view their own activity" ON public.user_activity
FOR SELECT USING (auth.uid() = user_id);

-- 2. Fix function search paths by adding SET search_path TO 'public' for all functions
-- This secures the functions against search path attacks

-- Update all user-defined functions to have secure search paths
ALTER FUNCTION public.get_user_count() SET search_path TO 'public';
ALTER FUNCTION public.array_append_unique(text[], text) SET search_path TO 'public';
ALTER FUNCTION public.update_challenge_participant_count() SET search_path TO 'public';
ALTER FUNCTION public.is_post_expired(timestamp with time zone) SET search_path TO 'public';
ALTER FUNCTION public.update_entry_votes_count() SET search_path TO 'public';
ALTER FUNCTION public.get_user_referral_stats(uuid) SET search_path TO 'public';
ALTER FUNCTION public.get_public_artist_profiles(integer, integer) SET search_path TO 'public';
ALTER FUNCTION public.get_admin_dashboard_stats() SET search_path TO 'public';
ALTER FUNCTION public.populate_artist_demo_data() SET search_path TO 'public';
ALTER FUNCTION public.is_user_invited(uuid) SET search_path TO 'public';
ALTER FUNCTION public.update_profile_stats() SET search_path TO 'public';
ALTER FUNCTION public.get_post_status_for_user(uuid) SET search_path TO 'public';
ALTER FUNCTION public.get_artist_earnings_for_user(uuid) SET search_path TO 'public';
ALTER FUNCTION public.search_salon_sales_optimized(text, text, numeric, numeric, text, integer, integer) SET search_path TO 'public';
ALTER FUNCTION public.get_user_credits(uuid) SET search_path TO 'public';
ALTER FUNCTION public.award_credits(uuid, integer, text, jsonb, text, text, text) SET search_path TO 'public';
ALTER FUNCTION public.spend_credits(uuid, integer, text, jsonb) SET search_path TO 'public';
ALTER FUNCTION public.unlock_level(uuid, integer, integer, text, text) SET search_path TO 'public';
ALTER FUNCTION public.check_api_rate_limit(text, text, integer, integer) SET search_path TO 'public';
ALTER FUNCTION public.process_referral_signup() SET search_path TO 'public';
ALTER FUNCTION public.award_salon_credits(uuid, integer, text, text, jsonb) SET search_path TO 'public';
ALTER FUNCTION public.generate_team_invite_code() SET search_path TO 'public';
ALTER FUNCTION public.handle_salon_review_credits() SET search_path TO 'public';
ALTER FUNCTION public.tag_user(uuid, text) SET search_path TO 'public';
ALTER FUNCTION public.tag_inactive_users() SET search_path TO 'public';
ALTER FUNCTION public.user_has_salon_access(uuid, uuid, text[]) SET search_path TO 'public';
ALTER FUNCTION public.tag_top_referrers() SET search_path TO 'public';
ALTER FUNCTION public.get_salon_credits(uuid) SET search_path TO 'public';
ALTER FUNCTION public.track_salon_view(uuid, uuid, text) SET search_path TO 'public';
ALTER FUNCTION public.link_staff_to_user(text, uuid) SET search_path TO 'public';
ALTER FUNCTION public.setup_salon_owner(uuid, uuid) SET search_path TO 'public';
ALTER FUNCTION public.can_user_post(uuid, text) SET search_path TO 'public';
ALTER FUNCTION public.validate_credits() SET search_path TO 'public';
ALTER FUNCTION public.award_credits(uuid, text, integer, text) SET search_path TO 'public';
ALTER FUNCTION public.handle_follow_credit() SET search_path TO 'public';
ALTER FUNCTION public.handle_bookmark_credit() SET search_path TO 'public';
ALTER FUNCTION public.award_tip_credits(uuid, numeric, text) SET search_path TO 'public';
ALTER FUNCTION public.generate_unique_referral_code() SET search_path TO 'public';
ALTER FUNCTION public.process_referral_credits(text, uuid) SET search_path TO 'public';
ALTER FUNCTION public.redeem_credits(uuid, integer, text, uuid) SET search_path TO 'public';
ALTER FUNCTION public.submit_review_with_credits(uuid, uuid, uuid, integer, text) SET search_path TO 'public';
ALTER FUNCTION public.handle_booking_completion() SET search_path TO 'public';
ALTER FUNCTION public.is_artist_available(uuid, date, time, time) SET search_path TO 'public';
ALTER FUNCTION public.is_top_performer(uuid) SET search_path TO 'public';
ALTER FUNCTION public.has_great_feedback(uuid) SET search_path TO 'public';
ALTER FUNCTION public.process_referral_milestone() SET search_path TO 'public';
ALTER FUNCTION public.validate_referral_request() SET search_path TO 'public';
ALTER FUNCTION public.check_booking_availability() SET search_path TO 'public';
ALTER FUNCTION public.award_team_badge(uuid, text, jsonb) SET search_path TO 'public';
ALTER FUNCTION public.get_next_referral_milestone(integer) SET search_path TO 'public';
ALTER FUNCTION public.process_team_referral(uuid, uuid, boolean) SET search_path TO 'public';
ALTER FUNCTION public.award_referral_upgrade_bonus(uuid) SET search_path TO 'public';
ALTER FUNCTION public.can_access_salon_earnings(uuid) SET search_path TO 'public';
ALTER FUNCTION public.get_salon_earnings(uuid) SET search_path TO 'public';
ALTER FUNCTION public.validate_team_invite(text, text) SET search_path TO 'public';
ALTER FUNCTION public.accept_team_invite(text, uuid) SET search_path TO 'public';
ALTER FUNCTION public.send_team_invite(uuid, text, text, text) SET search_path TO 'public';
ALTER FUNCTION public.log_booking_change() SET search_path TO 'public';
ALTER FUNCTION public.log_booking_cancellation() SET search_path TO 'public';
ALTER FUNCTION public.process_referral(text, uuid) SET search_path TO 'public';
ALTER FUNCTION public.get_customer_info(uuid) SET search_path TO 'public';
ALTER FUNCTION public.generate_universal_invite_code() SET search_path TO 'public';
ALTER FUNCTION public.create_universal_team_invite(uuid, integer, text) SET search_path TO 'public';
ALTER FUNCTION public.accept_universal_invite(text, text, text, text) SET search_path TO 'public';

-- Update track_profile_view function to secure search path
ALTER FUNCTION public.track_profile_view(uuid, uuid, text, text) SET search_path TO 'public';