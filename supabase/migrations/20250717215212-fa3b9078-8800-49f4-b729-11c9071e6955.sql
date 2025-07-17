-- STEP 1: Drop the custom public.users table if it exists
DROP TABLE IF EXISTS public.users CASCADE;

-- STEP 2: Create the profiles table for user profile data
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT UNIQUE,
    role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'salon_owner', 'technician', 'artist', 'owner', 'supply_partner', 'freelancer')),
    avatar_url TEXT,
    boosted_until TIMESTAMPTZ
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- STEP 3: Update all foreign key references to point to profiles
-- Update bookings table
ALTER TABLE public.bookings 
DROP CONSTRAINT IF EXISTS bookings_sender_id_fkey,
DROP CONSTRAINT IF EXISTS bookings_recipient_id_fkey;

ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_sender_id_fkey 
FOREIGN KEY (sender_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
ADD CONSTRAINT bookings_recipient_id_fkey 
FOREIGN KEY (recipient_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update messages table
ALTER TABLE public.messages 
DROP CONSTRAINT IF EXISTS messages_sender_id_fkey,
DROP CONSTRAINT IF EXISTS messages_recipient_id_fkey;

ALTER TABLE public.messages 
ADD CONSTRAINT messages_sender_id_fkey 
FOREIGN KEY (sender_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
ADD CONSTRAINT messages_recipient_id_fkey 
FOREIGN KEY (recipient_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update artist_services table
ALTER TABLE public.artist_services 
DROP CONSTRAINT IF EXISTS artist_services_user_id_fkey;

ALTER TABLE public.artist_services 
ADD CONSTRAINT artist_services_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update artist_availability table
ALTER TABLE public.artist_availability 
DROP CONSTRAINT IF EXISTS artist_availability_artist_id_fkey;

ALTER TABLE public.artist_availability 
ADD CONSTRAINT artist_availability_artist_id_fkey 
FOREIGN KEY (artist_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update artist_time_off table
ALTER TABLE public.artist_time_off 
DROP CONSTRAINT IF EXISTS artist_time_off_artist_id_fkey;

ALTER TABLE public.artist_time_off 
ADD CONSTRAINT artist_time_off_artist_id_fkey 
FOREIGN KEY (artist_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update artist_clients table
ALTER TABLE public.artist_clients 
DROP CONSTRAINT IF EXISTS artist_clients_artist_id_fkey;

ALTER TABLE public.artist_clients 
ADD CONSTRAINT artist_clients_artist_id_fkey 
FOREIGN KEY (artist_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update applications table
ALTER TABLE public.applications 
DROP CONSTRAINT IF EXISTS applications_user_id_fkey;

ALTER TABLE public.applications 
ADD CONSTRAINT applications_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update activity_log table
ALTER TABLE public.activity_log 
DROP CONSTRAINT IF EXISTS activity_log_user_id_fkey;

ALTER TABLE public.activity_log 
ADD CONSTRAINT activity_log_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- STEP 4: Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- STEP 5: Create new trigger function for profiles table
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE 
  frontend_role text;
  mapped_role text;
  user_email text;
  user_full_name text;
  user_phone text;
BEGIN
  -- Extract all data from raw_user_meta_data
  frontend_role := COALESCE(NEW.raw_user_meta_data->>'role', 'customer');
  user_email := COALESCE(NEW.email, NEW.raw_user_meta_data->>'email', '');
  user_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));
  user_phone := COALESCE(NEW.raw_user_meta_data->>'phone', '');
  
  -- Map frontend roles to database roles
  IF frontend_role = 'salon' THEN 
    mapped_role := 'salon_owner';
  ELSEIF frontend_role = 'nail_technician' THEN
    mapped_role := 'technician';
  ELSE 
    mapped_role := frontend_role;
  END IF;
  
  -- Validate that the mapped role is allowed
  IF mapped_role NOT IN ('customer', 'salon_owner', 'technician', 'artist', 'owner', 'supply_partner', 'freelancer') THEN
    mapped_role := 'customer'; -- Default to customer for invalid roles
  END IF;
  
  -- Insert new user profile
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    phone,
    role,
    created_at
  ) VALUES (
    NEW.id,
    user_email,
    user_full_name,
    NULLIF(user_phone, ''),
    mapped_role,
    NOW()
  );

  RETURN NEW;
EXCEPTION WHEN others THEN
  -- Log the error for debugging
  RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
  RAISE; -- Re-raise the error
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- STEP 6: Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- STEP 7: Create RLS policies for profiles table
DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Allow users to read their own profile
CREATE POLICY "Users can read their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Allow profile creation via trigger
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Allow public viewing of profiles (for artist discovery, etc.)
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles
FOR SELECT
USING (true);

-- Document the function
COMMENT ON FUNCTION public.handle_new_user() IS 
'Creates a profile record when a new user signs up via auth.users.
Maps frontend roles to database roles and uses raw_user_meta_data for custom fields.
Allowed roles: customer, salon_owner, technician, artist, owner, supply_partner, freelancer.';

-- Document the table
COMMENT ON TABLE public.profiles IS 
'User profile data referenced by all other tables instead of auth.users.
Contains app-specific user information while auth.users handles authentication.';