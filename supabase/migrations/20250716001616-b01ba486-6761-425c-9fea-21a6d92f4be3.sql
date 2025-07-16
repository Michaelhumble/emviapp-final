-- Create universal team invites table for multi-use invite links
CREATE TABLE IF NOT EXISTS public.universal_team_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  invite_code TEXT NOT NULL UNIQUE,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  max_uses INTEGER NOT NULL DEFAULT 5,
  current_uses INTEGER NOT NULL DEFAULT 0,
  default_role TEXT NOT NULL DEFAULT 'technician',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'disabled')),
  metadata JSONB DEFAULT '{}',
  CONSTRAINT valid_max_uses CHECK (max_uses > 0 AND max_uses <= 50),
  CONSTRAINT valid_current_uses CHECK (current_uses >= 0 AND current_uses <= max_uses)
);

-- Enable RLS on universal_team_invites
ALTER TABLE public.universal_team_invites ENABLE ROW LEVEL SECURITY;

-- Create policies for universal_team_invites
CREATE POLICY "Salon owners can manage universal invites" 
ON public.universal_team_invites 
FOR ALL 
USING (
  salon_id IN (
    SELECT id FROM public.salons WHERE owner_id = auth.uid()
    UNION
    SELECT salon_id FROM public.user_salon_access 
    WHERE user_id = auth.uid() AND access_type = ANY(ARRAY['owner', 'manager'])
  )
);

CREATE POLICY "Anyone can view active universal invites for acceptance" 
ON public.universal_team_invites 
FOR SELECT 
USING (status = 'active' AND expires_at > now() AND current_uses < max_uses);

-- Add invite_type to team_invites table to distinguish individual vs universal
ALTER TABLE public.team_invites ADD COLUMN IF NOT EXISTS invite_type TEXT DEFAULT 'individual' CHECK (invite_type IN ('individual', 'universal'));
ALTER TABLE public.team_invites ADD COLUMN IF NOT EXISTS universal_invite_id UUID REFERENCES public.universal_team_invites(id) ON DELETE SET NULL;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_universal_invites_code ON public.universal_team_invites(invite_code);
CREATE INDEX IF NOT EXISTS idx_universal_invites_salon ON public.universal_team_invites(salon_id);
CREATE INDEX IF NOT EXISTS idx_team_invites_universal ON public.team_invites(universal_invite_id);

-- Create function to generate universal invite codes
CREATE OR REPLACE FUNCTION public.generate_universal_invite_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    -- Generate a random 8 character code for universal invites (longer for security)
    new_code := 'TEAM-' || substring(md5(gen_random_uuid()::text) from 1 for 8);
    
    -- Check if code already exists
    SELECT EXISTS(
      SELECT 1 FROM public.universal_team_invites WHERE invite_code = new_code
    ) INTO code_exists;
    
    -- If code doesn't exist, use it
    IF NOT code_exists THEN
      RETURN new_code;
    END IF;
  END LOOP;
END;
$$;

-- Create function to create universal team invite
CREATE OR REPLACE FUNCTION public.create_universal_team_invite(
  p_salon_id UUID,
  p_max_uses INTEGER,
  p_default_role TEXT DEFAULT 'technician'
)
RETURNS TABLE(invite_code TEXT, expires_at TIMESTAMP WITH TIME ZONE)
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
  v_invite_code := public.generate_universal_invite_code();
  v_expires_at := now() + interval '7 days';
  
  -- Create universal invite
  INSERT INTO public.universal_team_invites (
    salon_id,
    invite_code,
    created_by,
    max_uses,
    default_role,
    expires_at
  ) VALUES (
    p_salon_id,
    v_invite_code,
    auth.uid(),
    p_max_uses,
    p_default_role,
    v_expires_at
  );
  
  RETURN QUERY SELECT v_invite_code, v_expires_at;
END;
$$;

-- Create function to accept universal invite
CREATE OR REPLACE FUNCTION public.accept_universal_invite(
  p_invite_code TEXT,
  p_full_name TEXT,
  p_phone_number TEXT,
  p_email TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_universal_invite RECORD;
  v_user_id UUID;
  v_staff_id UUID;
BEGIN
  -- Get current user ID
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Must be logged in to accept invite');
  END IF;
  
  -- Get universal invite details
  SELECT * INTO v_universal_invite
  FROM public.universal_team_invites 
  WHERE invite_code = p_invite_code
    AND status = 'active'
    AND expires_at > now()
    AND current_uses < max_uses;

  -- Validate invite exists and is usable
  IF v_universal_invite IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Invalid or expired invite link');
  END IF;

  -- Check if user is already part of this salon
  IF EXISTS (
    SELECT 1 FROM public.salon_staff 
    WHERE salon_id = v_universal_invite.salon_id AND user_id = v_user_id
  ) THEN
    RETURN jsonb_build_object('success', false, 'message', 'You are already a member of this salon team');
  END IF;

  -- Create salon_staff record
  INSERT INTO public.salon_staff (
    salon_id,
    user_id,
    full_name,
    phone,
    email,
    role,
    status
  ) VALUES (
    v_universal_invite.salon_id,
    v_user_id,
    p_full_name,
    p_phone_number,
    p_email,
    v_universal_invite.default_role,
    'pending'
  ) RETURNING id INTO v_staff_id;

  -- Create individual team_invite record for tracking
  INSERT INTO public.team_invites (
    salon_id,
    invite_code,
    phone_number,
    role,
    accepted_by_user_id,
    accepted_at,
    status,
    invite_type,
    universal_invite_id
  ) VALUES (
    v_universal_invite.salon_id,
    p_invite_code,
    p_phone_number,
    v_universal_invite.default_role,
    v_user_id,
    now(),
    'accepted',
    'universal',
    v_universal_invite.id
  );

  -- Increment usage count
  UPDATE public.universal_team_invites 
  SET current_uses = current_uses + 1,
      updated_at = now()
  WHERE id = v_universal_invite.id;

  RETURN jsonb_build_object(
    'success', true, 
    'message', 'Successfully joined the team!',
    'salon_id', v_universal_invite.salon_id,
    'staff_id', v_staff_id
  );
END;
$$;

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_universal_invites_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_universal_invites_updated_at
  BEFORE UPDATE ON public.universal_team_invites
  FOR EACH ROW
  EXECUTE FUNCTION public.update_universal_invites_updated_at();