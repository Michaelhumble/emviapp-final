-- Add missing fields to jobs table for paid job functionality
ALTER TABLE public.jobs 
ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS image_urls text[],
ADD COLUMN IF NOT EXISTS photos text[];