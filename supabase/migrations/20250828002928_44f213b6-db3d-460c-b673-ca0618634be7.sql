-- Add booking management fields to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS cancellation_reason TEXT,
ADD COLUMN IF NOT EXISTS rescheduled_from_id UUID REFERENCES public.bookings(id),
ADD COLUMN IF NOT EXISTS managed_by TEXT DEFAULT 'customer' CHECK (managed_by IN ('customer', 'artist', 'admin')),
ADD COLUMN IF NOT EXISTS ics_sequence INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS manage_token_hash TEXT,
ADD COLUMN IF NOT EXISTS manage_token_expires_at TIMESTAMP WITH TIME ZONE;

-- Create index for manage token lookups
CREATE INDEX IF NOT EXISTS idx_bookings_manage_token_hash ON public.bookings(manage_token_hash);

-- Create function to generate secure manage tokens
CREATE OR REPLACE FUNCTION public.generate_manage_token(p_booking_id UUID, p_email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  token_payload TEXT;
  token_hash TEXT;
  expires_at TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Generate token payload and hash
  expires_at := NOW() + INTERVAL '7 days';
  token_payload := encode(digest(p_booking_id::text || p_email || expires_at::text || gen_random_uuid()::text, 'sha256'), 'hex');
  token_hash := encode(digest(token_payload, 'sha256'), 'hex');
  
  -- Store hash and expiry in booking record
  UPDATE public.bookings 
  SET manage_token_hash = token_hash,
      manage_token_expires_at = expires_at
  WHERE id = p_booking_id;
  
  RETURN token_payload;
END;
$$;

-- Function to verify manage token
CREATE OR REPLACE FUNCTION public.verify_manage_token(p_token TEXT, p_booking_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stored_hash TEXT;
  token_hash TEXT;
  expires_at TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Get stored hash and expiry
  SELECT manage_token_hash, manage_token_expires_at 
  INTO stored_hash, expires_at
  FROM public.bookings 
  WHERE id = p_booking_id;
  
  -- Check if token exists and hasn't expired
  IF stored_hash IS NULL OR expires_at < NOW() THEN
    RETURN FALSE;
  END IF;
  
  -- Hash the provided token and compare
  token_hash := encode(digest(p_token, 'sha256'), 'hex');
  
  RETURN token_hash = stored_hash;
END;
$$;