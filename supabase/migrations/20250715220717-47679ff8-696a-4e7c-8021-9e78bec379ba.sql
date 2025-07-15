-- Create salon reviews table
CREATE TABLE IF NOT EXISTS public.salon_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  response_text TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  flagged BOOLEAN DEFAULT FALSE,
  flagged_reason TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'hidden', 'disputed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create salon offers table
CREATE TABLE IF NOT EXISTS public.salon_offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  discount_percent INTEGER,
  discount_amount NUMERIC,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  max_redemptions INTEGER,
  current_redemptions INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create salon credit transactions table 
CREATE TABLE IF NOT EXISTS public.salon_credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('earned', 'spent', 'bonus')),
  source TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.salon_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_credits ENABLE ROW LEVEL SECURITY;

-- RLS Policies for salon_reviews
CREATE POLICY "Salon owners can view their reviews" ON public.salon_reviews
  FOR SELECT USING (
    salon_id IN (
      SELECT id FROM public.salons WHERE owner_id = auth.uid()
      UNION
      SELECT salon_id FROM public.user_salon_access 
      WHERE user_id = auth.uid() AND access_type IN ('owner', 'manager')
    )
  );

CREATE POLICY "Customers can view their own reviews" ON public.salon_reviews
  FOR SELECT USING (customer_id = auth.uid());

CREATE POLICY "Customers can create reviews" ON public.salon_reviews
  FOR INSERT WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Salon owners can update review responses" ON public.salon_reviews
  FOR UPDATE USING (
    salon_id IN (
      SELECT id FROM public.salons WHERE owner_id = auth.uid()
      UNION
      SELECT salon_id FROM public.user_salon_access 
      WHERE user_id = auth.uid() AND access_type IN ('owner', 'manager')
    )
  );

-- RLS Policies for salon_offers
CREATE POLICY "Anyone can view active offers" ON public.salon_offers
  FOR SELECT USING (is_active = true AND end_date > NOW());

CREATE POLICY "Salon owners can manage their offers" ON public.salon_offers
  FOR ALL USING (
    salon_id IN (
      SELECT id FROM public.salons WHERE owner_id = auth.uid()
      UNION
      SELECT salon_id FROM public.user_salon_access 
      WHERE user_id = auth.uid() AND access_type IN ('owner', 'manager')
    )
  );

-- RLS Policies for salon_credits
CREATE POLICY "Salon owners can view their credits" ON public.salon_credits
  FOR SELECT USING (
    salon_id IN (
      SELECT id FROM public.salons WHERE owner_id = auth.uid()
      UNION
      SELECT salon_id FROM public.user_salon_access 
      WHERE user_id = auth.uid() AND access_type IN ('owner', 'manager')
    )
  );

CREATE POLICY "System can insert credit transactions" ON public.salon_credits
  FOR INSERT WITH CHECK (true);

-- Create functions for credit rewards
CREATE OR REPLACE FUNCTION public.award_salon_credits(
  p_salon_id UUID,
  p_amount INTEGER,
  p_source TEXT,
  p_description TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.salon_credits (
    salon_id,
    amount,
    transaction_type,
    source,
    description,
    metadata
  ) VALUES (
    p_salon_id,
    p_amount,
    'earned',
    p_source,
    p_description,
    p_metadata
  );
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$;

-- Create trigger for review credits
CREATE OR REPLACE FUNCTION public.handle_salon_review_credits()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Award 10 credits for receiving a review
  PERFORM public.award_salon_credits(
    NEW.salon_id,
    10,
    'review_received',
    'Customer review: ' || COALESCE(LEFT(NEW.review_text, 50), 'No comment') || '...',
    jsonb_build_object('review_id', NEW.id, 'rating', NEW.rating)
  );
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER salon_review_credits_trigger
  AFTER INSERT ON public.salon_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_salon_review_credits();

-- Create function to get total salon credits
CREATE OR REPLACE FUNCTION public.get_salon_credits(p_salon_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total_credits INTEGER;
BEGIN
  SELECT COALESCE(SUM(
    CASE 
      WHEN transaction_type = 'earned' OR transaction_type = 'bonus' THEN amount
      WHEN transaction_type = 'spent' THEN -amount
      ELSE 0
    END
  ), 0) INTO total_credits
  FROM public.salon_credits
  WHERE salon_id = p_salon_id;
  
  RETURN total_credits;
END;
$$;