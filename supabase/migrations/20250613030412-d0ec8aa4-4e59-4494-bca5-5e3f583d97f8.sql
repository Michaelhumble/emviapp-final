
-- Create contests table
CREATE TABLE public.contests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  max_entries INTEGER DEFAULT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contest entries table
CREATE TABLE public.contest_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contest_id UUID REFERENCES public.contests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  entry_data JSONB DEFAULT '{}',
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(contest_id, user_id)
);

-- Create votes table
CREATE TABLE public.votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  target_id UUID NOT NULL,
  target_type TEXT NOT NULL,
  vote_type TEXT NOT NULL DEFAULT 'upvote',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, target_id, target_type)
);

-- Create waitlists table
CREATE TABLE public.waitlists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  waitlist_type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active',
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, waitlist_type)
);

-- Create applications table
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  application_type TEXT NOT NULL,
  target_id UUID,
  application_data JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create community story images storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('community-images', 'community-images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on all tables
ALTER TABLE public.contests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contest_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- RLS policies for contests (public read)
CREATE POLICY "Anyone can view active contests" ON public.contests
  FOR SELECT USING (status = 'active');

-- RLS policies for contest entries
CREATE POLICY "Users can view their own contest entries" ON public.contest_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own contest entries" ON public.contest_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS policies for votes
CREATE POLICY "Users can view all votes" ON public.votes
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own votes" ON public.votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes" ON public.votes
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for waitlists  
CREATE POLICY "Users can view their own waitlist entries" ON public.waitlists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own waitlist entries" ON public.waitlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS policies for applications
CREATE POLICY "Users can view their own applications" ON public.applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications" ON public.applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Storage policies for community images
CREATE POLICY "Anyone can view community images" ON storage.objects
  FOR SELECT USING (bucket_id = 'community-images');

CREATE POLICY "Authenticated users can upload community images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'community-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own community images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'community-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own community images" ON storage.objects
  FOR DELETE USING (bucket_id = 'community-images' AND auth.uid()::text = (storage.foldername(name))[1]);
