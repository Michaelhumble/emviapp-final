-- Create valuation_leads table for salon worth calculator
CREATE TABLE IF NOT EXISTS public.valuation_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  phone TEXT,
  monthly_revenue NUMERIC NOT NULL,
  number_of_stations INTEGER NOT NULL,
  zip_code TEXT NOT NULL,
  lease_length TEXT NOT NULL,
  google_rating NUMERIC,
  google_review_count INTEGER,
  calculated_value_low NUMERIC NOT NULL,
  calculated_value_high NUMERIC NOT NULL,
  calculation_breakdown JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE public.valuation_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert leads (for non-authenticated users)
CREATE POLICY "Anyone can submit valuation leads"
ON public.valuation_leads
FOR INSERT
WITH CHECK (true);

-- Policy: Users can view their own leads
CREATE POLICY "Users can view their own leads"
ON public.valuation_leads
FOR SELECT
USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- Create index for performance
CREATE INDEX idx_valuation_leads_email ON public.valuation_leads(email);
CREATE INDEX idx_valuation_leads_created_at ON public.valuation_leads(created_at DESC);