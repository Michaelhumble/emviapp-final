-- Create pending_salons table to store form data before payment
CREATE TABLE public.pending_salons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  salon_name TEXT NOT NULL,
  business_type TEXT,
  established_year TEXT,
  address TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT,
  neighborhood TEXT,
  hide_exact_address BOOLEAN DEFAULT false,
  asking_price NUMERIC NOT NULL,
  monthly_rent NUMERIC,
  monthly_revenue TEXT,
  monthly_profit TEXT,
  number_of_staff TEXT,
  number_of_tables TEXT,
  number_of_chairs TEXT,
  square_feet TEXT,
  vietnamese_description TEXT,
  english_description TEXT,
  description_combined TEXT NOT NULL,
  reason_for_selling TEXT,
  virtual_tour_url TEXT,
  other_notes TEXT,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contact_facebook TEXT,
  contact_zalo TEXT,
  contact_notes TEXT,
  will_train BOOLEAN DEFAULT false,
  has_housing BOOLEAN DEFAULT false,
  has_wax_room BOOLEAN DEFAULT false,
  has_dining_room BOOLEAN DEFAULT false,
  has_laundry BOOLEAN DEFAULT false,
  has_parking BOOLEAN DEFAULT false,
  equipment_included BOOLEAN DEFAULT false,
  lease_transferable BOOLEAN DEFAULT false,
  seller_financing BOOLEAN DEFAULT false,
  help_with_transition BOOLEAN DEFAULT false,
  selected_pricing_tier TEXT NOT NULL,
  featured_addon BOOLEAN DEFAULT false,
  images TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending',
  stripe_session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pending_salons ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can create their own pending salons" 
ON public.pending_salons FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own pending salons" 
ON public.pending_salons FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Edge functions can update pending salons" 
ON public.pending_salons FOR UPDATE 
USING (true);

-- Create index for efficient lookups
CREATE INDEX idx_pending_salons_stripe_session ON public.pending_salons(stripe_session_id);
CREATE INDEX idx_pending_salons_user_status ON public.pending_salons(user_id, status);