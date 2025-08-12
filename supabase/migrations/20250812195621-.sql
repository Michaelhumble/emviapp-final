-- Pin search_path to public for web roles
ALTER ROLE authenticated SET search_path = public;
ALTER ROLE anon SET search_path = public;
ALTER ROLE service_role SET search_path = public;

-- Ensure RLS on public.users table and add safe owner/public policies if the table exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_tables WHERE schemaname='public' AND tablename='users'
  ) THEN
    -- Enable RLS
    EXECUTE 'ALTER TABLE public.users ENABLE ROW LEVEL SECURITY';

    -- Owner can manage their own row (id matches auth.uid())
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname='public' AND tablename='users' AND policyname='Users can manage their own row'
    ) THEN
      EXECUTE 'CREATE POLICY "Users can manage their own row" ON public.users FOR ALL USING (id = auth.uid()) WITH CHECK (id = auth.uid())';
    END IF;

    -- Optional public read policy gated by is_public column if present
    IF EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema='public' AND table_name='users' AND column_name='is_public'
    ) AND NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname='public' AND tablename='users' AND policyname='Public can view public users'
    ) THEN
      EXECUTE 'CREATE POLICY "Public can view public users" ON public.users FOR SELECT TO public USING (COALESCE(is_public, false) = true)';
    END IF;
  END IF;
END $$;