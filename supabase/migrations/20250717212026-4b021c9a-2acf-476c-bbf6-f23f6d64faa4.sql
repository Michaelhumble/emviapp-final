-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE 
  frontend_role text;
  mapped_role text;
BEGIN
  -- Extract the frontend role from metadata
  frontend_role := NEW.raw_user_meta_data->>'role';
  
  -- Map frontend roles to database roles
  CASE frontend_role
    WHEN 'salon' THEN 
      mapped_role := 'owner'
    ELSE 
      mapped_role := frontend_role
  END;
  
  -- Validate that the mapped role is allowed
  IF mapped_role NOT IN ('artist', 'owner', 'customer', 'supply_partner', 'freelancer') THEN
    RAISE EXCEPTION 'Invalid role: %', mapped_role;
  END IF;
  
  -- Insert new user with proper role mapping
  INSERT INTO public.users (
    id,
    email,
    full_name,
    role,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    mapped_role,  -- Use the mapped role
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
      'email', NEW.email,
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
      'attempted_role', mapped_role
    )
  );
  RAISE; -- Re-raise the error
END;
$$;

-- Re-create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add RLS policy for the trigger function
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS users_insert_policy ON public.users;
CREATE POLICY users_insert_policy ON public.users
  FOR INSERT WITH CHECK (
    -- Allow service role and trigger function to insert
    (auth.role() = 'service_role' OR auth.uid() = id)
  );

-- Document the role mapping
COMMENT ON FUNCTION public.handle_new_user() IS 
'Handles new user creation, mapping frontend roles (salon -> owner) and validating allowed roles. 
Allowed roles: artist, owner, customer, supply_partner, freelancer.
Automatically creates audit log entries for successful creation and failures.';