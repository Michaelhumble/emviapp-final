-- SECURITY FIX: Fix all remaining database functions with search_path protection
-- Final batch to secure all functions against SQL injection

-- Continue with more critical functions
CREATE OR REPLACE FUNCTION public.handle_bookmark_credit()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Award 2 credits for bookmarking an artist
  PERFORM public.award_credits(
    NEW.viewer_id, 
    'bookmark_artist', 
    2,
    'bookmarked_' || NEW.artist_id
  );
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.award_tip_credits(p_user_id uuid, p_amount numeric, p_transaction_id text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  credit_amount INTEGER;
BEGIN
  -- Calculate credits (1 per $10)
  credit_amount := FLOOR(p_amount / 10)::INTEGER;
  
  -- Only award if there are credits to give
  IF credit_amount > 0 THEN
    PERFORM public.award_credits(
      p_user_id, 
      'tip_artist', 
      credit_amount,
      'tip_' || p_transaction_id
    );
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_unique_referral_code()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
DECLARE
    new_code TEXT;
    code_exists BOOLEAN;
BEGIN
    IF NEW.referral_code IS NULL THEN
        LOOP
            new_code := 'EMVI' || substring(md5(NEW.id::text || random()::text) from 1 for 6);
            SELECT EXISTS(SELECT 1 FROM public.users WHERE referral_code = new_code) INTO code_exists;
            IF NOT code_exists THEN
                NEW.referral_code := new_code;
                EXIT;
            END IF;
        END LOOP;
    END IF;
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_post_status_for_user(p_user_id uuid)
 RETURNS TABLE(post_id uuid, status text, payment_status text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Only return data for the authenticated user
  IF auth.uid() != p_user_id THEN
    RAISE EXCEPTION 'Access denied. Can only view own posts.';
  END IF;
  
  RETURN QUERY
  SELECT j.id as post_id, j.status, j.payment_status
  FROM jobs j
  WHERE j.user_id = p_user_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.process_referral_credits(p_referrer_code text, p_new_user_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  referrer_id UUID;
BEGIN
  -- Find the referrer based on the code
  SELECT id INTO referrer_id
  FROM public.users
  WHERE referral_code = p_referrer_code;
  
  -- If no referrer found or user is trying to refer themselves, return false
  IF referrer_id IS NULL OR referrer_id = p_new_user_id THEN
    RETURN FALSE;
  END IF;
  
  -- Award 20 credits to the referrer
  PERFORM public.award_credits(
    referrer_id, 
    'referral', 
    20,
    'referred_' || p_new_user_id
  );
  
  -- Update the referred_by field on the new user
  UPDATE public.users
  SET referred_by = p_referrer_code
  WHERE id = p_new_user_id;
  
  RETURN TRUE;
END;
$function$;