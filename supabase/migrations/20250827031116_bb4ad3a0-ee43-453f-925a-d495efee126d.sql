-- 1. Fix SECURITY DEFINER functions (only public schema functions we own)
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN
    SELECT n.nspname AS schema,
           p.proname AS function,
           pg_get_function_identity_arguments(p.oid) AS args
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE p.prosecdef
      AND n.nspname = 'public'
      AND p.proowner = (SELECT usesysid FROM pg_user WHERE usename = current_user)
  LOOP
    EXECUTE format(
      'ALTER FUNCTION %I.%I(%s) SET search_path TO pg_catalog, public;',
      r.schema, r.function, r.args
    );
  END LOOP;
END $$;

-- 2. Fix missing column
ALTER TABLE public.artist_for_hire_profiles
ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;

-- 3. RLS policies for profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;

CREATE POLICY "profiles_select_own"
ON public.profiles
FOR SELECT
USING (id = auth.uid());

CREATE POLICY "profiles_update_own"
ON public.profiles
FOR UPDATE
USING (id = auth.uid())
WITH CHECK (id = auth.uid());