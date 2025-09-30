-- Security Fix Phase 1D: Fix additional functions including SQL-language functions
-- Address remaining search_path warnings

-- 1. process_referral_signup (trigger function)
CREATE OR REPLACE FUNCTION public.process_referral_signup()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  IF NEW.referred_by IS NOT NULL AND 
     (TG_OP = 'INSERT' OR OLD.referred_by IS NULL OR OLD.referred_by <> NEW.referred_by) THEN
    
    UPDATE users
    SET credits = COALESCE(credits, 0) + 10
    WHERE referral_code = NEW.referred_by;
    
  END IF;
  
  RETURN NEW;
END;
$function$;

-- 2. array_append_unique (SQL function)
CREATE OR REPLACE FUNCTION public.array_append_unique(arr text[], item text)
 RETURNS text[]
 LANGUAGE sql
 IMMUTABLE
 SET search_path = public
AS $function$
  SELECT CASE 
    WHEN arr IS NULL THEN ARRAY[item]
    WHEN item = ANY(arr) THEN arr
    ELSE arr || item
  END;
$function$;

-- 3. tag_user (if incomplete in original - adding basic version)
CREATE OR REPLACE FUNCTION public.tag_user(p_user_id uuid, p_tag text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  UPDATE users
  SET tags = array_append_unique(COALESCE(tags, ARRAY[]::text[]), p_tag)
  WHERE id = p_user_id;
  
  RETURN FOUND;
END;
$function$;

-- 4. activate_job_on_payment (trigger function)
CREATE OR REPLACE FUNCTION public.activate_job_on_payment()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    UPDATE jobs 
    SET status = 'active'
    WHERE user_id = NEW.user_id 
      AND status = 'draft' 
      AND payment_status = 'pending'
      AND created_at >= (NEW.created_at - INTERVAL '1 hour');
  END IF;
  
  RETURN NEW;
END;
$function$;

-- 5. activate_salon_on_payment (trigger function)
CREATE OR REPLACE FUNCTION public.activate_salon_on_payment()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    UPDATE salon_sales 
    SET status = 'active'
    WHERE user_id = NEW.user_id 
      AND status = 'draft' 
      AND created_at >= (NEW.created_at - INTERVAL '1 hour');
  END IF;
  
  RETURN NEW;
END;
$function$;

-- 6. handle_follow_credit (trigger function)
CREATE OR REPLACE FUNCTION public.handle_follow_credit()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  PERFORM award_credits(
    NEW.viewer_id, 
    'follow_artist', 
    5,
    'followed_' || NEW.artist_id
  );
  RETURN NEW;
END;
$function$;

-- 7. handle_bookmark_credit (trigger function)
CREATE OR REPLACE FUNCTION public.handle_bookmark_credit()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  PERFORM award_credits(
    NEW.viewer_id, 
    'bookmark_artist', 
    2,
    'bookmarked_' || NEW.artist_id
  );
  RETURN NEW;
END;
$function$;