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
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon, authenticated', r.sig);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role', r.sig);
    IF r.proname = ANY(allowed) THEN
      EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO authenticated', r.sig);
      IF r.proname IN ('get_user_count','get_community_leaderboard','search_salon_sales_optimized',
                       'sanitize_content','check_rate_limit','check_api_rate_limit','verify_manage_token',
                       'validate_team_invite','accept_universal_invite','get_public_artist_profiles',
                       'get_artist_rating','is_post_expired','track_salon_view','get_cities_for_daily_indexing',
                       'generate_affiliate_slug','detect_prompt_abuse','has_role','is_admin') THEN
        EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO anon', r.sig);
      END IF;
    END IF;
  END LOOP;
END $$;