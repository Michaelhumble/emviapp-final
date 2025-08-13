-- Fix Function Search Path Mutable warnings by adding SET search_path = 'public' to all functions
-- This prevents potential security vulnerabilities from search path manipulation

-- Update existing functions that are missing proper search path settings

-- First, let's recreate the functions that handle sensitive data with proper security
CREATE OR REPLACE FUNCTION public.get_customer_booking_info(booking_id uuid)
 RETURNS TABLE(customer_name text, customer_email text, customer_phone text, customer_avatar text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $$
BEGIN
  -- Verify the requesting user is the recipient of this booking
  IF NOT EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE id = booking_id AND recipient_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to booking information';
  END IF;
  
  RETURN QUERY
  SELECT 
    COALESCE(b.client_name, p.full_name, au.email) as customer_name,
    au.email as customer_email,
    p.phone as customer_phone,
    p.avatar_url as customer_avatar
  FROM public.bookings b
  LEFT JOIN auth.users au ON au.id = b.sender_id
  LEFT JOIN public.profiles p ON p.id = b.sender_id
  WHERE b.id = booking_id;
END;
$$;

-- Update get_customer_info to be more secure
CREATE OR REPLACE FUNCTION public.get_customer_info(customer_id uuid)
 RETURNS TABLE(id uuid, full_name text, email text, avatar_url text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $$
BEGIN
  -- Only allow access to customer info if the requesting user has a business relationship
  IF NOT EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE (sender_id = customer_id AND recipient_id = auth.uid())
       OR (recipient_id = customer_id AND sender_id = auth.uid())
  ) THEN
    RAISE EXCEPTION 'Access denied to customer information';
  END IF;
  
  RETURN QUERY
  SELECT 
    au.id,
    COALESCE(p.full_name, split_part(au.email, '@', 1)) as full_name,
    au.email,
    p.avatar_url
  FROM auth.users au
  LEFT JOIN public.profiles p ON p.id = au.id
  WHERE au.id = customer_id;
END;
$$;

-- Update search functions to not expose sensitive contact info to unauthorized users
CREATE OR REPLACE FUNCTION public.search_salon_sales_optimized(
  search_text text DEFAULT ''::text, 
  location_filter text DEFAULT ''::text, 
  price_min numeric DEFAULT 0, 
  price_max numeric DEFAULT 10000000, 
  business_type_filter text DEFAULT ''::text, 
  page_limit integer DEFAULT 20, 
  page_offset integer DEFAULT 0
)
 RETURNS TABLE(
   id uuid, 
   salon_name text, 
   city text, 
   state text, 
   asking_price numeric, 
   business_type text, 
   description_combined text, 
   images text[], 
   is_featured boolean, 
   is_urgent boolean, 
   created_at timestamp with time zone
 )
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.salon_name,
    s.city,
    s.state,
    s.asking_price,
    s.business_type,
    -- Only show full description to authenticated users
    CASE 
      WHEN auth.uid() IS NOT NULL THEN s.description_combined
      ELSE left(s.description_combined, 200) || '...'
    END as description_combined,
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
$$;

-- Update functions that don't have SET search_path
CREATE OR REPLACE FUNCTION public.auto_tag_job_industry()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $$
BEGIN
  -- Auto-tag industry if not provided or is generic
  IF NEW.category IS NULL OR NEW.category = '' OR NEW.category = 'Other' OR NEW.category = 'General' THEN
    -- Analyze title and description for industry keywords
    IF NEW.title ILIKE ANY(ARRAY['%nail%', '%manicure%', '%pedicure%']) OR 
       NEW.description ILIKE ANY(ARRAY['%nail%', '%manicure%', '%pedicure%']) THEN
      NEW.category = 'nails';
    ELSIF NEW.title ILIKE ANY(ARRAY['%hair%', '%stylist%', '%colorist%']) OR 
          NEW.description ILIKE ANY(ARRAY['%hair%', '%stylist%', '%colorist%']) THEN
      NEW.category = 'hair';
    ELSIF NEW.title ILIKE ANY(ARRAY['%barber%', '%fade%', '%beard%']) OR 
          NEW.description ILIKE ANY(ARRAY['%barber%', '%fade%', '%beard%']) THEN
      NEW.category = 'barber';
    ELSIF NEW.title ILIKE ANY(ARRAY['%massage%', '%therapist%']) OR 
          NEW.description ILIKE ANY(ARRAY['%massage%', '%therapist%']) THEN
      NEW.category = 'massage';
    ELSIF NEW.title ILIKE ANY(ARRAY['%esthetic%', '%facial%', '%skincare%']) OR 
          NEW.description ILIKE ANY(ARRAY['%esthetic%', '%facial%', '%skincare%']) THEN
      NEW.category = 'skincare';
    ELSIF NEW.title ILIKE ANY(ARRAY['%makeup%', '%mua%']) OR 
          NEW.description ILIKE ANY(ARRAY['%makeup%', '%mua%']) THEN
      NEW.category = 'makeup';
    ELSIF NEW.title ILIKE ANY(ARRAY['%lash%', '%brow%', '%eyebrow%']) OR 
          NEW.description ILIKE ANY(ARRAY['%lash%', '%brow%', '%eyebrow%']) THEN
      NEW.category = 'brows-lashes';
    ELSIF NEW.title ILIKE ANY(ARRAY['%tattoo%', '%ink%']) OR 
          NEW.description ILIKE ANY(ARRAY['%tattoo%', '%ink%']) THEN
      NEW.category = 'tattoo';
    ELSE
      NEW.category = 'Other Beauty';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Update other trigger functions with proper search path
CREATE OR REPLACE FUNCTION public.activate_free_jobs()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $$
BEGIN
  -- Auto-activate jobs for certain free tiers or demo purposes
  IF NEW.status = 'draft' AND NEW.pricing_tier IN ('free', 'basic') THEN
    NEW.status := 'active';
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_credits()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $$
BEGIN
  IF NEW.credits < 0 THEN
    NEW.credits := 0;
  END IF;
  RETURN NEW;
END;
$$;