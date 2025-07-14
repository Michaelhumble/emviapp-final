-- Create salon_photos table for photo gallery management
CREATE TABLE public.salon_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL,
  photo_url TEXT NOT NULL,
  title TEXT,
  is_primary BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create salon_team_members table
CREATE TABLE public.salon_team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  specialties TEXT[],
  status TEXT DEFAULT 'active',
  joined_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create salon_jobs table
CREATE TABLE public.salon_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  job_type TEXT NOT NULL, -- 'full-time', 'part-time', 'contract'
  location TEXT,
  requirements TEXT,
  compensation_details TEXT,
  status TEXT DEFAULT 'active',
  posted_date DATE DEFAULT CURRENT_DATE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '30 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create job_applications table
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.salon_jobs(id) ON DELETE CASCADE,
  applicant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  experience TEXT,
  cover_letter TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'reviewed', 'interview', 'rejected', 'hired'
  applied_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create salon_bookings table (enhanced appointments)
CREATE TABLE public.salon_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL,
  artist_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  service_name TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  notes TEXT,
  status TEXT DEFAULT 'confirmed', -- 'confirmed', 'completed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.salon_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_bookings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for salon_photos
CREATE POLICY "Salon owners can manage their photos"
  ON public.salon_photos
  FOR ALL
  USING (
    salon_id IN (
      SELECT id FROM salons WHERE owner_id = auth.uid()
      UNION
      SELECT salon_id FROM user_salon_access 
      WHERE user_id = auth.uid() AND access_type IN ('owner', 'manager')
    )
  );

CREATE POLICY "Anyone can view salon photos"
  ON public.salon_photos
  FOR SELECT
  USING (true);

-- Create RLS policies for salon_team_members
CREATE POLICY "Salon owners can manage team members"
  ON public.salon_team_members
  FOR ALL
  USING (
    salon_id IN (
      SELECT id FROM salons WHERE owner_id = auth.uid()
      UNION
      SELECT salon_id FROM user_salon_access 
      WHERE user_id = auth.uid() AND access_type IN ('owner', 'manager')
    )
  );

CREATE POLICY "Team members can view their own data"
  ON public.salon_team_members
  FOR SELECT
  USING (user_id = auth.uid() OR salon_id IN (
    SELECT salon_id FROM user_salon_access WHERE user_id = auth.uid()
  ));

-- Create RLS policies for salon_jobs
CREATE POLICY "Salon owners can manage jobs"
  ON public.salon_jobs
  FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Anyone can view active jobs"
  ON public.salon_jobs
  FOR SELECT
  USING (status = 'active');

-- Create RLS policies for job_applications
CREATE POLICY "Job posters can view applications"
  ON public.job_applications
  FOR SELECT
  USING (
    job_id IN (
      SELECT id FROM salon_jobs WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Applicants can create applications"
  ON public.job_applications
  FOR INSERT
  WITH CHECK (applicant_id = auth.uid());

CREATE POLICY "Applicants can view their own applications"
  ON public.job_applications
  FOR SELECT
  USING (applicant_id = auth.uid());

-- Create RLS policies for salon_bookings
CREATE POLICY "Salon owners can manage bookings"
  ON public.salon_bookings
  FOR ALL
  USING (
    salon_id IN (
      SELECT id FROM salons WHERE owner_id = auth.uid()
      UNION
      SELECT salon_id FROM user_salon_access 
      WHERE user_id = auth.uid() AND access_type IN ('owner', 'manager')
    )
  );

CREATE POLICY "Artists can view their bookings"
  ON public.salon_bookings
  FOR SELECT
  USING (artist_id = auth.uid());

-- Create triggers for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_salon_photos_updated_at
  BEFORE UPDATE ON salon_photos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_salon_team_members_updated_at
  BEFORE UPDATE ON salon_team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_salon_jobs_updated_at
  BEFORE UPDATE ON salon_jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_salon_bookings_updated_at
  BEFORE UPDATE ON salon_bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();