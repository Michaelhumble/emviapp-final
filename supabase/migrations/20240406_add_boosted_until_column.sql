
-- Add boosted_until column to users table if it doesn't exist
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS boosted_until TIMESTAMP WITH TIME ZONE DEFAULT NULL;

