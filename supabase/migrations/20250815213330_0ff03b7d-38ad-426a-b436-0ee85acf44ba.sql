-- Migration to add search_path to all public functions missing it
-- This prevents search_path injection attacks

-- First, let's check which functions are missing search_path
-- (This is informational - the actual ALTER statements follow)

-- Fix functions one by one to ensure proper search_path is set
ALTER FUNCTION public.array_append_unique(text[], text) SET search_path TO 'public';
ALTER FUNCTION public.get_user_count() SET search_path TO 'public';
ALTER FUNCTION public.update_challenge_participant_count() SET search_path TO 'public';
ALTER FUNCTION public.is_post_expired(timestamp with time zone) SET search_path TO 'public';
ALTER FUNCTION public.update_entry_votes_count() SET search_path TO 'public';
ALTER FUNCTION public.get_user_referral_stats(uuid) SET search_path TO 'public';
ALTER FUNCTION public.handle_follow_credit() SET search_path TO 'public';
ALTER FUNCTION public.can_user_post(uuid, text) SET search_path TO 'public';
ALTER FUNCTION public.get_public_artist_profiles(integer, integer) SET search_path TO 'public';
ALTER FUNCTION public.process_referral_signup() SET search_path TO 'public';
ALTER FUNCTION public.activate_free_jobs() SET search_path TO 'public';
ALTER FUNCTION public.track_salon_view(uuid, uuid, text) SET search_path TO 'public';
ALTER FUNCTION public.link_staff_to_user(text, uuid) SET search_path TO 'public';
ALTER FUNCTION public.get_admin_dashboard_stats() SET search_path TO 'public';
ALTER FUNCTION public.populate_artist_demo_data() SET search_path TO 'public';
ALTER FUNCTION public.is_user_invited(uuid) SET search_path TO 'public';
ALTER FUNCTION public.refresh_mv_jobs_recently_filled() SET search_path TO 'public';
ALTER FUNCTION public.setup_salon_owner(uuid, uuid) SET search_path TO 'public';
ALTER FUNCTION public.update_profile_stats() SET search_path TO 'public';
ALTER FUNCTION public.get_artist_earnings_for_user(uuid) SET search_path TO 'public';
ALTER FUNCTION public.validate_credits() SET search_path TO 'public';
ALTER FUNCTION public.send_team_invite(uuid, text, text, text) SET search_path TO 'public';
ALTER FUNCTION public.log_booking_change() SET search_path TO 'public';
ALTER FUNCTION public.log_booking_cancellation() SET search_path TO 'public';
ALTER FUNCTION public.process_referral(text, uuid) SET search_path TO 'public';
ALTER FUNCTION public.generate_universal_invite_code() SET search_path TO 'public';
ALTER FUNCTION public.create_universal_team_invite(uuid, integer, text) SET search_path TO 'public';
ALTER FUNCTION public.accept_universal_invite(text, text, text, text) SET search_path TO 'public';
ALTER FUNCTION public.update_universal_invites_updated_at() SET search_path TO 'public';
ALTER FUNCTION public.get_user_credits(uuid) SET search_path TO 'public';
ALTER FUNCTION public.award_credits(uuid, integer, text, jsonb, text, text, text) SET search_path TO 'public';
ALTER FUNCTION public.spend_credits(uuid, integer, text, jsonb) SET search_path TO 'public';
ALTER FUNCTION public.unlock_level(uuid, integer, integer, text, text) SET search_path TO 'public';

-- Create a security comment
COMMENT ON SCHEMA public IS 'All functions in this schema have search_path set to prevent injection attacks';