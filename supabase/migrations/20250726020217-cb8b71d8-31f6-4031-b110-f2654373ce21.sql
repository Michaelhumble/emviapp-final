-- Continue fixing remaining database functions with security path
-- Part 2: Fix more critical functions

-- Fix update_profile_stats function
CREATE OR REPLACE FUNCTION public.update_profile_stats()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Update profiles table when community_posts are created/updated
  IF TG_TABLE_NAME = 'community_posts' AND TG_OP = 'INSERT' THEN
    UPDATE public.profiles 
    SET 
      total_posts = total_posts + 1,
      community_points = community_points + 5 -- 5 points per post
    WHERE id = NEW.user_id;
    
    -- Create activity entry
    INSERT INTO public.user_activity (user_id, activity_type, activity_data)
    VALUES (NEW.user_id, 'post_created', jsonb_build_object(
      'post_id', NEW.id,
      'content_preview', left(NEW.content, 100)
    ));
    
  ELSIF TG_TABLE_NAME = 'community_post_likes' AND TG_OP = 'INSERT' THEN
    -- Update the post owner's like count
    UPDATE public.profiles 
    SET 
      total_likes_received = total_likes_received + 1,
      community_points = community_points + 2 -- 2 points per like received
    WHERE id = (SELECT user_id FROM public.community_posts WHERE id = NEW.post_id);
    
  ELSIF TG_TABLE_NAME = 'shares_tracking' AND TG_OP = 'INSERT' THEN
    UPDATE public.profiles 
    SET 
      total_shares = total_shares + 1,
      community_points = community_points + NEW.points_awarded
    WHERE id = NEW.user_id;
    
    -- Create activity entry
    INSERT INTO public.user_activity (user_id, activity_type, activity_data)
    VALUES (NEW.user_id, 'content_shared', jsonb_build_object(
      'platform', NEW.platform,
      'content_type', NEW.shared_content_type,
      'points_earned', NEW.points_awarded
    ));
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- Fix get_post_status_for_user function
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

-- Fix get_artist_earnings_for_user function
CREATE OR REPLACE FUNCTION public.get_artist_earnings_for_user(p_artist_id uuid)
 RETURNS TABLE(week_start timestamp with time zone, booking_count bigint, total_revenue numeric, total_earnings numeric, salon_id uuid, paid boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Only return data for the authenticated user or salon owner
  IF auth.uid() != p_artist_id AND NOT EXISTS (
    SELECT 1 FROM salon_staff ss 
    JOIN salons s ON s.id = ss.salon_id 
    WHERE ss.user_id = p_artist_id AND s.owner_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied. Can only view own earnings or your salon artists.';
  END IF;
  
  RETURN QUERY
  SELECT 
    date_trunc('week', cb.completed_at) as week_start,
    COUNT(*)::bigint as booking_count,
    SUM(cb.service_price) as total_revenue,
    SUM(cb.commission_earned) as total_earnings,
    cb.salon_id,
    cb.paid
  FROM completed_bookings cb
  WHERE cb.artist_id = p_artist_id
  GROUP BY date_trunc('week', cb.completed_at), cb.salon_id, cb.paid
  ORDER BY week_start DESC;
END;
$function$;

-- Fix search_salon_sales_optimized function
CREATE OR REPLACE FUNCTION public.search_salon_sales_optimized(search_text text DEFAULT ''::text, location_filter text DEFAULT ''::text, price_min numeric DEFAULT 0, price_max numeric DEFAULT 10000000, business_type_filter text DEFAULT ''::text, page_limit integer DEFAULT 20, page_offset integer DEFAULT 0)
 RETURNS TABLE(id uuid, salon_name text, city text, state text, asking_price numeric, business_type text, description_combined text, images text[], is_featured boolean, is_urgent boolean, created_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.salon_name,
    s.city,
    s.state,
    s.asking_price,
    s.business_type,
    s.description_combined,
    s.images,
    s.is_featured,
    s.is_urgent,
    s.created_at
  FROM salon_sales s
  WHERE 
    s.status = 'active'
    AND (
      search_text = '' OR 
      s.salon_name ILIKE '%' || search_text || '%' OR 
      s.description_combined ILIKE '%' || search_text || '%' OR
      s.city ILIKE '%' || search_text || '%' OR
      s.state ILIKE '%' || search_text || '%'
    )
    AND (location_filter = '' OR s.city ILIKE '%' || location_filter || '%' OR s.state ILIKE '%' || location_filter || '%')
    AND s.asking_price BETWEEN price_min AND price_max
    AND (business_type_filter = '' OR s.business_type = business_type_filter)
  ORDER BY 
    s.is_featured DESC,
    s.is_urgent DESC,
    s.created_at DESC
  LIMIT page_limit
  OFFSET page_offset;
END;
$function$;

-- Fix get_user_credits function
CREATE OR REPLACE FUNCTION public.get_user_credits(p_user_id uuid)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  total_credits INTEGER;
BEGIN
  SELECT COALESCE(SUM(credits_amount), 0) INTO total_credits
  FROM public.credits_ledger
  WHERE user_id = p_user_id;
  
  RETURN total_credits;
END;
$function$;

-- Fix award_credits function (first version)
CREATE OR REPLACE FUNCTION public.award_credits(p_user_id uuid, p_credits integer, p_reason text, p_metadata jsonb DEFAULT '{}'::jsonb, p_ip_address text DEFAULT NULL::text, p_user_agent text DEFAULT NULL::text, p_referral_code text DEFAULT NULL::text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Insert credit transaction
  INSERT INTO public.credits_ledger (
    user_id, action_type, credits_amount, reason, metadata,
    ip_address, user_agent, referral_code
  ) VALUES (
    p_user_id, 'earn', p_credits, p_reason, p_metadata,
    p_ip_address, p_user_agent, p_referral_code
  );
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$function$;

-- Fix spend_credits function
CREATE OR REPLACE FUNCTION public.spend_credits(p_user_id uuid, p_credits integer, p_reason text, p_metadata jsonb DEFAULT '{}'::jsonb)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  current_credits INTEGER;
BEGIN
  -- Check if user has enough credits
  SELECT public.get_user_credits(p_user_id) INTO current_credits;
  
  IF current_credits < p_credits THEN
    RETURN FALSE;
  END IF;
  
  -- Insert spend transaction
  INSERT INTO public.credits_ledger (
    user_id, action_type, credits_amount, reason, metadata
  ) VALUES (
    p_user_id, 'spend', -p_credits, p_reason, p_metadata
  );
  
  RETURN TRUE;
END;
$function$;

-- Fix unlock_level function
CREATE OR REPLACE FUNCTION public.unlock_level(p_user_id uuid, p_level integer, p_credits_required integer, p_ip_address text DEFAULT NULL::text, p_user_agent text DEFAULT NULL::text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  current_credits INTEGER;
  unlock_key TEXT;
BEGIN
  unlock_key := 'level_' || p_level;
  
  -- Check if already unlocked
  IF EXISTS (
    SELECT 1 FROM public.user_unlocks 
    WHERE user_id = p_user_id AND unlock_type = 'level' AND unlock_value = unlock_key
  ) THEN
    RETURN FALSE;
  END IF;
  
  -- Check credits
  SELECT public.get_user_credits(p_user_id) INTO current_credits;
  IF current_credits < p_credits_required THEN
    RETURN FALSE;
  END IF;
  
  -- Spend credits
  IF NOT public.spend_credits(p_user_id, p_credits_required, 'level_unlock', 
    jsonb_build_object('level', p_level)) THEN
    RETURN FALSE;
  END IF;
  
  -- Insert unlock
  INSERT INTO public.user_unlocks (
    user_id, unlock_type, unlock_value, credits_required,
    ip_address, user_agent, metadata
  ) VALUES (
    p_user_id, 'level', unlock_key, p_credits_required,
    p_ip_address, p_user_agent, jsonb_build_object('level', p_level)
  );
  
  RETURN TRUE;
END;
$function$;

-- Fix check_api_rate_limit function
CREATE OR REPLACE FUNCTION public.check_api_rate_limit(p_identifier text, p_endpoint text, p_max_requests integer DEFAULT 100, p_window_minutes integer DEFAULT 60)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  current_count integer;
  window_start_time timestamp with time zone;
  is_blocked boolean;
BEGIN
  window_start_time := now() - (p_window_minutes || ' minutes')::interval;
  
  -- Check if currently blocked
  SELECT EXISTS(
    SELECT 1 FROM api_rate_limits 
    WHERE identifier = p_identifier 
    AND blocked_until > now()
  ) INTO is_blocked;
  
  IF is_blocked THEN
    RETURN false;
  END IF;
  
  -- Count requests in current window
  SELECT COALESCE(SUM(request_count), 0)
  INTO current_count
  FROM api_rate_limits
  WHERE identifier = p_identifier
    AND endpoint = p_endpoint
    AND window_start > window_start_time;
  
  -- If under limit, record this request
  IF current_count < p_max_requests THEN
    INSERT INTO api_rate_limits (identifier, endpoint, request_count, window_start)
    VALUES (p_identifier, p_endpoint, 1, now())
    ON CONFLICT DO NOTHING;
    
    RETURN true;
  ELSE
    -- Block for next hour
    INSERT INTO api_rate_limits (identifier, endpoint, request_count, window_start, blocked_until)
    VALUES (p_identifier, p_endpoint, 1, now(), now() + interval '1 hour')
    ON CONFLICT DO NOTHING;
    
    RETURN false;
  END IF;
END;
$function$;