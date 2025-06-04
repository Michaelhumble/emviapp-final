

-- Drop and recreate the handle_new_user function with better error handling
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  phone_value TEXT;
  role_value TEXT;
  full_name_value TEXT;
BEGIN
  SET search_path = public;
  
  -- Get phone from user metadata if available, otherwise null
  phone_value := NEW.raw_user_meta_data->>'phone';
  IF phone_value IS NULL OR phone_value = '' THEN
    phone_value := NULL;
  END IF;
  
  -- Get role and validate it
  role_value := COALESCE(
    NEW.raw_user_meta_data->>'role',
    NEW.raw_user_meta_data->>'user_type',
    'customer'
  );
  
  -- Validate role against allowed values
  IF role_value NOT IN ('artist', 'owner', 'customer', 'supply_partner', 'salon', 'manager', 'admin', 'freelancer', 'nail technician/artist', 'beauty supplier', 'supplier', 'vendor', 'renter', 'other') THEN
    role_value := 'customer';
  END IF;
  
  -- Get full name with fallback
  full_name_value := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    ''
  );

  -- Insert into public.users with explicit column mapping
  INSERT INTO public.users (
    id, 
    email, 
    phone, 
    created_at, 
    full_name, 
    role,
    location
  ) VALUES (
    NEW.id,
    NEW.email,
    phone_value,
    NEW.created_at,
    full_name_value,
    role_value,
    COALESCE(NEW.raw_user_meta_data->>'location', '')
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't block user creation
    RAISE LOG 'Error in handle_new_user: %, SQLSTATE: %', SQLERRM, SQLSTATE;
    RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure phone column is nullable (should already be, but confirming)
ALTER TABLE public.users ALTER COLUMN phone DROP NOT NULL;

-- Add RLS policies to allow the trigger to insert into users table
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Service role can insert users" ON public.users;

-- Allow service role (used by triggers) to insert
CREATE POLICY "Service role can insert users"
  ON public.users
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow authenticated users to insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

