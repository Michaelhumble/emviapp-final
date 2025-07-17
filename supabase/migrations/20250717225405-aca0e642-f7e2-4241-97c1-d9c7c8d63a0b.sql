-- Add missing credits column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS credits integer DEFAULT 0;