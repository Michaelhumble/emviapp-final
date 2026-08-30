-- 1) community_leaderboard: only service_role may write
DROP POLICY IF EXISTS "System can update leaderboard data" ON public.community_leaderboard;
DROP POLICY IF EXISTS "System can update leaderboard" ON public.community_leaderboard;
CREATE POLICY "Service role manages leaderboard" ON public.community_leaderboard
  FOR ALL TO service_role USING (true) WITH CHECK (true);
REVOKE INSERT, UPDATE, DELETE ON public.community_leaderboard FROM anon, authenticated;

-- 2) credits_ledger / user_unlocks: remove anonymous bypass
DROP POLICY IF EXISTS "System can insert credit transactions" ON public.credits_ledger;
CREATE POLICY "Users can insert their own credit transactions" ON public.credits_ledger
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
REVOKE INSERT ON public.credits_ledger FROM anon;

DROP POLICY IF EXISTS "System can insert unlocks" ON public.user_unlocks;
CREATE POLICY "Users can insert their own unlocks" ON public.user_unlocks
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
REVOKE INSERT ON public.user_unlocks FROM anon;

-- 3) rate limits: service_role only (SECURITY DEFINER rate limit functions still work)
DROP POLICY IF EXISTS "System can manage rate limits" ON public.rate_limits;
CREATE POLICY "Service role manages rate limits" ON public.rate_limits
  FOR ALL TO service_role USING (true) WITH CHECK (true);
REVOKE ALL ON public.rate_limits FROM anon, authenticated;

DROP POLICY IF EXISTS "System can manage rate limits" ON public.api_rate_limits;
CREATE POLICY "Service role manages api rate limits" ON public.api_rate_limits
  FOR ALL TO service_role USING (true) WITH CHECK (true);
REVOKE ALL ON public.api_rate_limits FROM anon, authenticated;

-- 4) fix mutable search_path on all public functions missing it
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT p.oid::regprocedure AS sig
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.prokind = 'f'
      AND (p.proconfig IS NULL OR NOT EXISTS (
            SELECT 1 FROM unnest(p.proconfig) c WHERE c LIKE 'search_path=%'))
  LOOP
    EXECUTE format('ALTER FUNCTION %s SET search_path = public', r.sig);
  END LOOP;
END $$;

-- 5) revoke EXECUTE on SECURITY DEFINER functions from anon/authenticated,
--    except the ones the application legitimately calls or that RLS policies depend on
DO $$
DECLARE
  r record;
  allowed text[] := ARRAY[
    'has_role','is_admin','has_posted_free_job',
    'accept_team_invite','accept_universal_invite','audit_user_action','award_credits',
    'award_salon_credits','award_team_badge','check_ai_rate_limit','check_api_rate_limit',
    'check_booking_conflicts','check_rate_limit','create_diamond_tier_waitlist_if_not_exists',
    'create_team_invite','decrement_post_likes','detect_prompt_abuse','generate_affiliate_slug',
    'generate_manage_token','get_admin_dashboard_stats','get_cities_for_daily_indexing',
    'get_community_leaderboard','get_public_artist_profiles','get_salon_credits','get_salon_earnings',
    'get_user_count','get_user_credits','get_user_rank','get_user_referral_stats','has_great_feedback',
    'increment_post_likes','is_top_performer','redeem_credits','sanitize_content',
    'search_salon_sales_optimized','spend_credits','tag_user','unlock_level','validate_team_invite',
    'verify_manage_token','submit_review_with_credits','get_artist_rating','get_artist_earnings_for_user',
    'can_access_salon_earnings','can_review_booking','can_user_post','get_customer_booking_info',
    'get_customer_info','get_next_referral_milestone','get_post_status_for_user','is_artist_available',
    'is_post_expired','is_user_invited','track_salon_view','create_universal_team_invite','send_team_invite'
  ];
BEGIN
  FOR r IN
    SELECT p.oid::regprocedure AS sig, p.proname
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.prosecdef
  LOOP
    IF NOT (r.proname = ANY(allowed)) THEN
      EXECUTE format('REVOKE ALL ON FUNCTION %s FROM anon, authenticated', r.sig);
    END IF;
  END LOOP;
END $$;