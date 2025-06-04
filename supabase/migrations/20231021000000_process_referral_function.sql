
-- This function processes referrals when a new user signs up using a referral code
CREATE OR REPLACE FUNCTION public.process_referral(
  referral_code TEXT,
  new_user_id UUID
)
RETURNS BOOLEAN
LANGUAGE PLPGSQL
SECURITY DEFINER
AS $$
DECLARE
    referrer_id UUID;
    credits_earned INTEGER := 10; -- 10 credits per referral
BEGIN
    SET search_path = public;
    -- Find the referrer based on the code
    SELECT id INTO referrer_id
    FROM public.users
    WHERE referral_code = referral_code;
    
    -- If no referrer found or self-referral, return false
    IF referrer_id IS NULL OR referrer_id = new_user_id THEN
        RETURN FALSE;
    END IF;
    
    -- Create referral record only if not duplicated
    INSERT INTO public.referrals (referrer_id, referred_id)
    VALUES (referrer_id, new_user_id)
    ON CONFLICT (referred_id) DO NOTHING;
    
    -- If record already existed (referral not unique), skip credit
    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;
    
    -- Update referrer's credits
    UPDATE public.users
    SET credits = COALESCE(credits, 0) + credits_earned,
        referral_count = COALESCE(referral_count, 0) + 1
    WHERE id = referrer_id;
    
    -- Create notification for the referrer (optional)
    INSERT INTO public.notifications (user_id, type, message, metadata)
    VALUES (
      referrer_id,
      'referral_success',
      'Congratulations! Someone joined EmviApp using your referral link. You earned 10 credits!',
      jsonb_build_object('credits_earned', credits_earned, 'total_referrals', (SELECT COALESCE(referral_count, 0) FROM public.users WHERE id = referrer_id))
    );
    
    -- Update referred user's record with which code was used
    UPDATE public.users
    SET referred_by = referral_code
    WHERE id = new_user_id;
    
    RETURN TRUE;
END;
$$;
