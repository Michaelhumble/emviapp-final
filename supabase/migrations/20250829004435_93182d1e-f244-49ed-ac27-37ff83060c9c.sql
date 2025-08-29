-- Fix critical security issues from linter
BEGIN;

-- 1) Fix RLS disabled tables - enable RLS on all public tables that don't have it
DO $$
DECLARE
    rec RECORD;
BEGIN
    FOR rec IN 
        SELECT schemaname, tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename NOT IN (
            SELECT t.table_name 
            FROM information_schema.tables t
            JOIN pg_class c ON c.relname = t.table_name
            WHERE c.relrowsecurity = true
            AND t.table_schema = 'public'
        )
    LOOP
        EXECUTE format('ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY', rec.schemaname, rec.tablename);
        RAISE NOTICE 'Enabled RLS on %.%', rec.schemaname, rec.tablename;
    END LOOP;
END $$;

-- 2) Fix remaining search path issues for functions that weren't caught in the previous migration
ALTER FUNCTION public.get_user_count() SET search_path = 'pg_catalog', 'public';
ALTER FUNCTION public.handle_follow_credit() SET search_path = 'pg_catalog', 'public';
ALTER FUNCTION public.handle_bookmark_credit() SET search_path = 'pg_catalog', 'public';
ALTER FUNCTION public.award_tip_credits(uuid, numeric, text) SET search_path = 'pg_catalog', 'public';
ALTER FUNCTION public.generate_unique_referral_code() SET search_path = 'pg_catalog', 'public';
ALTER FUNCTION public.can_user_post(uuid, text) SET search_path = 'pg_catalog', 'public';
ALTER FUNCTION public.get_customer_booking_info(uuid) SET search_path = 'pg_catalog', 'public';
ALTER FUNCTION public.activate_job_on_payment() SET search_path = 'pg_catalog', 'public';
ALTER FUNCTION public.auto_tag_job_industry() SET search_path = 'pg_catalog', 'public';
ALTER FUNCTION public.process_referral_signup() SET search_path = 'pg_catalog', 'public';
ALTER FUNCTION public.activate_free_jobs() SET search_path = 'pg_catalog', 'public';
ALTER FUNCTION public.update_updated_at_column() SET search_path = 'pg_catalog', 'public';
ALTER FUNCTION public.award_credits(uuid, text, integer, text) SET search_path = 'pg_catalog', 'public';

COMMIT;