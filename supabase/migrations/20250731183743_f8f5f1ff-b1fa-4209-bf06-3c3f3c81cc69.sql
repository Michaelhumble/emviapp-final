-- Create saved_articles table for user bookmarks
CREATE TABLE IF NOT EXISTS public.saved_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  article_slug TEXT NOT NULL,
  article_title TEXT NOT NULL,
  article_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, article_slug)
);

-- Enable Row Level Security
ALTER TABLE public.saved_articles ENABLE ROW LEVEL SECURITY;

-- Create policies for saved articles
CREATE POLICY "Users can view their own saved articles" 
ON public.saved_articles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can save articles" 
ON public.saved_articles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their saved articles" 
ON public.saved_articles 
FOR DELETE 
USING (auth.uid() = user_id);