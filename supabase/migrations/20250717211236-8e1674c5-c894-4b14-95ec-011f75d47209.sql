-- Update the users table role constraint to include 'freelancer' and ensure all frontend roles are supported
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_role_check;

-- Add updated constraint that includes all roles from the frontend
ALTER TABLE public.users ADD CONSTRAINT users_role_check 
CHECK (role IN ('artist', 'owner', 'customer', 'supply_partner', 'freelancer', 'salon'));

-- Add comment to document the role mapping
COMMENT ON CONSTRAINT users_role_check ON public.users IS 
'Allows all user roles: artist, owner (salon owners), customer, supply_partner, freelancer, and salon (mapped to owner on frontend)';