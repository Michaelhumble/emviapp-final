-- Add missing columns to salon_photos
ALTER TABLE public.salon_photos 
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS is_primary BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create salon_team_members table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.salon_team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  specialties TEXT[],
  status TEXT DEFAULT 'active',
  joined_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create salon_bookings table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.salon_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL,
  artist_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  service_name TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  notes TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.salon_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Salon owners can manage their photos" ON public.salon_photos;
DROP POLICY IF EXISTS "Anyone can view salon photos" ON public.salon_photos;

CREATE POLICY "Salon owners can manage their photos"
  ON public.salon_photos
  FOR ALL
  USING (
    salon_id IN (
      SELECT id FROM salons WHERE owner_id = auth.uid()
      UNION
      SELECT salon_id FROM user_salon_access 
      WHERE user_id = auth.uid() AND access_type IN ('owner', 'manager')
    )
  );

CREATE POLICY "Anyone can view salon photos"
  ON public.salon_photos
  FOR SELECT
  USING (true);

-- Policies for salon_team_members
DROP POLICY IF EXISTS "Salon owners can manage team members" ON public.salon_team_members;
DROP POLICY IF EXISTS "Team members can view their own data" ON public.salon_team_members;

CREATE POLICY "Salon owners can manage team members"
  ON public.salon_team_members
  FOR ALL
  USING (
    salon_id IN (
      SELECT id FROM salons WHERE owner_id = auth.uid()
      UNION
      SELECT salon_id FROM user_salon_access 
      WHERE user_id = auth.uid() AND access_type IN ('owner', 'manager')
    )
  );

CREATE POLICY "Team members can view their own data"
  ON public.salon_team_members
  FOR SELECT
  USING (user_id = auth.uid() OR salon_id IN (
    SELECT salon_id FROM user_salon_access WHERE user_id = auth.uid()
  ));

-- Policies for salon_bookings
DROP POLICY IF EXISTS "Salon owners can manage bookings" ON public.salon_bookings;
DROP POLICY IF EXISTS "Artists can view their bookings" ON public.salon_bookings;

CREATE POLICY "Salon owners can manage bookings"
  ON public.salon_bookings
  FOR ALL
  USING (
    salon_id IN (
      SELECT id FROM salons WHERE owner_id = auth.uid()
      UNION
      SELECT salon_id FROM user_salon_access 
      WHERE user_id = auth.uid() AND access_type IN ('owner', 'manager')
    )
  );

CREATE POLICY "Artists can view their bookings"
  ON public.salon_bookings
  FOR SELECT
  USING (artist_id = auth.uid());