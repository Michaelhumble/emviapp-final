
-- Add salonName column to jobs table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'jobs'
    AND column_name = 'salonName'
  ) THEN
    ALTER TABLE public.jobs ADD COLUMN "salonName" TEXT;
  END IF;
END$$;

-- Update existing jobs with a default salon name if missing
UPDATE public.jobs
SET "salonName" = 'Unknown Salon'
WHERE "salonName" IS NULL;

-- Add comment to explain the column
COMMENT ON COLUMN public.jobs."salonName" IS 'The name of the salon that posted the job';
