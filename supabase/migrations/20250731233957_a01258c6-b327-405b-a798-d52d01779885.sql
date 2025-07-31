-- 🚀 UNIFIED BOOKING SYSTEM DATABASE UPGRADE
-- Creates tables for real-time sync, AI logging, and payment tracking

-- 1. Booking Events Log for AI/ML
CREATE TABLE IF NOT EXISTS public.booking_events_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL CHECK (event_type IN ('booking_created', 'booking_updated', 'booking_cancelled', 'booking_confirmed', 'payment_completed', 'no_show')),
  booking_id UUID NOT NULL,
  customer_id UUID NOT NULL,
  artist_id UUID NOT NULL,
  salon_id UUID,
  event_data JSONB NOT NULL DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.booking_events_log ENABLE ROW LEVEL SECURITY;

-- Policy for system to insert events
CREATE POLICY "system_can_insert_events" ON public.booking_events_log
  FOR INSERT
  WITH CHECK (true);

-- Policy for users to view their own booking events
CREATE POLICY "users_view_own_events" ON public.booking_events_log
  FOR SELECT
  USING (auth.uid() = customer_id OR auth.uid() = artist_id);

-- 2. Real-time table publications for instant sync
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.booking_audit_log;
ALTER PUBLICATION supabase_realtime ADD TABLE public.booking_events_log;

-- 3. Enhanced bookings table with payment tracking
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS payment_intent_id TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
ADD COLUMN IF NOT EXISTS amount_paid DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'usd';

-- 4. Booking conflicts tracking
CREATE TABLE IF NOT EXISTS public.booking_conflicts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  conflict_type TEXT NOT NULL CHECK (conflict_type IN ('time_overlap', 'artist_unavailable', 'salon_closed', 'double_booking')),
  conflicting_booking_id UUID REFERENCES public.bookings(id),
  conflict_message TEXT NOT NULL,
  resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for conflicts
ALTER TABLE public.booking_conflicts ENABLE ROW LEVEL SECURITY;

-- Policy for conflict visibility
CREATE POLICY "conflicts_visible_to_participants" ON public.booking_conflicts
  FOR SELECT
  USING (
    booking_id IN (
      SELECT b.id FROM public.bookings b 
      WHERE b.sender_id = auth.uid() OR b.recipient_id = auth.uid()
    )
  );

-- 5. Notification tracking
CREATE TABLE IF NOT EXISTS public.booking_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('sms', 'email', 'push')),
  event_type TEXT NOT NULL CHECK (event_type IN ('created', 'updated', 'cancelled', 'reminder')),
  sent_at TIMESTAMPTZ,
  delivery_status TEXT DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'sent', 'delivered', 'failed')),
  provider_response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for notifications
ALTER TABLE public.booking_notifications ENABLE ROW LEVEL SECURITY;

-- Policy for notification visibility
CREATE POLICY "users_view_own_notifications" ON public.booking_notifications
  FOR SELECT
  USING (auth.uid() = user_id);

-- 6. AI/ML readiness indexes
CREATE INDEX IF NOT EXISTS idx_booking_events_type_date ON public.booking_events_log(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_booking_events_artist ON public.booking_events_log(artist_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_booking_events_customer ON public.booking_events_log(customer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_realtime ON public.bookings(recipient_id, date_requested, status);
CREATE INDEX IF NOT EXISTS idx_booking_conflicts_unresolved ON public.booking_conflicts(resolved, created_at DESC) WHERE NOT resolved;

-- 7. Enhanced booking audit trigger
CREATE OR REPLACE FUNCTION public.enhanced_booking_audit()
RETURNS TRIGGER AS $$
BEGIN
  -- Log to audit table
  INSERT INTO public.booking_audit_log (
    booking_id,
    user_id,
    action_type,
    previous_state,
    new_state,
    metadata
  ) VALUES (
    COALESCE(NEW.id, OLD.id),
    auth.uid(),
    CASE 
      WHEN TG_OP = 'INSERT' THEN 'created'
      WHEN TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN 'status_changed'
      WHEN TG_OP = 'UPDATE' THEN 'updated'
      WHEN TG_OP = 'DELETE' THEN 'deleted'
    END,
    to_jsonb(OLD),
    to_jsonb(NEW),
    jsonb_build_object(
      'table', TG_TABLE_NAME,
      'operation', TG_OP,
      'timestamp', extract(epoch from now())
    )
  );

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Replace existing trigger
DROP TRIGGER IF EXISTS booking_audit_trigger ON public.bookings;
CREATE TRIGGER booking_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.enhanced_booking_audit();

-- 8. Conflict detection function
CREATE OR REPLACE FUNCTION public.check_booking_conflicts(
  p_artist_id UUID,
  p_date_requested DATE,
  p_time_requested TIME,
  p_exclude_booking_id UUID DEFAULT NULL
)
RETURNS TABLE(
  conflict_type TEXT,
  conflict_message TEXT,
  conflicting_booking_id UUID
) AS $$
BEGIN
  -- Check for time overlaps
  RETURN QUERY
  SELECT 
    'time_overlap'::TEXT as conflict_type,
    'Time slot conflicts with existing booking'::TEXT as conflict_message,
    b.id as conflicting_booking_id
  FROM public.bookings b
  WHERE b.recipient_id = p_artist_id
    AND b.date_requested = p_date_requested
    AND b.time_requested = p_time_requested
    AND b.status IN ('pending', 'confirmed')
    AND (p_exclude_booking_id IS NULL OR b.id != p_exclude_booking_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Performance optimization
ANALYZE public.bookings;
ANALYZE public.booking_events_log;
ANALYZE public.booking_conflicts;