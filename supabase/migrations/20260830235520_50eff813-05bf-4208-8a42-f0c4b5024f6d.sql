DROP POLICY IF EXISTS "prevent_multiple_free_jobs" ON public.jobs;

CREATE OR REPLACE FUNCTION public.enforce_safe_user_job_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count integer;
BEGIN
  -- Service role (Stripe webhooks / paid flow / admin tooling) is trusted as-is.
  IF auth.role() = 'service_role' OR auth.uid() IS NULL THEN
    RETURN NEW;
  END IF;

  -- Ownership is always the authenticated user.
  NEW.user_id := auth.uid();

  -- Free growth stage: user-created posts are free, active listings.
  NEW.pricing_tier := 'free';
  NEW.payment_status := 'free';
  NEW.status := COALESCE(NULLIF(NEW.status, ''), 'active');
  IF NEW.status NOT IN ('active', 'draft') THEN
    NEW.status := 'active';
  END IF;
  NEW.created_at := now();
  NEW.updated_at := now();
  NEW.expires_at := now() + interval '30 days';

  -- Seed/demo flags cannot be forged by users.
  NEW.seed_tag := NULL;

  -- Reasonable abuse protection (not a lifetime limit).
  SELECT count(*) INTO recent_count
  FROM public.jobs
  WHERE user_id = auth.uid()
    AND created_at > now() - interval '24 hours';

  IF recent_count >= 10 THEN
    RAISE EXCEPTION 'Job posting limit reached: you can post up to 10 jobs per 24 hours.';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_safe_user_job_insert ON public.jobs;
CREATE TRIGGER enforce_safe_user_job_insert
BEFORE INSERT ON public.jobs
FOR EACH ROW EXECUTE FUNCTION public.enforce_safe_user_job_insert();