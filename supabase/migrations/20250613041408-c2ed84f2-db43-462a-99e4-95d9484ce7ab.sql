
-- Create community_questions table for Q&A functionality
CREATE TABLE public.community_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  category TEXT,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  answered_at TIMESTAMP WITH TIME ZONE,
  answered_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on community_questions table
ALTER TABLE public.community_questions ENABLE ROW LEVEL SECURITY;

-- RLS policies for community_questions
CREATE POLICY "Anyone can view answered questions" ON public.community_questions
  FOR SELECT USING (status = 'answered');

CREATE POLICY "Users can view their own questions" ON public.community_questions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own questions" ON public.community_questions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own questions" ON public.community_questions
  FOR UPDATE USING (auth.uid() = user_id);
