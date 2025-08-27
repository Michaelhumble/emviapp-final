-- Enhanced booking system schema (fixed)
-- Services table for artist services
CREATE TABLE public.services (
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
ADD COLUMN timezone text DEFAULT 'America/New_York',
ADD COLUMN slot_duration_minutes integer DEFAULT 30,
ADD COLUMN buffer_minutes integer DEFAULT 15,
ADD COLUMN max_advance_days integer DEFAULT 60;

-- Enhanced bookings table
ALTER TABLE public.bookings 
ADD COLUMN starts_at timestamp with time zone,
ADD COLUMN ends_at timestamp with time zone,
ADD COLUMN source text DEFAULT 'web',
ADD COLUMN client_email text,
ADD COLUMN client_phone text,
ADD COLUMN confirmation_sent_at timestamp with time zone,
ADD COLUMN calendar_event_id text;

-- Enable RLS on services table
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- RLS policies for services
CREATE POLICY "Anyone can view active services" ON public.services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Artists can manage their own services" ON public.services
  FOR ALL USING (auth.uid() = artist_id);

-- Indexes for performance
CREATE INDEX idx_services_artist_id ON public.services(artist_id);
CREATE INDEX idx_services_active ON public.services(is_active) WHERE is_active = true;
CREATE INDEX idx_bookings_starts_at ON public.bookings(starts_at);
CREATE INDEX idx_bookings_artist_date ON public.bookings(recipient_id, starts_at);

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
SET search_path = public
AS $$
BEGIN
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