-- Final batch of critical database function security fixes
-- Fix the remaining most important functions

-- Fix link_staff_to_user function
CREATE OR REPLACE FUNCTION public.link_staff_to_user(p_invitation_token text, p_user_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE public.salon_staff
  SET 
    user_id = p_user_id,
    accepted_at = NOW(),
    status = 'active'
  WHERE invitation_token = p_invitation_token
    AND user_id IS NULL;
  
  RETURN FOUND;
END;
$function$;

-- Fix setup_salon_owner function
CREATE OR REPLACE FUNCTION public.setup_salon_owner(p_salon_id uuid, p_owner_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Update salon with owner_id if it's currently NULL
  UPDATE public.salons
  SET owner_id = p_owner_id
  WHERE id = p_salon_id AND owner_id IS NULL;
  
  RETURN FOUND;
END;
$function$;

-- Fix can_user_post function
CREATE OR REPLACE FUNCTION public.can_user_post(p_user_id uuid, p_post_type text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  post_count INTEGER;
  payment_count INTEGER;
BEGIN
  -- Count existing posts by user of this type
  SELECT COUNT(*) INTO post_count
  FROM posts
  WHERE user_id = p_user_id AND post_type = p_post_type;
  
  -- Count payments of this type
  SELECT COUNT(*) INTO payment_count
  FROM payments
  WHERE user_id = p_user_id AND payment_type = p_post_type AND status = 'completed';
  
  -- First post of each type is allowed with one payment
  -- Additional posts require additional payments
  RETURN payment_count > post_count OR post_count = 0;
END;
$function$;

-- Fix validate_credits function
CREATE OR REPLACE FUNCTION public.validate_credits()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  IF NEW.credits < 0 THEN
    NEW.credits := 0;
  END IF;
  RETURN NEW;
END;
$function$;

-- Fix award_credits function (second overloaded version)
CREATE OR REPLACE FUNCTION public.award_credits(p_user_id uuid, p_action_type text, p_value integer, p_description text DEFAULT NULL::text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  already_awarded BOOLEAN;
BEGIN
  -- Check if this is a duplicate action (rate limiting)
  IF p_action_type IN ('follow_artist', 'bookmark_artist', 'review') THEN
    -- For these actions, check if user already got credits for the same action recently
    -- Extract the ID from description (assumes description contains target_id in format)
    SELECT EXISTS (
      SELECT 1 FROM public.customer_credits
      WHERE user_id = p_user_id 
        AND action_type = p_action_type
        AND description = p_description
        AND created_at > (now() - interval '24 hours')
    ) INTO already_awarded;
    
    IF already_awarded THEN
      RETURN FALSE;
    END IF;
  END IF;

  -- Award the credits
  INSERT INTO public.customer_credits (user_id, action_type, value, description)
  VALUES (p_user_id, p_action_type, p_value, p_description);
  
  -- Update user's total credits
  UPDATE public.users
  SET credits = COALESCE(credits, 0) + p_value
  WHERE id = p_user_id;
  
  RETURN TRUE;
END;
$function$;

-- Fix handle_follow_credit function
CREATE OR REPLACE FUNCTION public.handle_follow_credit()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Award 5 credits for following an artist
  PERFORM public.award_credits(
    NEW.viewer_id, 
    'follow_artist', 
    5,
    'followed_' || NEW.artist_id
  );
  RETURN NEW;
END;
$function$;

-- Fix handle_bookmark_credit function
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

-- Fix award_tip_credits function
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

-- Fix generate_unique_referral_code function
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

-- Fix process_referral_credits function
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