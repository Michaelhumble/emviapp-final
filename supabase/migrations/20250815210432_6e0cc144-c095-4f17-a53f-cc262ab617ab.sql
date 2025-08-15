-- SECURITY FIX: Continue fixing remaining database functions with search_path protection
-- Batch 2 of critical database function security fixes

CREATE OR REPLACE FUNCTION public.get_user_referral_stats(user_id uuid)
 RETURNS TABLE(referral_count bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT COUNT(*)::BIGINT AS referral_count
  FROM public.referrals
  WHERE referrer_id = user_id;
END;
$function$;

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

CREATE OR REPLACE FUNCTION public.get_public_artist_profiles(p_limit integer DEFAULT 20, p_offset integer DEFAULT 0)
 RETURNS TABLE(id uuid, full_name text, avatar_url text, specialty text, location text, years_experience integer, is_verified boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.full_name,
    p.avatar_url,
    p.specialty,
    p.location,
    p.years_experience,
    p.is_verified
  FROM public.profiles p
  WHERE p.role IN ('artist', 'nail technician/artist')
    AND p.full_name IS NOT NULL
  ORDER BY p.created_at DESC
  LIMIT p_limit OFFSET p_offset;
END;
$function$;

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