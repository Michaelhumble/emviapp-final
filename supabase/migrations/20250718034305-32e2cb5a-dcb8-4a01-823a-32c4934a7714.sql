-- Configure JWT settings for longer session duration
-- These settings control how long users stay signed in

-- Set JWT expiry to 7 days (604800 seconds)
-- This is the main setting that controls session duration
ALTER SYSTEM SET app.settings.jwt_exp TO '604800';

-- Set refresh token expiry to 30 days (2592000 seconds)
-- This allows sessions to be refreshed for up to 30 days
ALTER SYSTEM SET app.settings.jwt_aud TO 'authenticated';

-- Reload configuration to apply changes
SELECT pg_reload_conf();

-- Create a function to validate that settings are applied correctly
CREATE OR REPLACE FUNCTION public.get_jwt_settings()
RETURNS TABLE(
  setting_name text,
  setting_value text,
  description text
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'jwt_exp'::text as setting_name,
    current_setting('app.settings.jwt_exp', true)::text as setting_value,
    'JWT token expiry in seconds (7 days = 604800)'::text as description
  UNION ALL
  SELECT 
    'jwt_aud'::text as setting_name,
    current_setting('app.settings.jwt_aud', true)::text as setting_value,
    'JWT audience setting'::text as description;
END;
$$;