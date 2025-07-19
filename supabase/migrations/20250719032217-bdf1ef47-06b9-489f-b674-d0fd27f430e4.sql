-- Create artist_for_hire_profiles table for dedicated artist for-hire data
CREATE TABLE public.artist_for_hire_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  hourly_rate TEXT,
  location TEXT,
  years_experience TEXT, 
  specialties TEXT,
  headline TEXT,
  bio TEXT,
  avatar_url TEXT,
  available_for_work BOOLEAN DEFAULT true,
  shifts_available TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.artist_for_hire_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Artists can view their own for-hire profile"
ON public.artist_for_hire_profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Artists can create their own for-hire profile"
ON public.artist_for_hire_profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Artists can update their own for-hire profile"
ON public.artist_for_hire_profiles
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Artists can delete their own for-hire profile"
ON public.artist_for_hire_profiles
FOR DELETE
USING (auth.uid() = user_id);

-- Anyone can view artist for-hire profiles (for marketplace)
CREATE POLICY "Anyone can view artist for-hire profiles"
ON public.artist_for_hire_profiles
FOR SELECT
USING (available_for_work = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_artist_for_hire_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_artist_for_hire_updated_at
BEFORE UPDATE ON public.artist_for_hire_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_artist_for_hire_updated_at();