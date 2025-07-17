-- STEP 1: Drop the custom public.users table if it exists
DROP TABLE IF EXISTS public.users CASCADE;

-- STEP 2: Update the existing profiles table to add missing columns (without constraints yet)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'customer',
ADD COLUMN IF NOT EXISTS boosted_until TIMESTAMPTZ;

-- STEP 3: Update existing role data to match new constraint values
UPDATE public.profiles 
SET role = CASE 
  WHEN role = 'salon' THEN 'salon_owner'
  WHEN role IS NULL THEN 'customer'
  ELSE role 
END;

-- STEP 4: Now add constraints after data is cleaned
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('customer', 'salon_owner', 'technician', 'artist', 'owner', 'supply_partner', 'freelancer'));

-- Add unique constraints
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_email_key;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_phone_key;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_email_key UNIQUE (email);
ALTER TABLE public.profiles ADD CONSTRAINT profiles_phone_key UNIQUE (phone);

-- Make full_name NOT NULL (handle existing NULL values first)
UPDATE public.profiles 
SET full_name = COALESCE(full_name, 'User') 
WHERE full_name IS NULL;

ALTER TABLE public.profiles ALTER COLUMN full_name SET NOT NULL;

-- STEP 5: Temporarily remove foreign key constraints that might have orphaned data
ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_sender_id_fkey;
ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_recipient_id_fkey;
ALTER TABLE public.messages DROP CONSTRAINT IF EXISTS messages_sender_id_fkey;
ALTER TABLE public.messages DROP CONSTRAINT IF EXISTS messages_recipient_id_fkey;
ALTER TABLE public.artist_services DROP CONSTRAINT IF EXISTS artist_services_user_id_fkey;
ALTER TABLE public.artist_availability DROP CONSTRAINT IF EXISTS artist_availability_artist_id_fkey;
ALTER TABLE public.artist_time_off DROP CONSTRAINT IF EXISTS artist_time_off_artist_id_fkey;
ALTER TABLE public.artist_clients DROP CONSTRAINT IF EXISTS artist_clients_artist_id_fkey;
ALTER TABLE public.applications DROP CONSTRAINT IF EXISTS applications_user_id_fkey;
ALTER TABLE public.activity_log DROP CONSTRAINT IF EXISTS activity_log_user_id_fkey;

-- STEP 6: Clean up orphaned data from activity_log
DELETE FROM public.activity_log 
WHERE user_id IS NOT NULL 
AND user_id NOT IN (SELECT id FROM auth.users);

-- STEP 7: Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- STEP 8: Create new trigger function for profiles table
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

-- STEP 9: Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- STEP 10: Update existing profiles with email from auth.users
UPDATE public.profiles 
SET 
  email = COALESCE(profiles.email, au.email),
  role = COALESCE(profiles.role, 
    CASE 
      WHEN au.raw_user_meta_data->>'role' = 'salon' THEN 'salon_owner'
      ELSE COALESCE(au.raw_user_meta_data->>'role', 'customer')
    END
  )
FROM auth.users au 
WHERE profiles.id = au.id;

-- STEP 11: Create profiles for any auth.users that don't have profiles yet
INSERT INTO public.profiles (id, email, full_name, role, created_at)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', split_part(au.email, '@', 1)),
  CASE 
    WHEN au.raw_user_meta_data->>'role' = 'salon' THEN 'salon_owner'
    ELSE COALESCE(au.raw_user_meta_data->>'role', 'customer')
  END,
  au.created_at
FROM auth.users au
WHERE NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = au.id);

-- STEP 12: Re-add foreign key constraints now that profiles exist
ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_sender_id_fkey 
FOREIGN KEY (sender_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_recipient_id_fkey 
FOREIGN KEY (recipient_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.messages 
ADD CONSTRAINT messages_sender_id_fkey 
FOREIGN KEY (sender_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.messages 
ADD CONSTRAINT messages_recipient_id_fkey 
FOREIGN KEY (recipient_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.artist_services 
ADD CONSTRAINT artist_services_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.artist_availability 
ADD CONSTRAINT artist_availability_artist_id_fkey 
FOREIGN KEY (artist_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.artist_time_off 
ADD CONSTRAINT artist_time_off_artist_id_fkey 
FOREIGN KEY (artist_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.artist_clients 
ADD CONSTRAINT artist_clients_artist_id_fkey 
FOREIGN KEY (artist_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.applications 
ADD CONSTRAINT applications_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.activity_log 
ADD CONSTRAINT activity_log_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- STEP 13: Create/Update RLS policies for profiles table
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

-- Document the table updates
COMMENT ON TABLE public.profiles IS 
'User profile data referenced by all other tables instead of auth.users.
Contains app-specific user information while auth.users handles authentication.';