-- Continue fixing remaining database functions - Part 3: More critical functions
-- Fix process_referral_signup function
CREATE OR REPLACE FUNCTION public.process_referral_signup()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  -- If the user was referred (has referred_by value) and it just changed
  IF NEW.referred_by IS NOT NULL AND 
     (TG_OP = 'INSERT' OR OLD.referred_by IS NULL OR OLD.referred_by <> NEW.referred_by) THEN
    
    -- Update the referring user's credits (add 10 per referral)
    UPDATE public.users
    SET credits = COALESCE(credits, 0) + 10
    WHERE referral_code = NEW.referred_by;
    
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Fix award_salon_credits function
CREATE OR REPLACE FUNCTION public.award_salon_credits(p_salon_id uuid, p_amount integer, p_source text, p_description text DEFAULT NULL::text, p_metadata jsonb DEFAULT '{}'::jsonb)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.salon_credits (
    salon_id,
    amount,
    transaction_type,
    source,
    description,
    metadata
  ) VALUES (
    p_salon_id,
    p_amount,
    'earned',
    p_source,
    p_description,
    p_metadata
  );
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$function$;

-- Fix generate_team_invite_code function
CREATE OR REPLACE FUNCTION public.generate_team_invite_code()
 RETURNS text
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    -- Generate a random 6 character code
    new_code := substring(md5(gen_random_uuid()::text) from 1 for 6);
    
    -- Check if code already exists
    SELECT EXISTS(
      SELECT 1 FROM team_invites WHERE invite_code = new_code
    ) INTO code_exists;
    
    -- If code doesn't exist, use it
    IF NOT code_exists THEN
      RETURN new_code;
    END IF;
  END LOOP;
END;
$function$;

-- Fix handle_salon_review_credits function
CREATE OR REPLACE FUNCTION public.handle_salon_review_credits()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Award 10 credits for receiving a review
  PERFORM public.award_salon_credits(
    NEW.salon_id,
    10,
    'review_received',
    'Customer review: ' || COALESCE(LEFT(NEW.review_text, 50), 'No comment') || '...',
    jsonb_build_object('review_id', NEW.id, 'rating', NEW.rating)
  );
  
  RETURN NEW;
END;
$function$;

-- Fix tag_user function
CREATE OR REPLACE FUNCTION public.tag_user(p_user_id uuid, p_tag text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Check if tag already exists for user
  IF EXISTS (
    SELECT 1 FROM public.user_tags 
    WHERE user_id = p_user_id AND tag = p_tag
  ) THEN
    RETURN FALSE;
  END IF;

  -- Insert the tag
  INSERT INTO public.user_tags (user_id, tag)
  VALUES (p_user_id, p_tag);
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$function$;

-- Fix tag_inactive_users function
CREATE OR REPLACE FUNCTION public.tag_inactive_users()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Find users who haven't logged in for 7+ days
  INSERT INTO public.user_tags (user_id, tag)
  SELECT 
    id as user_id,
    'inactive' as tag
  FROM auth.users u
  WHERE 
    last_sign_in_at < NOW() - INTERVAL '7 days'
    AND NOT EXISTS (
      SELECT 1 FROM public.user_tags ut 
      WHERE ut.user_id = u.id AND ut.tag = 'inactive'
    );
END;
$function$;

-- Fix user_has_salon_access function
CREATE OR REPLACE FUNCTION public.user_has_salon_access(p_user_id uuid, p_salon_id uuid, p_access_types text[] DEFAULT ARRAY['owner'::text, 'manager'::text])
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  has_access boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM user_salon_access
    WHERE user_id = p_user_id
    AND salon_id = p_salon_id
    AND access_type = ANY(p_access_types)
  ) INTO has_access;
  
  RETURN has_access;
END;
$function$;

-- Fix tag_top_referrers function
CREATE OR REPLACE FUNCTION public.tag_top_referrers()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Find users with 3+ referrals
  INSERT INTO public.user_tags (user_id, tag)
  SELECT 
    referrer_id as user_id,
    'top-referrer' as tag
  FROM (
    SELECT referrer_id, COUNT(*) as ref_count
    FROM public.referrals
    GROUP BY referrer_id
    HAVING COUNT(*) >= 3
  ) top_refs
  WHERE NOT EXISTS (
    SELECT 1 FROM public.user_tags ut 
    WHERE ut.user_id = top_refs.referrer_id 
    AND ut.tag = 'top-referrer'
  );
END;
$function$;

-- Fix get_salon_credits function
CREATE OR REPLACE FUNCTION public.get_salon_credits(p_salon_id uuid)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  total_credits INTEGER;
BEGIN
  SELECT COALESCE(SUM(
    CASE 
      WHEN transaction_type = 'earned' OR transaction_type = 'bonus' THEN amount
      WHEN transaction_type = 'spent' THEN -amount
      ELSE 0
    END
  ), 0) INTO total_credits
  FROM public.salon_credits
  WHERE salon_id = p_salon_id;
  
  RETURN total_credits;
END;
$function$;

-- Fix track_salon_view function
CREATE OR REPLACE FUNCTION public.track_salon_view(p_salon_id uuid, p_viewer_id uuid DEFAULT NULL::uuid, p_source text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.salon_views (
    salon_id,
    viewer_id,
    source,
    session_id
  ) VALUES (
    p_salon_id,
    p_viewer_id,
    p_source,
    md5(now()::text || coalesce(p_viewer_id::text, 'anon'))
  );
END;
$function$;