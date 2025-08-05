-- Fix user_sessions table schema to match edge function expectations
DROP TABLE IF EXISTS public.user_sessions;

CREATE TABLE public.user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  language TEXT DEFAULT 'en',
  last_question TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can manage their own sessions" 
ON public.user_sessions 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert sessions" 
ON public.user_sessions 
FOR INSERT 
WITH CHECK (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_sessions_updated_at
    BEFORE UPDATE ON public.user_sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();