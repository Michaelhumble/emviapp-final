-- 1. affiliate_payouts: service role only for writes
DROP POLICY IF EXISTS "System can manage payouts" ON public.affiliate_payouts;
CREATE POLICY "Service role can manage payouts"
ON public.affiliate_payouts FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- 2. staff_service_assignments: owner or service role
DROP POLICY IF EXISTS "System can manage staff assignments" ON public.staff_service_assignments;
CREATE POLICY "Service owners or service role manage staff assignments"
ON public.staff_service_assignments FOR ALL
USING (
  auth.role() = 'service_role'
  OR EXISTS (
    SELECT 1 FROM public.artist_services s
    WHERE s.id = staff_service_assignments.service_id
      AND s.user_id = auth.uid()
  )
)
WITH CHECK (
  auth.role() = 'service_role'
  OR EXISTS (
    SELECT 1 FROM public.artist_services s
    WHERE s.id = staff_service_assignments.service_id
      AND s.user_id = auth.uid()
  )
);

-- 3. blog images storage: read public, writes service role only
DROP POLICY IF EXISTS "Service role can manage blog images" ON storage.objects;
CREATE POLICY "Service role can manage blog images"
ON storage.objects FOR ALL
USING (bucket_id = 'blog-images' AND auth.role() = 'service_role')
WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'service_role');

-- 4. job photos storage: only owner can update/delete
DROP POLICY IF EXISTS "Authenticated users can update job photos" ON storage.objects;
CREATE POLICY "Owners can update their job photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'job-photos' AND owner = auth.uid())
WITH CHECK (bucket_id = 'job-photos' AND owner = auth.uid());

DROP POLICY IF EXISTS "Authenticated users can delete job photos" ON storage.objects;
CREATE POLICY "Owners can delete their job photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'job-photos' AND owner = auth.uid());

-- 5. is_admin(): use user_roles instead of hardcoded email
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role FROM auth.users WHERE email = 'humbleinsider@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT public.has_role(auth.uid(), 'admin'::public.app_role);
$function$;