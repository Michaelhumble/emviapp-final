-- Security Fix: Add SET search_path = public to SECURITY DEFINER functions
-- Phase 1 of Security Bundle 2025-09-30
-- Prevents search_path hijacking attacks on privileged functions

-- cleanup_old_hubspot_events - Missing search_path
CREATE OR REPLACE FUNCTION public.cleanup_old_hubspot_events()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  DELETE FROM hubspot_events 
  WHERE created_at < (now() - INTERVAL '180 days');
END;
$function$;