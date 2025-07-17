-- Add missing fields to profiles table to match expected schema
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS specialty TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS instagram TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS portfolio_urls TEXT[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS accepts_bookings BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS manager_for_salon_id UUID;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referral_code TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS credits INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_views INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS booking_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS salon_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS professional_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS years_experience INTEGER;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS services TEXT[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gallery TEXT[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferences TEXT[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS completed_profile_tasks TEXT[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS contact_link TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS custom_role TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'en';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS invited BOOLEAN DEFAULT false;

-- Add any missing indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_location ON public.profiles (location);
CREATE INDEX IF NOT EXISTS idx_profiles_specialty ON public.profiles (specialty);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles (role);
CREATE INDEX IF NOT EXISTS idx_profiles_referral_code ON public.profiles (referral_code);
CREATE INDEX IF NOT EXISTS idx_profiles_manager_for_salon_id ON public.profiles (manager_for_salon_id);

-- Add foreign key constraint for manager_for_salon_id if salons table exists
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'salons' AND table_schema = 'public') THEN
        ALTER TABLE public.profiles ADD CONSTRAINT fk_profiles_manager_for_salon 
        FOREIGN KEY (manager_for_salon_id) REFERENCES public.salons(id) ON DELETE SET NULL;
    END IF;
END $$;