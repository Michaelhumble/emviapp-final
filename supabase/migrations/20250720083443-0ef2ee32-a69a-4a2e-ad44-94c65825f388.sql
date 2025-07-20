-- Production Scale-Up Database Optimizations
-- Add indexes for high-performance search and filtering

-- Salon listings search indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_salon_sales_search 
ON salon_sales USING GIN (to_tsvector('english', salon_name || ' ' || COALESCE(description_combined, '') || ' ' || COALESCE(city, '') || ' ' || COALESCE(state, '')));

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_salon_sales_location 
ON salon_sales (city, state);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_salon_sales_price_range 
ON salon_sales (asking_price);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_salon_sales_business_type 
ON salon_sales (business_type);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_salon_sales_status_created 
ON salon_sales (status, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_salon_sales_featured 
ON salon_sales (is_featured, is_urgent, created_at DESC);

-- Jobs search indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_jobs_search 
ON jobs USING GIN (to_tsvector('english', title || ' ' || COALESCE(description, '') || ' ' || COALESCE(location, '')));

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_jobs_location 
ON jobs (location);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_jobs_category 
ON jobs (category);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_jobs_status_created 
ON jobs (status, created_at DESC);

-- Services search indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_services_search 
ON services USING GIN (to_tsvector('english', title || ' ' || COALESCE(description, '')));

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_services_category 
ON services (category);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_services_user_active 
ON services (user_id, is_active, created_at DESC);

-- Salon services search indexes  
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_salon_services_search 
ON salon_services USING GIN (to_tsvector('english', name || ' ' || COALESCE(description, '')));

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_salon_services_salon 
ON salon_services (salon_id, is_active, created_at DESC);

-- Bookings performance indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bookings_recipient_status 
ON bookings (recipient_id, status, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bookings_sender_status 
ON bookings (sender_id, status, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bookings_date_time 
ON bookings (date_requested, time_requested);

-- Community posts indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_community_posts_search 
ON community_posts USING GIN (to_tsvector('english', content));

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_community_posts_trending 
ON community_posts (is_trending, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_community_posts_featured 
ON community_posts (is_featured, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_community_posts_category 
ON community_posts (category, created_at DESC);

-- User profiles indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_role_location 
ON profiles (role, location);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_search 
ON profiles USING GIN (to_tsvector('english', COALESCE(full_name, '') || ' ' || COALESCE(bio, '') || ' ' || COALESCE(specialty, '')));

-- Audit and activity indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_activity_log_user_type 
ON activity_log (user_id, activity_type, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_audit_logs_resource 
ON audit_logs (resource_type, resource_id, created_at DESC);

-- Notifications indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_notifications_user_unread 
ON notifications (user_id, read, created_at DESC);

-- Create fast search functions for production
CREATE OR REPLACE FUNCTION public.search_salons_fast(
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
  created_at timestamp with time zone,
  search_rank real
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
    s.created_at,
    CASE 
      WHEN search_query = '' THEN 1.0
      ELSE ts_rank(to_tsvector('english', s.salon_name || ' ' || COALESCE(s.description_combined, '') || ' ' || COALESCE(s.city, '') || ' ' || COALESCE(s.state, '')), plainto_tsquery('english', search_query))
    END as search_rank
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
    search_rank DESC,
    s.created_at DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.search_services_fast(
  search_query text DEFAULT '',
  category_filter text DEFAULT '',
  limit_count integer DEFAULT 20,
  offset_count integer DEFAULT 0
)
RETURNS TABLE(
  id uuid,
  title text,
  description text,
  price numeric,
  category text,
  duration integer,
  user_id uuid,
  salon_id uuid,
  provider_name text,
  provider_type text,
  search_rank real
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(s.id, ss.id) as id,
    COALESCE(s.title, ss.name) as title,
    COALESCE(s.description, ss.description) as description,
    COALESCE(s.price, ss.price) as price,
    COALESCE(s.category, 'salon') as category,
    COALESCE(s.duration, ss.duration) as duration,
    s.user_id,
    ss.salon_id,
    CASE 
      WHEN s.id IS NOT NULL THEN (SELECT full_name FROM profiles WHERE id = s.user_id)
      ELSE (SELECT salon_name FROM salons WHERE id = ss.salon_id)
    END as provider_name,
    CASE WHEN s.id IS NOT NULL THEN 'artist' ELSE 'salon' END as provider_type,
    CASE 
      WHEN search_query = '' THEN 1.0
      ELSE ts_rank(
        to_tsvector('english', COALESCE(s.title, ss.name) || ' ' || COALESCE(s.description, ss.description)),
        plainto_tsquery('english', search_query)
      )
    END as search_rank
  FROM services s
  FULL OUTER JOIN salon_services ss ON false -- Force union behavior
  WHERE 
    (s.is_active = true OR ss.is_active = true)
    AND (search_query = '' OR 
         to_tsvector('english', COALESCE(s.title, ss.name) || ' ' || COALESCE(s.description, ss.description)) @@ plainto_tsquery('english', search_query))
    AND (category_filter = '' OR s.category = category_filter OR (ss.id IS NOT NULL AND category_filter = 'salon'))
  ORDER BY search_rank DESC, COALESCE(s.created_at, ss.created_at) DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$;

-- Add production-ready rate limiting table
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier text NOT NULL, -- IP address or user ID
  endpoint text NOT NULL,
  request_count integer DEFAULT 1,
  window_start timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier_endpoint 
ON rate_limits (identifier, endpoint, window_start);

-- Clean up expired rate limits automatically
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM rate_limits 
  WHERE window_start < now() - interval '1 hour';
END;
$$;

-- Auto-cleanup trigger
CREATE OR REPLACE FUNCTION public.auto_cleanup_rate_limits()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- Randomly cleanup old records (10% chance per insert)
  IF random() < 0.1 THEN
    PERFORM cleanup_rate_limits();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS auto_cleanup_rate_limits_trigger ON rate_limits;
CREATE TRIGGER auto_cleanup_rate_limits_trigger
  AFTER INSERT ON rate_limits
  FOR EACH ROW
  EXECUTE FUNCTION auto_cleanup_rate_limits();