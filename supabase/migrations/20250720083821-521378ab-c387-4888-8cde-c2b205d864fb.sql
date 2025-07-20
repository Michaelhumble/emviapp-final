-- Production Database Optimization - Final Version
-- Add indexes for high-performance queries using correct column names

-- Salon sales optimization (high-traffic table)
CREATE INDEX IF NOT EXISTS idx_salon_sales_location 
ON salon_sales (city, state);

CREATE INDEX IF NOT EXISTS idx_salon_sales_price 
ON salon_sales (asking_price);

CREATE INDEX IF NOT EXISTS idx_salon_sales_business_type 
ON salon_sales (business_type);

CREATE INDEX IF NOT EXISTS idx_salon_sales_status_featured 
ON salon_sales (status, is_featured, is_urgent, created_at DESC);

-- Bookings optimization (frequent queries)
CREATE INDEX IF NOT EXISTS idx_bookings_recipient_status 
ON bookings (recipient_id, status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_bookings_sender_status 
ON bookings (sender_id, status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_bookings_date_time 
ON bookings (date_requested, time_requested);

-- Profiles optimization (user searches)
CREATE INDEX IF NOT EXISTS idx_profiles_role_location 
ON profiles (role, location);

CREATE INDEX IF NOT EXISTS idx_profiles_full_name 
ON profiles (full_name);

CREATE INDEX IF NOT EXISTS idx_profiles_specialty 
ON profiles (specialty);

-- Notifications optimization (user dashboard)
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread 
ON notifications (user_id, is_read, created_at DESC);

-- Production search function for salon sales
CREATE OR REPLACE FUNCTION public.search_salon_sales_optimized(
  search_text text DEFAULT '',
  location_filter text DEFAULT '',
  price_min numeric DEFAULT 0,
  price_max numeric DEFAULT 10000000,
  business_type_filter text DEFAULT '',
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

-- Rate limiting for production API security
CREATE TABLE IF NOT EXISTS public.api_rate_limits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier text NOT NULL, -- IP or user ID
  endpoint text NOT NULL,
  request_count integer DEFAULT 1,
  window_start timestamp with time zone DEFAULT now(),
  blocked_until timestamp with time zone DEFAULT NULL,
  created_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_api_rate_limits_lookup 
ON api_rate_limits (identifier, endpoint, window_start);

-- Production-ready rate limiting function
CREATE OR REPLACE FUNCTION public.check_api_rate_limit(
  p_identifier text,
  p_endpoint text,
  p_max_requests integer DEFAULT 100,
  p_window_minutes integer DEFAULT 60
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;