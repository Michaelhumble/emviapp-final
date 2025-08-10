-- Enforce exactly one free job per owner (org or user) via partial unique index
DO $$
BEGIN
  -- If jobs.org_id exists, enforce one free job per org
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'jobs' AND column_name = 'org_id'
  ) THEN
    EXECUTE 'CREATE UNIQUE INDEX IF NOT EXISTS uniq_one_free_job_per_org 
             ON public.jobs (org_id) 
             WHERE (is_free = true)';
  ELSIF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = ''jobs'' AND column_name = ''created_by_user_id''
  ) THEN
    -- Else, enforce one free job per user (created_by_user_id)
    EXECUTE 'CREATE UNIQUE INDEX IF NOT EXISTS uniq_one_free_job_per_user 
             ON public.jobs (created_by_user_id) 
             WHERE (is_free = true)';
  END IF;
END$$;