-- SECURITY FIX: Add search_path protection to all database functions
-- This prevents potential SQL injection and privilege escalation attacks

-- 1. Fix functions missing search_path
CREATE OR REPLACE FUNCTION public.get_user_count()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  user_count integer;
BEGIN
  SELECT COUNT(*) INTO user_count FROM public.profiles;
  RETURN user_count;
END;
$function$;

CREATE OR REPLACE FUNCTION public.array_append_unique(arr text[], item text)
 RETURNS text[]
 LANGUAGE sql
 IMMUTABLE
 SET search_path = 'public'
AS $function$
  SELECT CASE 
    WHEN arr IS NULL THEN ARRAY[item]
    WHEN item = ANY(arr) THEN arr
    ELSE arr || item
  END;
$function$;

CREATE OR REPLACE FUNCTION public.update_challenge_participant_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.challenges 
    SET participant_count = participant_count + 1 
    WHERE id = NEW.challenge_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.challenges 
    SET participant_count = GREATEST(participant_count - 1, 0) 
    WHERE id = OLD.challenge_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_post_expired(expires_at timestamp with time zone)
 RETURNS boolean
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  RETURN expires_at < NOW();
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_entry_votes_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.challenge_entries 
    SET votes_count = votes_count + 1 
    WHERE id = NEW.entry_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.challenge_entries 
    SET votes_count = GREATEST(votes_count - 1, 0) 
    WHERE id = OLD.entry_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$function$;