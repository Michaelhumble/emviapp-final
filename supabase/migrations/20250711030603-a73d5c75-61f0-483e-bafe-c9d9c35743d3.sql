-- Add Vietnamese language support columns to jobs table
ALTER TABLE public.jobs 
ADD COLUMN vietnamese_title TEXT,
ADD COLUMN vietnamese_description TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.jobs.vietnamese_title IS 'Vietnamese translation of job title';
COMMENT ON COLUMN public.jobs.vietnamese_description IS 'Vietnamese translation of job description';