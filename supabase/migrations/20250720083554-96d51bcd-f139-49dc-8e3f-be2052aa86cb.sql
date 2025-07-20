-- Production Scale-Up Database Optimizations (Immediate indexes)
-- Add indexes for high-performance search and filtering

-- Salon listings search indexes
CREATE INDEX IF NOT EXISTS idx_salon_sales_search 
ON salon_sales USING GIN (to_tsvector('english', salon_name || ' ' || COALESCE(description_combined, '') || ' ' || COALESCE(city, '') || ' ' || COALESCE(state, '')));

CREATE INDEX IF NOT EXISTS idx_salon_sales_location 
ON salon_sales (city, state);

CREATE INDEX IF NOT EXISTS idx_salon_sales_price_range 
ON salon_sales (asking_price);

CREATE INDEX IF NOT EXISTS idx_salon_sales_business_type 
ON salon_sales (business_type);

CREATE INDEX IF NOT EXISTS idx_salon_sales_status_created 
ON salon_sales (status, created_at DESC);

-- Services search indexes
CREATE INDEX IF NOT EXISTS idx_services_search 
ON services USING GIN (to_tsvector('english', title || ' ' || COALESCE(description, '')));

CREATE INDEX IF NOT EXISTS idx_services_category 
ON services (category);

CREATE INDEX IF NOT EXISTS idx_services_user_active 
ON services (user_id, is_active, created_at DESC);

-- Bookings performance indexes
CREATE INDEX IF NOT EXISTS idx_bookings_recipient_status 
ON bookings (recipient_id, status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_bookings_sender_status 
ON bookings (sender_id, status, created_at DESC);

-- User profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role_location 
ON profiles (role, location);

-- Create production-ready search function
CREATE OR REPLACE FUNCTION public.search_salons_optimized(
  search_query text DEFAULT '',
  location_filter text DEFAULT '',
  price_min numeric DEFAULT 0,
  price_max numeric DEFAULT 10000000,
  business_types text[] DEFAULT '{}',
  limit_count integer DEFAULT 20,
  offset_count integer DEFAULT 0
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
    s.description_combined,
    s.images,
    s.is_featured,
    s.is_urgent,
    s.created_at
  FROM salon_sales s
  WHERE 
    s.status = 'active'
    AND (search_query = '' OR to_tsvector('english', s.salon_name || ' ' || COALESCE(s.description_combined, '') || ' ' || COALESCE(s.city, '') || ' ' || COALESCE(s.state, '')) @@ plainto_tsquery('english', search_query))
    AND (location_filter = '' OR s.city ILIKE '%' || location_filter || '%' OR s.state ILIKE '%' || location_filter || '%')
    AND s.asking_price BETWEEN price_min AND price_max
    AND (array_length(business_types, 1) IS NULL OR s.business_type = ANY(business_types))
  ORDER BY 
    s.is_featured DESC,
    s.is_urgent DESC,
    s.created_at DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$;

-- Rate limiting table for production security
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier text NOT NULL,
  endpoint text NOT NULL,
  request_count integer DEFAULT 1,
  window_start timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier_endpoint 
ON rate_limits (identifier, endpoint, window_start);