-- Fix RLS policies for bookings table to prevent permission errors

-- First, let's drop existing problematic policies
DROP POLICY IF EXISTS "Artists can view all their received bookings" ON public.bookings;
DROP POLICY IF EXISTS "Salon owners can view salon bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can create bookings as sender" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Artists can update their received bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can delete their own sent bookings" ON public.bookings;
DROP POLICY IF EXISTS "Artists can delete their received bookings" ON public.bookings;
DROP POLICY IF EXISTS "Artist can delete own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Artist can insert own bookings" ON public.bookings;

-- Create simple, working RLS policies for bookings
CREATE POLICY "Artists can view their received bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.uid() = recipient_id);

CREATE POLICY "Customers can view their sent bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.uid() = sender_id);

CREATE POLICY "Users can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Artists can update received bookings" 
ON public.bookings 
FOR UPDATE 
USING (auth.uid() = recipient_id);

CREATE POLICY "Customers can update sent bookings" 
ON public.bookings 
FOR UPDATE 
USING (auth.uid() = sender_id);

CREATE POLICY "Artists can delete received bookings" 
ON public.bookings 
FOR DELETE 
USING (auth.uid() = recipient_id);

CREATE POLICY "Customers can delete sent bookings" 
ON public.bookings 
FOR DELETE 
USING (auth.uid() = sender_id);