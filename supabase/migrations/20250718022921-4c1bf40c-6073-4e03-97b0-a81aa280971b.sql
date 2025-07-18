-- Drop remaining insecure views
DROP VIEW IF EXISTS public.post_status_view CASCADE;
DROP VIEW IF EXISTS public.post_payments CASCADE;
DROP VIEW IF EXISTS public.artist_earnings_summary CASCADE;

-- Create replacement functions for dropped views
CREATE OR REPLACE FUNCTION public.get_post_status_for_user(p_user_id uuid)
RETURNS TABLE(post_id uuid, status text, payment_status text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.get_artist_earnings_for_user(p_artist_id uuid)
RETURNS TABLE(
  week_start timestamp with time zone,
  booking_count bigint,
  total_revenue numeric,
  total_earnings numeric,
  salon_id uuid,
  paid boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;