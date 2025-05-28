
-- Create salon_listings table for draft/live functionality
CREATE TABLE IF NOT EXISTS public.salon_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  salon_name TEXT NOT NULL,
  business_type TEXT DEFAULT 'Nail Salon',
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT,
  asking_price TEXT,
  monthly_rent TEXT,
  description_vietnamese TEXT,
  description_english TEXT,
  is_live BOOLEAN NOT NULL DEFAULT false, -- CRITICAL: Listings start as drafts
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  stripe_session_id TEXT,
  payment_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.salon_listings ENABLE ROW LEVEL SECURITY;

-- Users can only see their own listings
CREATE POLICY "Users can view their own listings" ON public.salon_listings
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only create their own listings (but only as drafts)
CREATE POLICY "Users can create draft listings" ON public.salon_listings
  FOR INSERT WITH CHECK (auth.uid() = user_id AND is_live = false);

-- Users can update their own draft listings only
CREATE POLICY "Users can update their draft listings" ON public.salon_listings
  FOR UPDATE USING (auth.uid() = user_id AND is_live = false);

-- CRITICAL: Only service role can set is_live = true
-- No user can ever set is_live = true through RLS
CREATE POLICY "Only backend can publish listings" ON public.salon_listings
  FOR UPDATE USING (false) -- This prevents any user updates to live listings
  WITH CHECK (false); -- This prevents any user from setting is_live = true
