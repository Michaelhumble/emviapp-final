-- Security Fix Phase 1B: Fix remaining trigger and utility functions
-- Move search_path from function body to header for remaining SECURITY DEFINER functions

-- 1. update_hubspot_counters_updated_at (trigger function)
CREATE OR REPLACE FUNCTION public.update_hubspot_counters_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- 2. populate_artist_demo_data (trigger function)
CREATE OR REPLACE FUNCTION public.populate_artist_demo_data()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  IF NEW.role = 'artist' OR NEW.role = 'nail technician/artist' THEN
    INSERT INTO portfolio_items (
      user_id,
      title,
      image_url,
      description,
      "order"
    )
    SELECT 
      NEW.id,
      (item->>'title')::text,
      (item->>'image_url')::text,
      (item->>'description')::text,
      row_number() OVER ()
    FROM default_artist_data, 
    jsonb_array_elements(content) AS item
    WHERE data_type = 'portfolio';
  END IF;
  
  RETURN NEW;
END;
$function$;

-- 3. refresh_mv_jobs_recently_filled
CREATE OR REPLACE FUNCTION public.refresh_mv_jobs_recently_filled()
 RETURNS void
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY mv_jobs_recently_filled;
END;
$function$;

-- 4. generate_team_invite_code
CREATE OR REPLACE FUNCTION public.generate_team_invite_code()
 RETURNS text
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    new_code := substring(md5(gen_random_uuid()::text) from 1 for 6);
    
    SELECT EXISTS(
      SELECT 1 FROM team_invites WHERE invite_code = new_code
    ) INTO code_exists;
    
    IF NOT code_exists THEN
      RETURN new_code;
    END IF;
  END LOOP;
END;
$function$;

-- 5. generate_universal_invite_code
CREATE OR REPLACE FUNCTION public.generate_universal_invite_code()
 RETURNS text
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    new_code := 'TEAM-' || substring(md5(gen_random_uuid()::text) from 1 for 8);
    
    SELECT EXISTS(
      SELECT 1 FROM universal_team_invites WHERE invite_code = new_code
    ) INTO code_exists;
    
    IF NOT code_exists THEN
      RETURN new_code;
    END IF;
  END LOOP;
END;
$function$;

-- 6. update_universal_invites_updated_at (trigger function)
CREATE OR REPLACE FUNCTION public.update_universal_invites_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- 7. update_challenge_participant_count (trigger function)
CREATE OR REPLACE FUNCTION public.update_challenge_participant_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE challenges 
    SET participant_count = participant_count + 1 
    WHERE id = NEW.challenge_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE challenges 
    SET participant_count = GREATEST(participant_count - 1, 0) 
    WHERE id = OLD.challenge_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- 8. is_post_expired
CREATE OR REPLACE FUNCTION public.is_post_expired(expires_at timestamp with time zone)
 RETURNS boolean
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  RETURN expires_at < NOW();
END;
$function$;

-- 9. update_entry_votes_count (trigger function)
CREATE OR REPLACE FUNCTION public.update_entry_votes_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE challenge_entries 
    SET votes_count = votes_count + 1 
    WHERE id = NEW.entry_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE challenge_entries 
    SET votes_count = GREATEST(votes_count - 1, 0) 
    WHERE id = OLD.entry_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$function$;