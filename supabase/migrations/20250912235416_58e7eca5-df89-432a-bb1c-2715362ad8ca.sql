-- Create user_role enum type
CREATE TYPE public.user_role AS ENUM ('customer', 'artist', 'salon_owner', 'freelancer');

-- Create auth_state table for OAuth state management
CREATE TABLE public.auth_state (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nonce text NOT NULL UNIQUE,
  state_data jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  expires_at timestamp with time zone DEFAULT (now() + interval '10 minutes')
);

-- Enable RLS on auth_state table
ALTER TABLE public.auth_state ENABLE ROW LEVEL SECURITY;

-- Policy for system to manage auth state
CREATE POLICY "System can manage auth state" 
ON public.auth_state 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Add check constraint for role validation (backup to enum)
ALTER TABLE public.profiles 
ADD CONSTRAINT valid_role_check 
CHECK (role IS NULL OR role IN ('customer', 'artist', 'salon_owner', 'freelancer'));

-- Create index for nonce lookups
CREATE INDEX idx_auth_state_nonce ON public.auth_state(nonce);
CREATE INDEX idx_auth_state_expires ON public.auth_state(expires_at);

-- Function to clean up expired auth states
CREATE OR REPLACE FUNCTION public.cleanup_expired_auth_states()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.auth_state 
  WHERE expires_at < NOW();
END;
$$;