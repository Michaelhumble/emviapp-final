-- Add missing columns to existing tables
-- Check if services table needs additional columns
DO $$ 
BEGIN
    -- Add columns to artist_availability if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artist_availability' AND column_name = 'timezone') THEN
        ALTER TABLE public.artist_availability ADD COLUMN timezone text DEFAULT 'America/New_York';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artist_availability' AND column_name = 'slot_duration_minutes') THEN
        ALTER TABLE public.artist_availability ADD COLUMN slot_duration_minutes integer DEFAULT 30;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artist_availability' AND column_name = 'buffer_minutes') THEN
        ALTER TABLE public.artist_availability ADD COLUMN buffer_minutes integer DEFAULT 15;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artist_availability' AND column_name = 'max_advance_days') THEN
        ALTER TABLE public.artist_availability ADD COLUMN max_advance_days integer DEFAULT 60;
    END IF;

    -- Add columns to bookings if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'starts_at') THEN
        ALTER TABLE public.bookings ADD COLUMN starts_at timestamp with time zone;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'ends_at') THEN
        ALTER TABLE public.bookings ADD COLUMN ends_at timestamp with time zone;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'source') THEN
        ALTER TABLE public.bookings ADD COLUMN source text DEFAULT 'web';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'client_email') THEN
        ALTER TABLE public.bookings ADD COLUMN client_email text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'client_phone') THEN
        ALTER TABLE public.bookings ADD COLUMN client_phone text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'confirmation_sent_at') THEN
        ALTER TABLE public.bookings ADD COLUMN confirmation_sent_at timestamp with time zone;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'calendar_event_id') THEN
        ALTER TABLE public.bookings ADD COLUMN calendar_event_id text;
    END IF;
END
$$;

-- Create indexes if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_bookings_starts_at') THEN
        CREATE INDEX idx_bookings_starts_at ON public.bookings(starts_at);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_bookings_artist_date') THEN
        CREATE INDEX idx_bookings_artist_date ON public.bookings(recipient_id, starts_at);
    END IF;
END
$$;

-- Function to check booking conflicts
CREATE OR REPLACE FUNCTION check_booking_conflicts(
  p_artist_id uuid,
  p_starts_at timestamp with time zone,
  p_ends_at timestamp with time zone,
  p_exclude_booking_id uuid DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check for overlapping bookings
  RETURN EXISTS (
    SELECT 1 FROM bookings
    WHERE recipient_id = p_artist_id
      AND status NOT IN ('cancelled', 'declined')
      AND (p_exclude_booking_id IS NULL OR id != p_exclude_booking_id)
      AND starts_at IS NOT NULL
      AND ends_at IS NOT NULL
      AND (
        (starts_at <= p_starts_at AND ends_at > p_starts_at) OR
        (starts_at < p_ends_at AND ends_at >= p_ends_at) OR
        (starts_at >= p_starts_at AND ends_at <= p_ends_at)
      )
  );
END;
$$;