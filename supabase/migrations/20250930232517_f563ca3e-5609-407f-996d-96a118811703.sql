-- Security Fix: Move search_path from function body to header
-- Phase 1 Complete - Fix all remaining SECURITY DEFINER functions
-- Prevents search_path hijacking by setting immutable search_path in function declaration

-- 1. is_top_performer
CREATE OR REPLACE FUNCTION public.is_top_performer(p_artist_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM bookings 
    WHERE recipient_id = p_artist_id 
    AND status = 'completed'
    AND created_at > NOW() - INTERVAL '30 days'
    GROUP BY recipient_id
    HAVING COUNT(*) > 15
  );
END;
$function$;

-- 2. has_great_feedback
CREATE OR REPLACE FUNCTION public.has_great_feedback(p_artist_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM reviews 
    WHERE artist_id = p_artist_id 
    AND rating > 4
    GROUP BY artist_id
    HAVING COUNT(*) >= 3
  );
END;
$function$;

-- 3. check_booking_availability
CREATE OR REPLACE FUNCTION public.check_booking_availability()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  is_available BOOLEAN;
  conflicting_booking BOOLEAN;
BEGIN
  -- Check if artist is available at this time
  SELECT EXISTS (
    SELECT 1 
    FROM artist_availability 
    WHERE artist_id = NEW.recipient_id
    AND day_of_week = TRIM(TO_CHAR(NEW.date_requested::date, 'Day'))
    AND start_time <= NEW.time_requested::time
    AND end_time >= NEW.time_requested::time
  ) INTO is_available;

  -- Check for conflicting bookings
  SELECT EXISTS (
    SELECT 1 
    FROM bookings 
    WHERE recipient_id = NEW.recipient_id
    AND date_requested = NEW.date_requested
    AND time_requested = NEW.time_requested
    AND status NOT IN ('cancelled', 'declined')
  ) INTO conflicting_booking;

  IF NOT is_available THEN
    RAISE EXCEPTION 'Artist is not available at this time';
  END IF;

  IF conflicting_booking THEN
    RAISE EXCEPTION 'Time slot is already booked';
  END IF;

  RETURN NEW;
END;
$function$;

-- 4. get_next_referral_milestone
CREATE OR REPLACE FUNCTION public.get_next_referral_milestone(current_count integer)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  milestones integer[] := ARRAY[3, 5, 10, 25, 50, 100];
BEGIN
  FOR i IN 1..array_length(milestones, 1) LOOP
    IF milestones[i] > current_count THEN
      RETURN milestones[i];
    END IF;
  END LOOP;
  RETURN NULL;
END;
$function$;

-- 5. accept_team_invite
CREATE OR REPLACE FUNCTION public.accept_team_invite(p_invite_code text, p_user_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  v_invite RECORD;
  v_user RECORD;
BEGIN
  SELECT * FROM team_invites 
  WHERE invite_code = p_invite_code
  AND status = 'pending'
  AND accepted_by_user_id IS NULL
  AND expires_at > NOW()
  INTO v_invite;

  SELECT phone FROM users WHERE id = p_user_id INTO v_user;

  IF v_invite IS NULL OR v_user.phone != v_invite.phone_number THEN
    RETURN false;
  END IF;

  UPDATE team_invites SET
    accepted_by_user_id = p_user_id,
    accepted_at = NOW(),
    status = 'accepted'
  WHERE invite_code = p_invite_code;

  INSERT INTO salon_staff (
    salon_id,
    email,
    phone,
    role,
    status,
    user_id
  ) VALUES (
    v_invite.salon_id,
    v_user.email,
    v_user.phone,
    v_invite.role,
    'active',
    p_user_id
  )
  ON CONFLICT (salon_id, email) 
  DO UPDATE SET
    status = 'active',
    user_id = p_user_id,
    updated_at = NOW();

  RETURN true;
END;
$function$;

-- 6. send_team_invite
CREATE OR REPLACE FUNCTION public.send_team_invite(p_salon_id uuid, p_email text, p_role text, p_full_name text)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  v_invite_id UUID;
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM salons 
    WHERE id = p_salon_id AND owner_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Not authorized to send invites for this salon';
  END IF;

  INSERT INTO salon_staff (
    salon_id,
    email,
    role,
    status,
    full_name,
    invitation_sent_at,
    invitation_email
  ) VALUES (
    p_salon_id,
    p_email,
    p_role,
    'pending',
    p_full_name,
    NOW(),
    p_email
  ) RETURNING id INTO v_invite_id;

  RETURN v_invite_id;
END;
$function$;

-- 7. redeem_credits
CREATE OR REPLACE FUNCTION public.redeem_credits(p_user_id uuid, p_amount integer, p_redemption_type text, p_target_id uuid DEFAULT NULL::uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  user_credits INTEGER;
BEGIN
  SELECT credits INTO user_credits
  FROM users
  WHERE id = p_user_id;
  
  IF user_credits < p_amount THEN
    RETURN FALSE;
  END IF;
  
  UPDATE users
  SET credits = credits - p_amount
  WHERE id = p_user_id;
  
  INSERT INTO customer_credits (
    user_id, 
    action_type, 
    value, 
    description
  )
  VALUES (
    p_user_id, 
    'redemption_' || p_redemption_type, 
    -p_amount, 
    CASE 
      WHEN p_target_id IS NOT NULL THEN 'target_' || p_target_id
      ELSE p_redemption_type
    END
  );
  
  RETURN TRUE;
END;
$function$;

-- 8. submit_review_with_credits
CREATE OR REPLACE FUNCTION public.submit_review_with_credits(p_user_id uuid, p_artist_id uuid, p_booking_id uuid, p_rating integer, p_review_text text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  IF EXISTS (
    SELECT 1 FROM customer_credits
    WHERE user_id = p_user_id 
      AND action_type = 'review'
      AND description = 'review_' || p_booking_id
  ) THEN
    RETURN FALSE;
  END IF;
  
  PERFORM award_credits(
    p_user_id, 
    'review', 
    10,
    'review_' || p_booking_id
  );
  
  RETURN TRUE;
END;
$function$;

-- 9. validate_referral_request
CREATE OR REPLACE FUNCTION public.validate_referral_request()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  referrer_id UUID;
  device_fingerprint TEXT;
  similar_accounts INT;
BEGIN
  SELECT NEW.referrer_id INTO referrer_id;
  
  device_fingerprint := NEW.metadata->>'device_fingerprint';
  
  IF device_fingerprint IS NOT NULL THEN
    SELECT COUNT(*) INTO similar_accounts
    FROM referrals
    WHERE metadata->>'device_fingerprint' = device_fingerprint
    AND created_at > (NOW() - INTERVAL '30 days');
    
    IF similar_accounts > 3 THEN
      NEW.status := 'suspicious';
    END IF;
  END IF;
  
  IF NEW.referrer_id = NEW.referred_id THEN
    RETURN NULL;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- 10. handle_booking_completion
CREATE OR REPLACE FUNCTION public.handle_booking_completion()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
    v_service_price NUMERIC;
    v_commission_rate NUMERIC;
    v_artist_id UUID;
    v_salon_id UUID;
    v_service_id UUID;
BEGIN
    IF (OLD.status <> 'completed' AND NEW.status = 'completed') THEN
        v_artist_id := NEW.recipient_id;
        v_service_id := NEW.service_id;
        
        SELECT price INTO v_service_price 
        FROM services 
        WHERE id = v_service_id;
        
        IF v_service_price IS NULL THEN
            RETURN NEW;
        END IF;
        
        SELECT ss.salon_id, ss.commission_rate INTO v_salon_id, v_commission_rate
        FROM salon_staff ss
        WHERE ss.email = (SELECT email FROM users WHERE id = v_artist_id);
        
        IF v_commission_rate IS NULL THEN
            v_commission_rate := 60;
        END IF;
        
        IF v_service_price IS NOT NULL AND v_commission_rate IS NOT NULL AND v_salon_id IS NOT NULL THEN
            INSERT INTO completed_bookings (
                booking_id,
                artist_id,
                service_id,
                service_price,
                commission_rate,
                commission_earned,
                salon_id
            ) VALUES (
                NEW.id,
                v_artist_id,
                v_service_id,
                v_service_price,
                v_commission_rate,
                (v_service_price * v_commission_rate / 100),
                v_salon_id
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$function$;

-- 11. is_artist_available
CREATE OR REPLACE FUNCTION public.is_artist_available(p_artist_id uuid, p_date date, p_start_time time without time zone, p_end_time time without time zone)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  day_name TEXT;
  has_availability BOOLEAN;
  is_time_off BOOLEAN;
BEGIN
  day_name := to_char(p_date, 'Day');
  day_name := rtrim(day_name);
  
  SELECT EXISTS (
    SELECT 1 FROM artist_availability
    WHERE artist_id = p_artist_id
      AND day_of_week = day_name
      AND is_available = true
      AND start_time <= p_start_time
      AND end_time >= p_end_time
  ) INTO has_availability;
  
  SELECT EXISTS (
    SELECT 1 FROM artist_time_off
    WHERE artist_id = p_artist_id
      AND p_date BETWEEN start_date AND end_date
  ) INTO is_time_off;
  
  RETURN has_availability AND NOT is_time_off;
END;
$function$;

-- 12. process_referral_milestone
CREATE OR REPLACE FUNCTION public.process_referral_milestone()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  referrer_role TEXT;
  reward_amount INTEGER := 0;
BEGIN
  SELECT role INTO referrer_role
  FROM users
  WHERE id = NEW.referrer_id;
  
  IF NEW.milestone_type = 'booking_completed' THEN
    reward_amount := 50;
  ELSIF NEW.milestone_type = 'earnings_threshold' THEN
    reward_amount := 75;
  ELSIF NEW.milestone_type = 'subscription' THEN
    reward_amount := 100;
  END IF;
  
  IF NEW.milestone_reached = TRUE AND OLD.milestone_reached = FALSE THEN
    INSERT INTO credit_earnings
      (user_id, amount, type, source_id, status)
    VALUES
      (NEW.referrer_id, reward_amount, 'referral_milestone', NEW.id, 'approved');
      
    UPDATE users
    SET credits = COALESCE(credits, 0) + reward_amount
    WHERE id = NEW.referrer_id;
    
    NEW.status := 'completed';
    NEW.verified_at := NOW();
  END IF;
  
  RETURN NEW;
END;
$function$;

-- 13. award_team_badge
CREATE OR REPLACE FUNCTION public.award_team_badge(p_member_id uuid, p_badge_type text, p_metadata jsonb DEFAULT '{}'::jsonb)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM team_member_badges 
    WHERE member_id = p_member_id AND badge_type = p_badge_type
  ) THEN
    INSERT INTO team_member_badges (member_id, badge_type, metadata)
    VALUES (p_member_id, p_badge_type, p_metadata);
    RETURN true;
  END IF;
  RETURN false;
END;
$function$;

-- 14. process_team_referral
CREATE OR REPLACE FUNCTION public.process_team_referral(p_referrer_id uuid, p_referred_id uuid, p_is_artist boolean)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  v_salon_id UUID;
  v_owner_id UUID;
BEGIN
  SELECT ss.salon_id, s.owner_id 
  INTO v_salon_id, v_owner_id
  FROM salon_staff ss
  JOIN salons s ON s.id = ss.salon_id
  WHERE ss.id = p_referrer_id;
  
  UPDATE users 
  SET credits = credits + 10
  WHERE id = p_referrer_id;
  
  IF p_is_artist THEN
    UPDATE users 
    SET credits = credits + 25
    WHERE id = v_owner_id;
    
    INSERT INTO notifications (
      user_id,
      type,
      message,
      metadata
    ) VALUES (
      v_owner_id,
      'team_referral_bonus',
      'Your team grew EmviApp — you earned 25 credits!',
      jsonb_build_object(
        'referrer_id', p_referrer_id,
        'referred_id', p_referred_id,
        'credits_earned', 25
      )
    );
  END IF;
  
  RETURN TRUE;
END;
$function$;