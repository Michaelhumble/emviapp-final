-- CRITICAL SECURITY FIXES FOR EMVIAPP
-- 1. Drop all exposed auth.users views and replace with secure functions

-- Drop existing insecure views first
DROP VIEW IF EXISTS public.review_customers CASCADE;
DROP VIEW IF EXISTS public.profile_completion_status CASCADE;
DROP VIEW IF EXISTS public.profiles CASCADE;
DROP VIEW IF EXISTS public.salon_earnings_view CASCADE;
DROP VIEW IF EXISTS public.artist_earnings_summary CASCADE;

-- 2. Enable RLS on all tables missing it
ALTER TABLE public.profile_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.default_artist_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.translation_strings ENABLE ROW LEVEL SECURITY;

-- 3. Add strict RLS policies for unprotected tables
CREATE POLICY "Admin only access to profile requirements"
ON public.profile_requirements FOR ALL 
USING (public.is_admin());

CREATE POLICY "Public read access to default artist data"
ON public.default_artist_data FOR SELECT 
USING (true);

CREATE POLICY "Admin only write to default artist data"
ON public.default_artist_data FOR INSERT 
WITH CHECK (public.is_admin());

CREATE POLICY "Public read access to translations"
ON public.translation_strings FOR SELECT 
USING (true);

CREATE POLICY "Admin only write to translations"
ON public.translation_strings FOR INSERT 
WITH CHECK (public.is_admin());

-- 4. Create secure replacement functions for views
CREATE OR REPLACE FUNCTION public.get_current_user_profile()
RETURNS TABLE(
  id uuid,
  email text,
  full_name text,
  avatar_url text,
  role text,
  location text,
  phone text,
  bio text,
  specialty text,
  years_experience integer,
  credits integer,
  is_verified boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only return current user's profile
  RETURN QUERY
  SELECT 
    p.id,
    au.email,
    p.full_name,
    p.avatar_url,
    p.role,
    p.location,
    p.phone,
    p.bio,
    p.specialty,
    p.years_experience,
    p.credits,
    p.is_verified,
    p.created_at,
    p.updated_at
  FROM public.profiles p
  JOIN auth.users au ON au.id = p.id
  WHERE p.id = auth.uid();
END;
$$;

-- 5. Create secure user count function for admin dashboard
CREATE OR REPLACE FUNCTION public.get_user_count()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_count integer;
BEGIN
  -- Only allow admin access
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;
  
  SELECT COUNT(*) INTO user_count FROM public.profiles;
  RETURN user_count;
END;
$$;

-- 6. Create secure public profile view function (for artist listings)
CREATE OR REPLACE FUNCTION public.get_public_artist_profiles(
  p_limit integer DEFAULT 20,
  p_offset integer DEFAULT 0
)
RETURNS TABLE(
  id uuid,
  full_name text,
  avatar_url text,
  specialty text,
  location text,
  years_experience integer,
  is_verified boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- 7. Fix all functions to use proper search_path
-- Update existing functions to include SET search_path = public
CREATE OR REPLACE FUNCTION public.track_profile_view(
  p_viewer_id UUID,
  p_artist_id UUID,
  p_source_page TEXT,
  p_viewer_role TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_location TEXT;
  viewer_specialty TEXT;
  artist_location TEXT;
  artist_specialty TEXT;
  location_matched BOOLEAN := FALSE;
  specialty_matched BOOLEAN := FALSE;
BEGIN
  -- Get viewer and artist info
  SELECT location, specialty INTO viewer_location, viewer_specialty
  FROM profiles
  WHERE id = p_viewer_id;
  
  SELECT location, specialty INTO artist_location, artist_specialty
  FROM profiles
  WHERE id = p_artist_id;
  
  -- Check if location matches
  IF viewer_location IS NOT NULL AND artist_location IS NOT NULL THEN
    location_matched := (viewer_location = artist_location);
  END IF;
  
  -- Check if specialty matches
  IF viewer_specialty IS NOT NULL AND artist_specialty IS NOT NULL THEN
    specialty_matched := (viewer_specialty = artist_specialty);
  END IF;
  
  -- Insert view record with safety for unique constraint
  BEGIN
    INSERT INTO profile_views (
      viewer_id,
      artist_id,
      viewed_at,
      source_page,
      viewer_role,
      location_matched,
      specialty_matched
    ) VALUES (
      p_viewer_id,
      p_artist_id,
      NOW(),
      p_source_page,
      p_viewer_role,
      location_matched,
      specialty_matched
    );
    RETURN TRUE;
  EXCEPTION
    WHEN unique_violation THEN
      -- Already viewed today
      RETURN FALSE;
  END;
END;
$$;

-- 8. Create admin dashboard analytics function
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  stats JSON;
BEGIN
  -- Only allow admin access
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;
  
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
$$;