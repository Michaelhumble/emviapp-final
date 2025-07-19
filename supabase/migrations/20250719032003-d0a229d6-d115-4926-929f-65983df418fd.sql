-- Add missing columns to profiles table for matchmaking features
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS available_for_hire BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS looking_for_work BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS just_moved BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS moved_to_city TEXT,
ADD COLUMN IF NOT EXISTS moved_to_state TEXT,
ADD COLUMN IF NOT EXISTS moved_date TIMESTAMP WITH TIME ZONE;