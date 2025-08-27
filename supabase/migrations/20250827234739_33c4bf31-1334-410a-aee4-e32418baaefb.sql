-- Enhanced booking system schema
-- Services table for artist services
CREATE TABLE IF NOT EXISTS public.services (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  duration_minutes integer NOT NULL DEFAULT 60,
  price numeric(10,2),
  location_type text CHECK (location_type IN ('in_person', 'remote', 'both')) DEFAULT 'in_person',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enhanced artist_availability table with timezone and slot configuration
ALTER TABLE public.artist_availability 
ADD COLUMN IF NOT EXISTS timezone text DEFAULT 'America/New_York',
ADD COLUMN IF NOT EXISTS slot_duration_minutes integer DEFAULT 30,
ADD COLUMN IF NOT EXISTS buffer_minutes integer DEFAULT 15,
ADD COLUMN IF NOT EXISTS max_advance_days integer DEFAULT 60;

-- Artist time off table
CREATE TABLE IF NOT EXISTS public.artist_time_off (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id uuid NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  reason text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enhanced bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS starts_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS ends_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS source text DEFAULT 'web',
ADD COLUMN IF NOT EXISTS client_email text,
ADD COLUMN IF NOT EXISTS client_phone text,
ADD COLUMN IF NOT EXISTS confirmation_sent_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS calendar_event_id text;

-- Update existing bookings status enum if needed
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'booking_status') THEN
        CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'rescheduled', 'completed');
        ALTER TABLE public.bookings ALTER COLUMN status TYPE booking_status USING status::booking_status;
    END IF;
END
$$;

-- Enable RLS on new tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_time_off ENABLE ROW LEVEL SECURITY;

-- RLS policies for services
CREATE POLICY "Anyone can view active services" ON public.services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Artists can manage their own services" ON public.services
  FOR ALL USING (auth.uid() = artist_id);

-- RLS policies for artist_time_off
CREATE POLICY "Artists can manage their own time off" ON public.artist_time_off
  FOR ALL USING (auth.uid() = artist_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_services_artist_id ON public.services(artist_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_artist_time_off_artist_id ON public.artist_time_off(artist_id);
CREATE INDEX IF NOT EXISTS idx_artist_time_off_dates ON public.artist_time_off(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_bookings_starts_at ON public.bookings(starts_at);
CREATE INDEX IF NOT EXISTS idx_bookings_artist_date ON public.bookings(recipient_id, starts_at);

-- Trigger to update updated_at on services
CREATE OR REPLACE FUNCTION update_services_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_services_updated_at_trigger
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION update_services_updated_at();

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
AS $$
BEGIN
  SET search_path = public;
  
  -- Check for overlapping bookings
  RETURN EXISTS (
    SELECT 1 FROM bookings
    WHERE recipient_id = p_artist_id
      AND status NOT IN ('cancelled', 'declined')
      AND (p_exclude_booking_id IS NULL OR id != p_exclude_booking_id)
      AND (
        (starts_at <= p_starts_at AND ends_at > p_starts_at) OR
        (starts_at < p_ends_at AND ends_at >= p_ends_at) OR
        (starts_at >= p_starts_at AND ends_at <= p_ends_at)
      )
  );
END;
$$;