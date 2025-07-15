-- Create reviews table for customers
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  booking_id UUID,
  target_id UUID NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('artist', 'salon')),
  stars INTEGER NOT NULL CHECK (stars >= 1 AND stars <= 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for reviews
CREATE POLICY "Users can view all reviews" 
ON public.reviews 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own reviews" 
ON public.reviews 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" 
ON public.reviews 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" 
ON public.reviews 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to award credits for reviews
CREATE OR REPLACE FUNCTION public.handle_review_credits()
RETURNS TRIGGER AS $$
BEGIN
  SET search_path = public;
  -- Award 20 credits for writing a review
  PERFORM public.award_credits(
    NEW.user_id, 
    20, 
    'review_submission',
    jsonb_build_object(
      'review_id', NEW.id,
      'target_type', NEW.target_type,
      'target_id', NEW.target_id,
      'stars', NEW.stars
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for review credits
CREATE TRIGGER handle_review_credits_trigger
AFTER INSERT ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.handle_review_credits();

-- Create index for better performance
CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX idx_reviews_target ON public.reviews(target_id, target_type);
CREATE INDEX idx_reviews_booking_id ON public.reviews(booking_id);
CREATE INDEX idx_reviews_created_at ON public.reviews(created_at DESC);