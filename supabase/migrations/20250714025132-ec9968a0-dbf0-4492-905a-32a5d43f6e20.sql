-- Add missing salon_name column to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS salon_name TEXT;