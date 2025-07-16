-- Create the create_team_invite function that the frontend expects
CREATE OR REPLACE FUNCTION public.create_team_invite(
  p_salon_id uuid,
  p_phone_number text,
  p_role text
)
RETURNS TABLE(invite_code text, expires_at timestamp with time zone)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_invite_code TEXT;
  v_expires_at TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Check if user has permission to create invites for this salon
  IF NOT EXISTS (
    SELECT 1 FROM public.salons WHERE id = p_salon_id AND owner_id = auth.uid()
    UNION
    SELECT 1 FROM public.user_salon_access 
    WHERE salon_id = p_salon_id AND user_id = auth.uid() AND access_type = ANY(ARRAY['owner', 'manager'])
  ) THEN
    RAISE EXCEPTION 'Unauthorized to create invites for this salon';
  END IF;
  
  -- Generate invite code
  v_invite_code := public.generate_team_invite_code();
  v_expires_at := now() + interval '7 days';
  
  -- Create team invite
  INSERT INTO public.team_invites (
    salon_id,
    phone_number,
    role,
    invite_code,
    expires_at
  ) VALUES (
    p_salon_id,
    p_phone_number,
    p_role,
    v_invite_code,
    v_expires_at
  );
  
  RETURN QUERY SELECT v_invite_code, v_expires_at;
END;
$$;