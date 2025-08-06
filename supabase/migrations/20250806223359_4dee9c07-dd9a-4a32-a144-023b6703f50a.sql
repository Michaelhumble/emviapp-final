-- Fix RLS policies for bookings table to allow artists to see customer info and receive bookings

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Artist can select own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Artist can update own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can view their own sent or received bookings" ON public.bookings;

-- Create new comprehensive policies for artists
CREATE POLICY "Artists can view all their received bookings" ON public.bookings
  FOR SELECT 
  USING (auth.uid() = recipient_id);

CREATE POLICY "Artists can update their received bookings" ON public.bookings
  FOR UPDATE 
  USING (auth.uid() = recipient_id);

CREATE POLICY "Artists can delete their received bookings" ON public.bookings
  FOR DELETE 
  USING (auth.uid() = recipient_id);

-- Allow artists to see customer information through get_customer_info function
CREATE OR REPLACE FUNCTION public.get_customer_booking_info(booking_id uuid)
RETURNS TABLE(customer_name text, customer_email text, customer_phone text, customer_avatar text)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Verify the requesting user is the recipient of this booking
  IF NOT EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE id = booking_id AND recipient_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to booking information';
  END IF;
  
  RETURN QUERY
  SELECT 
    COALESCE(b.client_name, p.full_name, au.email) as customer_name,
    au.email as customer_email,
    p.phone as customer_phone,
    p.avatar_url as customer_avatar
  FROM public.bookings b
  LEFT JOIN auth.users au ON au.id = b.sender_id
  LEFT JOIN public.profiles p ON p.id = b.sender_id
  WHERE b.id = booking_id;
END;
$$;