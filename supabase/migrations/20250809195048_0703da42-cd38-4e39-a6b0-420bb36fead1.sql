-- Add seed_tag column to mark demo data for safe cleanup
-- These are nullable and non-intrusive; safe for production with no behavior change
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS seed_tag text;
ALTER TABLE public.artist_for_hire_profiles ADD COLUMN IF NOT EXISTS seed_tag text;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS seed_tag text;

-- Optional: lightweight indexes to speed up cleanup queries
CREATE INDEX IF NOT EXISTS idx_jobs_seed_tag ON public.jobs (seed_tag);
CREATE INDEX IF NOT EXISTS idx_artist_for_hire_profiles_seed_tag ON public.artist_for_hire_profiles (seed_tag);
CREATE INDEX IF NOT EXISTS idx_salon_sales_seed_tag ON public.salon_sales (seed_tag);
