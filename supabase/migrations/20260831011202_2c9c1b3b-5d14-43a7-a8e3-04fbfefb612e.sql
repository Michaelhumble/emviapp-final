CREATE TABLE IF NOT EXISTS public.social_content_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL,
  source_type text NOT NULL,
  source_id uuid,
  source_url text,
  platform text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  headline text,
  caption text NOT NULL,
  hashtags text[] NOT NULL DEFAULT '{}',
  cta text,
  creative_brief text,
  target_url text,
  status text NOT NULL DEFAULT 'draft',
  fact_check_status text NOT NULL DEFAULT 'passed',
  fact_check_notes text,
  dedupe_key text,
  scheduled_at timestamptz,
  published_at timestamptz,
  external_post_id text,
  external_post_url text,
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT social_content_queue_status_chk CHECK (status IN ('draft','approved','scheduled','published','failed','rejected')),
  CONSTRAINT social_content_queue_fact_chk CHECK (fact_check_status IN ('passed','needs_review','failed')),
  CONSTRAINT social_content_queue_platform_chk CHECK (platform IN ('facebook','instagram','tiktok','linkedin','x','pinterest')),
  CONSTRAINT social_content_queue_language_chk CHECK (language IN ('en','vi'))
);

CREATE UNIQUE INDEX IF NOT EXISTS social_content_queue_dedupe_uidx
  ON public.social_content_queue (dedupe_key) WHERE dedupe_key IS NOT NULL;
CREATE INDEX IF NOT EXISTS social_content_queue_status_idx ON public.social_content_queue (status, created_at DESC);
CREATE INDEX IF NOT EXISTS social_content_queue_created_idx ON public.social_content_queue (created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.social_content_queue TO authenticated;
GRANT ALL ON public.social_content_queue TO service_role;
ALTER TABLE public.social_content_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "social_queue_admin_all" ON public.social_content_queue
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE TABLE IF NOT EXISTS public.social_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'not_connected',
  provider text,
  account_label text,
  notes text,
  last_checked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT social_connections_status_chk CHECK (status IN ('not_connected','connected','needs_attention'))
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.social_connections TO authenticated;
GRANT ALL ON public.social_connections TO service_role;
ALTER TABLE public.social_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "social_connections_admin_all" ON public.social_connections
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE TRIGGER social_content_queue_set_updated_at
  BEFORE UPDATE ON public.social_content_queue
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER social_connections_set_updated_at
  BEFORE UPDATE ON public.social_connections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.social_connections (platform, status, notes)
VALUES
  ('facebook','not_connected','Phase 2: connect via publishing provider'),
  ('instagram','not_connected','Phase 2: connect via publishing provider'),
  ('tiktok','not_connected','Phase 2: connect via publishing provider'),
  ('linkedin','not_connected','Phase 2: connect via publishing provider')
ON CONFLICT (platform) DO NOTHING;