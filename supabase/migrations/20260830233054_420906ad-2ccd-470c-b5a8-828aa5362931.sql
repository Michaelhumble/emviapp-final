ALTER TABLE public.jobs
  ADD COLUMN IF NOT EXISTS metadata_public jsonb
  GENERATED ALWAYS AS (
    (COALESCE(metadata, '{}'::jsonb) - 'contact_info' - 'email' - 'phone' - 'owner_name' - 'owner_email' - 'owner_phone' - 'contact_email' - 'contact_phone' - 'client_phone')
  ) STORED;

REVOKE SELECT (metadata) ON public.jobs FROM anon;
GRANT SELECT (metadata_public) ON public.jobs TO anon;
GRANT SELECT (metadata_public) ON public.jobs TO authenticated;