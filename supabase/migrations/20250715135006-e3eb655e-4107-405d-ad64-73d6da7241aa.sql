-- Create challenges table
CREATE TABLE public.challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'Beginner',
  prize TEXT,
  emoji TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  participant_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create challenge_entries table for user submissions
CREATE TABLE public.challenge_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  votes_count INTEGER DEFAULT 0,
  is_winner BOOLEAN DEFAULT false,
  UNIQUE(challenge_id, user_id)
);

-- Create challenge_votes table for voting system
CREATE TABLE public.challenge_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  entry_id UUID NOT NULL REFERENCES public.challenge_entries(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(entry_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_votes ENABLE ROW LEVEL SECURITY;

-- RLS policies for challenges
CREATE POLICY "Anyone can view active challenges" ON public.challenges
  FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage challenges" ON public.challenges
  FOR ALL USING (auth.uid() = created_by);

-- RLS policies for challenge_entries
CREATE POLICY "Anyone can view challenge entries" ON public.challenge_entries
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own entries" ON public.challenge_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own entries" ON public.challenge_entries
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for challenge_votes
CREATE POLICY "Anyone can view challenge votes" ON public.challenge_votes
  FOR SELECT USING (true);

CREATE POLICY "Users can create votes" ON public.challenge_votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes" ON public.challenge_votes
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to update participant count
CREATE OR REPLACE FUNCTION update_challenge_participant_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.challenges 
    SET participant_count = participant_count + 1 
    WHERE id = NEW.challenge_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.challenges 
    SET participant_count = GREATEST(participant_count - 1, 0) 
    WHERE id = OLD.challenge_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create function to update votes count
CREATE OR REPLACE FUNCTION update_entry_votes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.challenge_entries 
    SET votes_count = votes_count + 1 
    WHERE id = NEW.entry_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.challenge_entries 
    SET votes_count = GREATEST(votes_count - 1, 0) 
    WHERE id = OLD.entry_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER challenge_entries_count_trigger
  AFTER INSERT OR DELETE ON public.challenge_entries
  FOR EACH ROW EXECUTE FUNCTION update_challenge_participant_count();

CREATE TRIGGER challenge_votes_count_trigger
  AFTER INSERT OR DELETE ON public.challenge_votes
  FOR EACH ROW EXECUTE FUNCTION update_entry_votes_count();

-- Insert sample challenge
INSERT INTO public.challenges (
  title,
  description,
  category,
  difficulty,
  prize,
  emoji,
  end_date
) VALUES (
  'Winter Nail Art Challenge',
  'Create stunning winter-themed nail designs and share your creativity!',
  'Nails',
  'Intermediate',
  '$500 + Feature',
  '❄️💅',
  now() + interval '7 days'
);