-- Create RLS policy for admin access to users table
CREATE POLICY "Admins can access all user data" ON public.users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'humbleinsider@gmail.com'
    )
  );

-- Ensure the existing user profile policies still work
-- (This migration adds admin access without breaking existing user access)

-- Create function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'humbleinsider@gmail.com'
  );
$$;

-- Grant necessary permissions for the admin analytics
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON public.users TO authenticated;