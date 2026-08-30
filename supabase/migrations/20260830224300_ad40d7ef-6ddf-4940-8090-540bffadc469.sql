-- 1. job_alerts: remove public read
DROP POLICY IF EXISTS "Users can view alerts by email" ON public.job_alerts;
CREATE POLICY "Users can view their own alerts" ON public.job_alerts
  FOR SELECT TO authenticated
  USING (email = auth.email() OR public.has_role(auth.uid(),'admin'));

-- 2. valuation_leads: remove anon bypass
DROP POLICY IF EXISTS "Users can view their own leads" ON public.valuation_leads;
CREATE POLICY "Users can view their own leads" ON public.valuation_leads
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));

-- 3. auth_state: service role only
DROP POLICY IF EXISTS "System can manage auth state" ON public.auth_state;
REVOKE ALL ON public.auth_state FROM anon, authenticated;
GRANT ALL ON public.auth_state TO service_role;

-- 4. pending_salons: owner-only updates
DROP POLICY IF EXISTS "Edge functions can update pending salons" ON public.pending_salons;
CREATE POLICY "Users can update their own pending salons" ON public.pending_salons
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 5. subscribers: own-row updates only
DROP POLICY IF EXISTS "update_own_subscription" ON public.subscribers;
CREATE POLICY "update_own_subscription" ON public.subscribers
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR email = auth.email())
  WITH CHECK (user_id = auth.uid() OR email = auth.email());

-- 6. subscription_intents: own-row updates only
DROP POLICY IF EXISTS "update_subscription_intents" ON public.subscription_intents;
CREATE POLICY "update_subscription_intents" ON public.subscription_intents
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- 7. payments: only service role may insert
DROP POLICY IF EXISTS "Service role can insert payments" ON public.payments;
CREATE POLICY "Service role can insert payments" ON public.payments
  FOR INSERT TO service_role WITH CHECK (true);
REVOKE INSERT, UPDATE, DELETE ON public.payments FROM anon, authenticated;
GRANT ALL ON public.payments TO service_role;

-- 8. salon_credits: only service role may insert
DROP POLICY IF EXISTS "System can insert credit transactions" ON public.salon_credits;
CREATE POLICY "Service role can insert credit transactions" ON public.salon_credits
  FOR INSERT TO service_role WITH CHECK (true);
REVOKE INSERT, UPDATE, DELETE ON public.salon_credits FROM anon, authenticated;
GRANT ALL ON public.salon_credits TO service_role;

-- 9. salon_staff: no public exposure of staff PII
DROP POLICY IF EXISTS "Public can view active staff" ON public.salon_staff;
REVOKE ALL ON public.salon_staff FROM anon;

-- 10. public_profiles view hardening (keeps public browsing; blocks leaky-function column probing)
ALTER VIEW public.public_profiles SET (security_barrier = true);
REVOKE INSERT, UPDATE, DELETE ON public.public_profiles FROM anon, authenticated;