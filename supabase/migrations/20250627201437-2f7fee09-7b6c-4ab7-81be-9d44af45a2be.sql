
-- Add category column to jobs table
ALTER TABLE public.jobs ADD COLUMN category text;

-- Update existing jobs to have a default category so they don't break
UPDATE public.jobs SET category = 'Other' WHERE category IS NULL;

-- Make category required for future jobs
ALTER TABLE public.jobs ALTER COLUMN category SET NOT NULL;
