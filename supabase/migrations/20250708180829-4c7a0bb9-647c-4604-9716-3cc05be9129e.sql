-- Add function to check if user has posted a free job
CREATE OR REPLACE FUNCTION public.has_posted_free_job(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  SET search_path = public;
  RETURN EXISTS (
    SELECT 1 FROM public.jobs
    WHERE user_id = p_user_id 
    AND pricing_tier = 'free'
    AND status = 'active'
  );
END;
$function$;

-- Add function to get user's free job count
CREATE OR REPLACE FUNCTION public.get_user_free_job_count(p_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  SET search_path = public;
  RETURN (
    SELECT COUNT(*)::integer
    FROM public.jobs
    WHERE user_id = p_user_id 
    AND pricing_tier = 'free'
    AND status = 'active'
  );
END;
$function$;

-- Add RLS policy to prevent multiple free jobs per user
CREATE POLICY "prevent_multiple_free_jobs" ON public.jobs
FOR INSERT
WITH CHECK (
  CASE 
    WHEN pricing_tier = 'free' THEN NOT public.has_posted_free_job(auth.uid())
    ELSE true
  END
);