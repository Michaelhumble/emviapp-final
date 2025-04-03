
-- This migration will update the handle_new_user function to properly process the additional metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Extract values from user metadata
  INSERT INTO public.users (
    id, 
    email, 
    full_name,
    role,
    created_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'customer'),
    NEW.created_at
  );
  
  RETURN NEW;
END;
$$;
