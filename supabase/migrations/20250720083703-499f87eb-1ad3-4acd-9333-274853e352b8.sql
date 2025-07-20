-- Production Scale-Up Database Optimizations (Fixed)
-- Add indexes for existing tables only

-- Salon sales search optimization (confirmed table exists)
CREATE INDEX IF NOT EXISTS idx_salon_sales_location 
ON salon_sales (city, state);

CREATE INDEX IF NOT EXISTS idx_salon_sales_price_range 
ON salon_sales (asking_price);

CREATE INDEX IF NOT EXISTS idx_salon_sales_business_type 
ON salon_sales (business_type);

CREATE INDEX IF NOT EXISTS idx_salon_sales_status_created 
ON salon_sales (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_salon_sales_featured 
ON salon_sales (is_featured, is_urgent, created_at DESC);

-- Bookings performance indexes
CREATE INDEX IF NOT EXISTS idx_bookings_recipient_status 
ON bookings (recipient_id, status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_bookings_sender_status 
ON bookings (sender_id, status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_bookings_date_time 
ON bookings (date_requested, time_requested);

-- User profiles optimization
CREATE INDEX IF NOT EXISTS idx_profiles_role 
ON profiles (role);

CREATE INDEX IF NOT EXISTS idx_profiles_location 
ON profiles (location);

-- Community posts optimization
CREATE INDEX IF NOT EXISTS idx_community_posts_trending 
ON community_posts (is_trending, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_community_posts_featured 
ON community_posts (is_featured, created_at DESC);

-- Notifications optimization
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread 
ON notifications (user_id, read, created_at DESC);

-- Audit logs optimization
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource 
ON audit_logs (resource_type, resource_id, created_at DESC);

-- Activity log optimization
CREATE INDEX IF NOT EXISTS idx_activity_log_user_type 
ON activity_log (user_id, activity_type, created_at DESC);

-- Production search function for salons
CREATE OR REPLACE FUNCTION public.search_salons_production(
  search_query text DEFAULT '',
  location_filter text DEFAULT '',
  price_min numeric DEFAULT 0,
  price_max numeric DEFAULT 10000000,
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
    s.is_featured,
    s.is_urgent,
    s.created_at
  FROM salon_sales s
  WHERE 
    s.status = 'active'
    AND (location_filter = '' OR s.city ILIKE '%' || location_filter || '%' OR s.state ILIKE '%' || location_filter || '%')
    AND s.asking_price BETWEEN price_min AND price_max
  ORDER BY 
    s.is_featured DESC,
    s.is_urgent DESC,
    s.created_at DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$;

-- Rate limiting for production security
CREATE TABLE IF NOT EXISTS public.api_rate_limits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier text NOT NULL,
  endpoint text NOT NULL,
  request_count integer DEFAULT 1,
  window_start timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_api_rate_limits_lookup 
ON api_rate_limits (identifier, endpoint, window_start);

-- Function to check rate limits
CREATE OR REPLACE FUNCTION public.check_rate_limit(
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
BEGIN
  window_start_time := now() - (p_window_minutes || ' minutes')::interval;
  
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
    RETURN false;
  END IF;
END;
$$;