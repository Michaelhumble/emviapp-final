-- Create credits ledger table for tracking all credit transactions
CREATE TABLE public.credits_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL, -- 'earn', 'spend', 'admin_adjust'
  credits_amount INTEGER NOT NULL, -- positive for earn, negative for spend
  reason TEXT NOT NULL, -- 'share', 'invite', 'booking', 'review', 'profile_complete', etc.
  metadata JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  referral_code TEXT,
  admin_user_id UUID REFERENCES auth.users(id),
  admin_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user unlocks table for tracking level unlocks
CREATE TABLE public.user_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  unlock_type TEXT NOT NULL, -- 'level', 'feature', 'badge'
  unlock_value TEXT NOT NULL, -- 'level_1', 'level_2', etc.
  credits_required INTEGER NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  UNIQUE(user_id, unlock_type, unlock_value)
);

-- Create admin actions table for audit logging
CREATE TABLE public.admin_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID NOT NULL REFERENCES auth.users(id),
  target_user_id UUID REFERENCES auth.users(id),
  action_type TEXT NOT NULL, -- 'credit_adjust', 'unlock_restore', 'flag_user'
  details JSONB NOT NULL,
  reason TEXT NOT NULL,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.credits_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_unlocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for credits_ledger
CREATE POLICY "Users can view their own credit history"
  ON public.credits_ledger FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert credit transactions"
  ON public.credits_ledger FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

-- RLS Policies for user_unlocks
CREATE POLICY "Users can view their own unlocks"
  ON public.user_unlocks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert unlocks"
  ON public.user_unlocks FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

-- RLS Policies for admin_actions (admin only)
CREATE POLICY "Admins can view admin actions"
  ON public.admin_actions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can insert admin actions"
  ON public.admin_actions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create functions for credit management
CREATE OR REPLACE FUNCTION public.get_user_credits(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total_credits INTEGER;
BEGIN
  SELECT COALESCE(SUM(credits_amount), 0) INTO total_credits
  FROM public.credits_ledger
  WHERE user_id = p_user_id;
  
  RETURN total_credits;
END;
$$;

CREATE OR REPLACE FUNCTION public.award_credits(
  p_user_id UUID,
  p_credits INTEGER,
  p_reason TEXT,
  p_metadata JSONB DEFAULT '{}',
  p_ip_address TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_referral_code TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert credit transaction
  INSERT INTO public.credits_ledger (
    user_id, action_type, credits_amount, reason, metadata,
    ip_address, user_agent, referral_code
  ) VALUES (
    p_user_id, 'earn', p_credits, p_reason, p_metadata,
    p_ip_address, p_user_agent, p_referral_code
  );
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$;

CREATE OR REPLACE FUNCTION public.spend_credits(
  p_user_id UUID,
  p_credits INTEGER,
  p_reason TEXT,
  p_metadata JSONB DEFAULT '{}'
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  -- Check if user has enough credits
  SELECT public.get_user_credits(p_user_id) INTO current_credits;
  
  IF current_credits < p_credits THEN
    RETURN FALSE;
  END IF;
  
  -- Insert spend transaction
  INSERT INTO public.credits_ledger (
    user_id, action_type, credits_amount, reason, metadata
  ) VALUES (
    p_user_id, 'spend', -p_credits, p_reason, p_metadata
  );
  
  RETURN TRUE;
END;
$$;

CREATE OR REPLACE FUNCTION public.unlock_level(
  p_user_id UUID,
  p_level INTEGER,
  p_credits_required INTEGER,
  p_ip_address TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_credits INTEGER;
  unlock_key TEXT;
BEGIN
  unlock_key := 'level_' || p_level;
  
  -- Check if already unlocked
  IF EXISTS (
    SELECT 1 FROM public.user_unlocks 
    WHERE user_id = p_user_id AND unlock_type = 'level' AND unlock_value = unlock_key
  ) THEN
    RETURN FALSE;
  END IF;
  
  -- Check credits
  SELECT public.get_user_credits(p_user_id) INTO current_credits;
  IF current_credits < p_credits_required THEN
    RETURN FALSE;
  END IF;
  
  -- Spend credits
  IF NOT public.spend_credits(p_user_id, p_credits_required, 'level_unlock', 
    jsonb_build_object('level', p_level)) THEN
    RETURN FALSE;
  END IF;
  
  -- Insert unlock
  INSERT INTO public.user_unlocks (
    user_id, unlock_type, unlock_value, credits_required,
    ip_address, user_agent, metadata
  ) VALUES (
    p_user_id, 'level', unlock_key, p_credits_required,
    p_ip_address, p_user_agent, jsonb_build_object('level', p_level)
  );
  
  RETURN TRUE;
END;
$$;

-- Create indexes for performance
CREATE INDEX idx_credits_ledger_user_id ON public.credits_ledger(user_id);
CREATE INDEX idx_credits_ledger_created_at ON public.credits_ledger(created_at);
CREATE INDEX idx_user_unlocks_user_id ON public.user_unlocks(user_id);
CREATE INDEX idx_admin_actions_admin_user_id ON public.admin_actions(admin_user_id);