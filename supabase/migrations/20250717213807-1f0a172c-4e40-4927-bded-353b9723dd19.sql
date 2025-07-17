-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved trigger function that uses raw_user_meta_data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
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
  user_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', '');
  user_phone := COALESCE(NEW.raw_user_meta_data->>'phone', '');
  
  -- Map frontend roles to database roles
  IF frontend_role = 'salon' THEN 
    mapped_role := 'owner';
  ELSE 
    mapped_role := frontend_role;
  END IF;
  
  -- Validate that the mapped role is allowed
  IF mapped_role NOT IN ('artist', 'owner', 'customer', 'supply_partner', 'freelancer') THEN
    mapped_role := 'customer'; -- Default to customer for invalid roles
  END IF;
  
  -- Insert new user with proper role mapping and defaults
  INSERT INTO public.users (
    id,
    email,
    full_name,
    phone,
    role,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    user_email,
    user_full_name,
    user_phone,
    mapped_role,
    NOW(),
    NOW()
  );

  -- Log successful user creation
  INSERT INTO public.audit_logs (
    user_id,
    action,
    resource_type,
    metadata
  ) VALUES (
    NEW.id,
    'user_created',
    'users',
    jsonb_build_object(
      'email', user_email,
      'full_name', user_full_name,
      'phone', user_phone,
      'frontend_role', frontend_role,
      'mapped_role', mapped_role
    )
  );

  RETURN NEW;
EXCEPTION WHEN others THEN
  -- Log the error for debugging
  INSERT INTO public.audit_logs (
    action,
    resource_type,
    metadata
  ) VALUES (
    'user_creation_failed',
    'users',
    jsonb_build_object(
      'error', SQLERRM,
      'frontend_role', frontend_role,
      'attempted_role', mapped_role,
      'user_email', user_email,
      'user_full_name', user_full_name
    )
  );
  RAISE; -- Re-raise the error
END;
$$;

-- Re-create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure RLS is enabled and policies are correct
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop and recreate the insert policy
DROP POLICY IF EXISTS users_insert_policy ON public.users;
CREATE POLICY users_insert_policy ON public.users
  FOR INSERT WITH CHECK (
    -- Allow service role and trigger function to insert
    (auth.role() = 'service_role' OR auth.uid() = id)
  );

-- Document the updated function
COMMENT ON FUNCTION public.handle_new_user() IS 
'Handles new user creation using raw_user_meta_data for all custom fields.
Maps frontend roles (salon -> owner) and validates allowed roles.
Uses proper defaults to avoid NOT NULL constraint errors.
Allowed roles: artist, owner, customer, supply_partner, freelancer.';