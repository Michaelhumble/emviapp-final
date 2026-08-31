
-- 1) Shape the canonical table
DELETE FROM public.job_applications WHERE job_id IS NULL OR applicant_id IS NULL;

ALTER TABLE public.job_applications
  ALTER COLUMN job_id SET NOT NULL,
  ALTER COLUMN applicant_id SET NOT NULL,
  ALTER COLUMN status SET DEFAULT 'submitted',
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'job_applications_job_id_fkey'
  ) THEN
    ALTER TABLE public.job_applications
      ADD CONSTRAINT job_applications_job_id_fkey
      FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS job_applications_unique_per_user_job
  ON public.job_applications (job_id, applicant_id);

CREATE INDEX IF NOT EXISTS job_applications_job_id_idx ON public.job_applications (job_id);
CREATE INDEX IF NOT EXISTS job_applications_applicant_idx ON public.job_applications (applicant_id);

-- 2) Grants (PostgREST access) - no anon
GRANT SELECT, INSERT, UPDATE ON public.job_applications TO authenticated;
GRANT ALL ON public.job_applications TO service_role;

-- 3) RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can create job applications" ON public.job_applications;
DROP POLICY IF EXISTS "Users can update their own applications" ON public.job_applications;
DROP POLICY IF EXISTS "applicants_insert_own_application" ON public.job_applications;
DROP POLICY IF EXISTS "applicants_select_own_application" ON public.job_applications;
DROP POLICY IF EXISTS "job_owner_select_applications" ON public.job_applications;
DROP POLICY IF EXISTS "job_owner_update_applications" ON public.job_applications;
DROP POLICY IF EXISTS "admins_select_applications" ON public.job_applications;

CREATE POLICY "applicants_insert_own_application"
  ON public.job_applications FOR INSERT TO authenticated
  WITH CHECK (applicant_id = auth.uid());

CREATE POLICY "applicants_select_own_application"
  ON public.job_applications FOR SELECT TO authenticated
  USING (applicant_id = auth.uid());

CREATE POLICY "job_owner_select_applications"
  ON public.job_applications FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.jobs j WHERE j.id = job_applications.job_id AND j.user_id = auth.uid()));

CREATE POLICY "job_owner_update_applications"
  ON public.job_applications FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.jobs j WHERE j.id = job_applications.job_id AND j.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.jobs j WHERE j.id = job_applications.job_id AND j.user_id = auth.uid()));

CREATE POLICY "admins_select_applications"
  ON public.job_applications FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 4) Server-side identity + job existence enforcement
CREATE OR REPLACE FUNCTION public.enforce_job_application_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required to apply';
  END IF;

  NEW.applicant_id := auth.uid();

  IF NOT EXISTS (SELECT 1 FROM public.jobs j WHERE j.id = NEW.job_id) THEN
    RAISE EXCEPTION 'Job does not exist';
  END IF;

  NEW.status := COALESCE(NULLIF(NEW.status, ''), 'submitted');
  IF NEW.status NOT IN ('submitted','reviewed','accepted','rejected','withdrawn','pending') THEN
    NEW.status := 'submitted';
  END IF;

  NEW.created_at := now();
  NEW.updated_at := now();
  NEW.reviewed_at := NULL;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_job_application_insert_trg ON public.job_applications;
CREATE TRIGGER enforce_job_application_insert_trg
  BEFORE INSERT ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.enforce_job_application_insert();

-- 5) Notify job owner
CREATE OR REPLACE FUNCTION public.notify_owner_on_job_application()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  owner_id uuid;
  job_title text;
BEGIN
  SELECT j.user_id, j.title INTO owner_id, job_title FROM public.jobs j WHERE j.id = NEW.job_id;
  IF owner_id IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, message, type, link, metadata)
    VALUES (
      owner_id,
      'New application for ' || COALESCE(job_title, 'your job'),
      'job_application',
      '/my-jobs/' || NEW.job_id::text || '/applicants',
      jsonb_build_object('job_id', NEW.job_id, 'application_id', NEW.id)
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS notify_owner_on_job_application_trg ON public.job_applications;
CREATE TRIGGER notify_owner_on_job_application_trg
  AFTER INSERT ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.notify_owner_on_job_application();
