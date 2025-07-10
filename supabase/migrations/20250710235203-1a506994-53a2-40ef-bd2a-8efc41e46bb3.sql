-- Add image_url field to jobs table
ALTER TABLE public.jobs 
ADD COLUMN image_url TEXT;

-- Add index for better performance when filtering by pricing tier
CREATE INDEX IF NOT EXISTS idx_jobs_pricing_tier ON public.jobs(pricing_tier);

-- Add index for image_url queries
CREATE INDEX IF NOT EXISTS idx_jobs_image_url ON public.jobs(image_url);