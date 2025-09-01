-- Create affiliate program database schema
-- All tables use UUID primary keys and proper RLS policies

-- 1. Affiliate partners table (approved affiliates)
CREATE TABLE public.affiliate_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL, -- for /l/:slug links
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'suspended', 'rejected')),
  commission_rate DECIMAL DEFAULT 0.30, -- 30% default rate
  total_clicks BIGINT DEFAULT 0,
  total_conversions BIGINT DEFAULT 0,
  total_commissions DECIMAL DEFAULT 0,
  stripe_connect_account_id TEXT, -- for payouts
  created_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_affiliate UNIQUE(user_id)
);

-- 2. Short links table
CREATE TABLE public.affiliate_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID REFERENCES public.affiliate_partners(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  destination_url TEXT NOT NULL,
  title TEXT,
  clicks_count BIGINT DEFAULT 0,
  conversions_count BIGINT DEFAULT 0,
  hmac_signature TEXT NOT NULL, -- Prevents slug tampering
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Click tracking table
CREATE TABLE public.affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID REFERENCES public.affiliate_partners(id) ON DELETE CASCADE,
  link_id UUID REFERENCES public.affiliate_links(id) ON DELETE SET NULL,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Null for anonymous clicks
  country_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Conversion events table
CREATE TABLE public.affiliate_conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID REFERENCES public.affiliate_partners(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('signup', 'first_payment', 'recurring_payment', 'refund', 'chargeback')),
  revenue_amount DECIMAL DEFAULT 0,
  commission_amount DECIMAL DEFAULT 0,
  stripe_session_id TEXT,
  stripe_customer_id TEXT,
  metadata JSONB DEFAULT '{}',
  attributed_click_id UUID REFERENCES public.affiliate_clicks(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Payout records table
CREATE TABLE public.affiliate_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID REFERENCES public.affiliate_partners(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  commission_amount DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'paid', 'failed', 'cancelled')),
  stripe_payout_id TEXT,
  failure_reason TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_payout_period UNIQUE(affiliate_id, period_start, period_end)
);

-- Performance indexes
CREATE INDEX idx_affiliate_partners_slug ON public.affiliate_partners(slug);
CREATE INDEX idx_affiliate_partners_user_id ON public.affiliate_partners(user_id);
CREATE INDEX idx_affiliate_links_slug ON public.affiliate_links(slug);
CREATE INDEX idx_affiliate_links_affiliate_id ON public.affiliate_links(affiliate_id);
CREATE INDEX idx_affiliate_clicks_affiliate_created ON public.affiliate_clicks(affiliate_id, created_at);
CREATE INDEX idx_affiliate_clicks_ip_created ON public.affiliate_clicks(ip_address, created_at);
CREATE INDEX idx_affiliate_conversions_affiliate_created ON public.affiliate_conversions(affiliate_id, created_at);
CREATE INDEX idx_affiliate_conversions_stripe_session ON public.affiliate_conversions(stripe_session_id);
CREATE INDEX idx_affiliate_payouts_affiliate_period ON public.affiliate_payouts(affiliate_id, period_start, period_end);

-- Enable RLS on all tables
ALTER TABLE public.affiliate_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_payouts ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Affiliates can only see their own data

-- affiliate_partners policies
CREATE POLICY "Affiliates can view their own profile" ON public.affiliate_partners
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Affiliates can update their own profile" ON public.affiliate_partners
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Anyone can view approved affiliate slugs for validation" ON public.affiliate_partners
  FOR SELECT USING (status = 'approved' AND slug IS NOT NULL);

-- affiliate_links policies  
CREATE POLICY "Affiliates can manage their own links" ON public.affiliate_links
  FOR ALL USING (affiliate_id IN (SELECT id FROM public.affiliate_partners WHERE user_id = auth.uid()));

-- affiliate_clicks policies
CREATE POLICY "Affiliates can view their clicks" ON public.affiliate_clicks
  FOR SELECT USING (affiliate_id IN (SELECT id FROM public.affiliate_partners WHERE user_id = auth.uid()));

CREATE POLICY "System can insert click events" ON public.affiliate_clicks
  FOR INSERT WITH CHECK (true);

-- affiliate_conversions policies
CREATE POLICY "Affiliates can view their conversions" ON public.affiliate_conversions
  FOR SELECT USING (affiliate_id IN (SELECT id FROM public.affiliate_partners WHERE user_id = auth.uid()));

CREATE POLICY "System can insert conversion events" ON public.affiliate_conversions
  FOR INSERT WITH CHECK (true);

-- affiliate_payouts policies
CREATE POLICY "Affiliates can view their payouts" ON public.affiliate_payouts
  FOR SELECT USING (affiliate_id IN (SELECT id FROM public.affiliate_partners WHERE user_id = auth.uid()));

CREATE POLICY "System can manage payouts" ON public.affiliate_payouts
  FOR ALL WITH CHECK (true);

-- Trigger to update affiliate_partners.updated_at
CREATE OR REPLACE FUNCTION public.update_affiliate_partners_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_affiliate_partners_updated_at
  BEFORE UPDATE ON public.affiliate_partners
  FOR EACH ROW
  EXECUTE FUNCTION public.update_affiliate_partners_updated_at();

-- Trigger to update affiliate_links.updated_at
CREATE OR REPLACE FUNCTION public.update_affiliate_links_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_affiliate_links_updated_at
  BEFORE UPDATE ON public.affiliate_links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_affiliate_links_updated_at();

-- Function to generate unique affiliate slug
CREATE OR REPLACE FUNCTION public.generate_affiliate_slug(base_name TEXT)
RETURNS TEXT AS $$
DECLARE
  slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Clean base name: lowercase, replace spaces with hyphens, remove special chars
  slug := lower(regexp_replace(base_name, '[^a-zA-Z0-9\s-]', '', 'g'));
  slug := regexp_replace(slug, '\s+', '-', 'g');
  slug := trim(slug, '-');
  
  -- Ensure minimum length
  IF length(slug) < 3 THEN
    slug := slug || '-affiliate';
  END IF;
  
  -- Check uniqueness and add counter if needed
  WHILE EXISTS (SELECT 1 FROM public.affiliate_partners WHERE affiliate_partners.slug = slug) LOOP
    counter := counter + 1;
    slug := regexp_replace(slug, '-\d+$', '') || '-' || counter;
  END LOOP;
  
  RETURN slug;
END;
$$ LANGUAGE plpgsql;