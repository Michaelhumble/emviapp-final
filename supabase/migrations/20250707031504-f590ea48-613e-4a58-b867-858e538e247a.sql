
-- Emergency fix: Drop and recreate jobs table with correct schema
DROP TABLE IF EXISTS public.jobs CASCADE;

-- Create jobs table with exact schema needed
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  description TEXT,
  user_id UUID NOT NULL, -- Make this NOT NULL to enforce proper RLS
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '30 days'),
  pricing_tier TEXT DEFAULT 'free',
  compensation_type TEXT,
  compensation_details TEXT,
  requirements TEXT,
  contact_info JSONB DEFAULT '{}'::jsonb
);

-- NO RLS for now - we'll test basic functionality first
-- ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON public.jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON public.jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON public.jobs(created_at DESC);

-- Insert a test job to verify table works
INSERT INTO public.jobs (
  title,
  category,
  location,
  description,
  user_id,
  status,
  pricing_tier
) VALUES (
  'TEST JOB - Emergency Fix',
  'Test Category',
  'Test Location',
  'This is a test job to verify the table is working',
  '00000000-0000-0000-0000-000000000000', -- placeholder UUID
  'active',
  'free'
);
