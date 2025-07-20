-- Fix missing foreign key relationship between services and profiles
-- This will enable Supabase PostgREST to automatically join these tables

-- Add foreign key constraint for services.user_id -> profiles.id
ALTER TABLE public.services 
ADD CONSTRAINT fk_services_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Verify the relationship exists
-- (This is just for confirmation and doesn't create anything)
-- SELECT 1;