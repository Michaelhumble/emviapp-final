-- Security Fix Phase 1E: FINAL batch - fix last 8 functions with mutable search_path
-- This completes Phase 1 by setting search_path in header for all remaining functions

-- 1. calculate_profile_completion
CREATE OR REPLACE FUNCTION public.calculate_profile_completion(user_profile jsonb, user_role text)
 RETURNS integer
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
DECLARE
  req_fields text[];
  opt_fields text[];
  total_fields integer;
  filled_fields integer := 0;
  field_value text;
  field_name text;
BEGIN
  SELECT 
    pr.required_fields,
    pr.optional_fields
  INTO 
    req_fields,
    opt_fields
  FROM profile_requirements pr
  WHERE pr.role = user_role;

  total_fields := array_length(req_fields, 1) + array_length(opt_fields, 1);

  FOR i IN 1..array_length(req_fields, 1) LOOP
    field_name := req_fields[i];
    field_value := user_profile->>field_name;
    IF field_value IS NOT NULL AND field_value != '' THEN
      filled_fields := filled_fields + 1;
    END IF;
  END LOOP;

  FOR i IN 1..array_length(opt_fields, 1) LOOP
    field_name := opt_fields[i];
    field_value := user_profile->>field_name;
    IF field_value IS NOT NULL AND field_value != '' THEN
      filled_fields := filled_fields + 1;
    END IF;
  END LOOP;

  RETURN ROUND((filled_fields::float / total_fields::float) * 100);
END;
$function$;

-- 2. calculate_salon_completion
CREATE OR REPLACE FUNCTION public.calculate_salon_completion(p_salon jsonb)
 RETURNS integer
 LANGUAGE plpgsql
 IMMUTABLE
 SET search_path = public
AS $function$
DECLARE
  total_fields integer := 6;
  completed_fields integer := 0;
BEGIN
  IF p_salon->>'salon_name' IS NOT NULL AND length(p_salon->>'salon_name') >= 2 THEN
    completed_fields := completed_fields + 1;
  END IF;
  
  IF p_salon->>'address' IS NOT NULL AND length(p_salon->>'address') > 0 THEN
    completed_fields := completed_fields + 1;
  END IF;
  
  IF p_salon->>'phone' IS NOT NULL AND length(p_salon->>'phone') > 0 THEN
    completed_fields := completed_fields + 1;
  END IF;
  
  IF p_salon->>'about' IS NOT NULL AND length(p_salon->>'about') >= 10 THEN
    completed_fields := completed_fields + 1;
  END IF;
  
  IF p_salon->>'logo_url' IS NOT NULL AND length(p_salon->>'logo_url') > 0 THEN
    completed_fields := completed_fields + 1;
  END IF;
  
  IF p_salon->'services' IS NOT NULL AND jsonb_array_length(p_salon->'services') > 0 THEN
    completed_fields := completed_fields + 1;
  END IF;
  
  RETURN (completed_fields * 100 / total_fields)::integer;
END;
$function$;

-- 3. create_diamond_tier_waitlist_if_not_exists
CREATE OR REPLACE FUNCTION public.create_diamond_tier_waitlist_if_not_exists()
 RETURNS void
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'diamond_tier_waitlist'
  ) THEN
    CREATE TABLE public.diamond_tier_waitlist (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      post_type TEXT NOT NULL,
      requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      additional_info JSONB DEFAULT '{}'::jsonb,
      status TEXT NOT NULL DEFAULT 'pending',
      notes TEXT,
      processed_at TIMESTAMPTZ,
      processed_by UUID
    );

    ALTER TABLE public.diamond_tier_waitlist ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Users can view their own waitlist entries"
      ON public.diamond_tier_waitlist
      FOR SELECT
      USING (auth.uid() = user_id);

    CREATE POLICY "Users can insert their own waitlist entries"
      ON public.diamond_tier_waitlist
      FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
END;
$function$;

-- 4. decrement_post_likes
CREATE OR REPLACE FUNCTION public.decrement_post_likes(post_id uuid)
 RETURNS void
 LANGUAGE sql
 SET search_path = public
AS $function$
  UPDATE public.community_posts 
  SET likes_count = GREATEST(likes_count - 1, 0)
  WHERE id = post_id;
$function$;

-- 5. get_artist_rating
CREATE OR REPLACE FUNCTION public.get_artist_rating(artist_id uuid)
 RETURNS TABLE(average_rating numeric, review_count bigint)
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(ROUND(AVG(rating)::numeric, 1), 0) as average_rating,
    COUNT(*) as review_count
  FROM 
    public.reviews
  WHERE 
    reviews.artist_id = get_artist_rating.artist_id
    AND status = 'active';
END;
$function$;

-- 6. increment_post_likes
CREATE OR REPLACE FUNCTION public.increment_post_likes(post_id uuid)
 RETURNS void
 LANGUAGE sql
 SET search_path = public
AS $function$
  UPDATE public.community_posts 
  SET likes_count = likes_count + 1
  WHERE id = post_id;
$function$;

-- 7. update_artist_for_hire_updated_at
CREATE OR REPLACE FUNCTION public.update_artist_for_hire_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- 8. update_seo_cities_updated_at
CREATE OR REPLACE FUNCTION public.update_seo_cities_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;