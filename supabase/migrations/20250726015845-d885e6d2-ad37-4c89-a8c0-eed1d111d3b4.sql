-- Security Fix: Add SET search_path = 'public' to all database functions
-- This prevents potential privilege escalation attacks

-- Fix get_user_count function
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

-- Fix array_append_unique function
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

-- Fix update_challenge_participant_count function
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

-- Fix is_post_expired function
CREATE OR REPLACE FUNCTION public.is_post_expired(expires_at timestamp with time zone)
 RETURNS boolean
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  RETURN expires_at < NOW();
END;
$function$;

-- Fix update_entry_votes_count function
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

-- Fix get_user_referral_stats function
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

-- Fix get_public_artist_profiles function
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

-- Fix get_admin_dashboard_stats function  
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats()
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  stats JSON;
BEGIN
  SELECT json_build_object(
    'total_users', (SELECT COUNT(*) FROM profiles),
    'total_artists', (SELECT COUNT(*) FROM profiles WHERE role IN ('artist', 'nail technician/artist')),
    'total_customers', (SELECT COUNT(*) FROM profiles WHERE role = 'customer'),
    'total_salons', (SELECT COUNT(*) FROM profiles WHERE role = 'salon_owner'),
    'total_bookings', (SELECT COUNT(*) FROM bookings),
    'active_jobs', (SELECT COUNT(*) FROM jobs WHERE status = 'active'),
    'users_today', (SELECT COUNT(*) FROM profiles WHERE DATE(created_at) = CURRENT_DATE),
    'users_this_week', (SELECT COUNT(*) FROM profiles WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'),
    'users_this_month', (SELECT COUNT(*) FROM profiles WHERE created_at >= CURRENT_DATE - INTERVAL '30 days')
  ) INTO stats;
  
  RETURN stats;
END;
$function$;

-- Fix populate_artist_demo_data function
CREATE OR REPLACE FUNCTION public.populate_artist_demo_data()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  -- Only proceed for new artist accounts
  IF NEW.role = 'artist' OR NEW.role = 'nail technician/artist' THEN
    -- Insert demo portfolio items
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

-- Fix is_user_invited function
CREATE OR REPLACE FUNCTION public.is_user_invited(user_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = user_id
    AND invited = true
  );
END;
$function$;