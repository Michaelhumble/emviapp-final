-- =============================================
-- PHASE 1: ENTERPRISE AFFILIATE SYSTEM
-- Top 5 Priority Fixes for Affiliate Program
-- =============================================

-- 1. AFFILIATE APPLICATIONS TABLE (Application/Approval Flow)
CREATE TABLE IF NOT EXISTS public.affiliate_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Application Data
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  website_url TEXT,
  social_media_links JSONB DEFAULT '{}',
  audience_size TEXT,
  audience_description TEXT,
  promotion_channels JSONB DEFAULT '[]',
  experience_level TEXT,
  why_join TEXT NOT NULL,
  
  -- Review Status
  status TEXT NOT NULL DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  CONSTRAINT affiliate_applications_status_check 
    CHECK (status IN ('pending', 'approved', 'rejected', 'under_review'))
);

-- Enable RLS
ALTER TABLE public.affiliate_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for applications
CREATE POLICY "Users can create their own application"
  ON public.affiliate_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own application"
  ON public.affiliate_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Index for performance
CREATE INDEX idx_affiliate_applications_user_id ON public.affiliate_applications(user_id);
CREATE INDEX idx_affiliate_applications_status ON public.affiliate_applications(status);

-- =============================================
-- 2. AFFILIATE PERFORMANCE TIERS
-- =============================================

CREATE TABLE IF NOT EXISTS public.affiliate_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  min_conversions INTEGER NOT NULL DEFAULT 0,
  commission_rate NUMERIC(5,4) NOT NULL,
  perks JSONB DEFAULT '[]',
  badge_color TEXT,
  priority_support BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Insert default tiers
INSERT INTO public.affiliate_tiers (name, min_conversions, commission_rate, badge_color, perks, priority_support)
VALUES
  ('Bronze', 0, 0.20, '#CD7F32', '["Basic analytics", "Email support"]'::jsonb, false),
  ('Silver', 10, 0.25, '#C0C0C0', '["Advanced analytics", "Priority email support", "Early feature access"]'::jsonb, false),
  ('Gold', 50, 0.30, '#FFD700', '["Premium analytics", "Dedicated support", "Custom assets", "Early feature access"]'::jsonb, true),
  ('Platinum', 200, 0.35, '#E5E4E2', '["Full analytics suite", "24/7 priority support", "Custom campaigns", "All features", "Co-marketing opportunities"]'::jsonb, true)
ON CONFLICT (name) DO NOTHING;

-- Enable RLS (read-only for all)
ALTER TABLE public.affiliate_tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view affiliate tiers"
  ON public.affiliate_tiers FOR SELECT
  TO authenticated
  USING (true);

-- =============================================
-- 3. FRAUD DETECTION SYSTEM
-- =============================================

CREATE TABLE IF NOT EXISTS public.affiliate_fraud_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID REFERENCES public.affiliate_partners(id) ON DELETE CASCADE NOT NULL,
  
  -- Fraud Detection Data
  flag_type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'low',
  description TEXT NOT NULL,
  evidence JSONB DEFAULT '{}',
  
  -- IP/Device Tracking
  ip_addresses JSONB DEFAULT '[]',
  user_agents JSONB DEFAULT '[]',
  
  -- Status
  status TEXT NOT NULL DEFAULT 'active',
  resolved_by UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolution_notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  CONSTRAINT affiliate_fraud_flags_type_check 
    CHECK (flag_type IN ('duplicate_clicks', 'self_referral', 'suspicious_pattern', 'fake_conversions', 'ip_abuse', 'bot_traffic')),
  CONSTRAINT affiliate_fraud_flags_severity_check 
    CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  CONSTRAINT affiliate_fraud_flags_status_check 
    CHECK (status IN ('active', 'investigating', 'resolved', 'false_positive'))
);

-- Enable RLS
ALTER TABLE public.affiliate_fraud_flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage fraud flags"
  ON public.affiliate_fraud_flags FOR ALL
  TO service_role
  USING (true);

-- Indexes for performance
CREATE INDEX idx_affiliate_fraud_flags_affiliate_id ON public.affiliate_fraud_flags(affiliate_id);
CREATE INDEX idx_affiliate_fraud_flags_status ON public.affiliate_fraud_flags(status);
CREATE INDEX idx_affiliate_fraud_flags_severity ON public.affiliate_fraud_flags(severity);

-- =============================================
-- 4. ONBOARDING PROGRESS TRACKING
-- =============================================

CREATE TABLE IF NOT EXISTS public.affiliate_onboarding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID REFERENCES public.affiliate_partners(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  -- Onboarding Steps
  completed_steps JSONB DEFAULT '[]',
  current_step TEXT DEFAULT 'welcome',
  progress_percentage INTEGER DEFAULT 0,
  
  -- Step Completion Tracking
  connected_stripe BOOLEAN DEFAULT false,
  created_first_link BOOLEAN DEFAULT false,
  read_guidelines BOOLEAN DEFAULT false,
  downloaded_assets BOOLEAN DEFAULT false,
  made_first_promotion BOOLEAN DEFAULT false,
  
  -- Timestamps
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  last_interaction_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.affiliate_onboarding ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Affiliates can view their own onboarding"
  ON public.affiliate_onboarding FOR SELECT
  TO authenticated
  USING (affiliate_id IN (
    SELECT id FROM public.affiliate_partners WHERE user_id = auth.uid()
  ));

CREATE POLICY "Affiliates can update their own onboarding"
  ON public.affiliate_onboarding FOR UPDATE
  TO authenticated
  USING (affiliate_id IN (
    SELECT id FROM public.affiliate_partners WHERE user_id = auth.uid()
  ));

-- Index for performance
CREATE INDEX idx_affiliate_onboarding_affiliate_id ON public.affiliate_onboarding(affiliate_id);

-- =============================================
-- 5. DEEP LINK CAMPAIGNS
-- =============================================

CREATE TABLE IF NOT EXISTS public.affiliate_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID REFERENCES public.affiliate_partners(id) ON DELETE CASCADE NOT NULL,
  
  -- Campaign Data
  campaign_name TEXT NOT NULL,
  campaign_type TEXT NOT NULL DEFAULT 'general',
  target_page TEXT,
  utm_params JSONB DEFAULT '{}',
  
  -- Deep Link Configuration
  deep_link_path TEXT NOT NULL,
  custom_slug TEXT UNIQUE,
  fallback_url TEXT,
  
  -- Performance
  clicks_count BIGINT DEFAULT 0,
  conversions_count BIGINT DEFAULT 0,
  conversion_rate NUMERIC(5,2) DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT affiliate_campaigns_type_check 
    CHECK (campaign_type IN ('general', 'seasonal', 'product_launch', 'event', 'social_media', 'email', 'content'))
);

-- Enable RLS
ALTER TABLE public.affiliate_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Affiliates can manage their own campaigns"
  ON public.affiliate_campaigns FOR ALL
  TO authenticated
  USING (affiliate_id IN (
    SELECT id FROM public.affiliate_partners WHERE user_id = auth.uid()
  ));

-- Indexes for performance
CREATE INDEX idx_affiliate_campaigns_affiliate_id ON public.affiliate_campaigns(affiliate_id);
CREATE INDEX idx_affiliate_campaigns_slug ON public.affiliate_campaigns(custom_slug) WHERE custom_slug IS NOT NULL;
CREATE INDEX idx_affiliate_campaigns_active ON public.affiliate_campaigns(is_active);

-- =============================================
-- UPDATE EXISTING AFFILIATE_PARTNERS TABLE
-- Add tier tracking and fraud score
-- =============================================

ALTER TABLE public.affiliate_partners 
  ADD COLUMN IF NOT EXISTS current_tier TEXT DEFAULT 'Bronze' REFERENCES public.affiliate_tiers(name),
  ADD COLUMN IF NOT EXISTS fraud_score INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_flagged BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS monthly_conversions INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_tier_check TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create index for tier lookups
CREATE INDEX IF NOT EXISTS idx_affiliate_partners_tier ON public.affiliate_partners(current_tier);

-- =============================================
-- FUNCTIONS FOR AUTOMATION
-- =============================================

-- Function to auto-update tier based on conversions
CREATE OR REPLACE FUNCTION public.update_affiliate_tier()
RETURNS TRIGGER AS $$
DECLARE
  new_tier TEXT;
BEGIN
  -- Calculate appropriate tier based on total conversions
  SELECT name INTO new_tier
  FROM public.affiliate_tiers
  WHERE NEW.total_conversions >= min_conversions
  ORDER BY min_conversions DESC
  LIMIT 1;
  
  IF new_tier IS NOT NULL AND new_tier != NEW.current_tier THEN
    NEW.current_tier := new_tier;
    NEW.last_tier_check := NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update tier on conversion count change
DROP TRIGGER IF EXISTS update_tier_on_conversion ON public.affiliate_partners;
CREATE TRIGGER update_tier_on_conversion
  BEFORE UPDATE OF total_conversions ON public.affiliate_partners
  FOR EACH ROW
  WHEN (OLD.total_conversions IS DISTINCT FROM NEW.total_conversions)
  EXECUTE FUNCTION public.update_affiliate_tier();

-- Function to calculate fraud score
CREATE OR REPLACE FUNCTION public.calculate_fraud_score(p_affiliate_id UUID)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
  click_to_conversion_ratio NUMERIC;
  unique_ips_count INTEGER;
BEGIN
  -- Get affiliate data
  SELECT 
    CASE 
      WHEN total_clicks > 0 THEN (total_conversions::NUMERIC / total_clicks::NUMERIC)
      ELSE 0
    END
  INTO click_to_conversion_ratio
  FROM public.affiliate_partners
  WHERE id = p_affiliate_id;
  
  -- Suspicious conversion rate (too high)
  IF click_to_conversion_ratio > 0.5 THEN
    score := score + 30;
  END IF;
  
  -- Count active fraud flags
  SELECT COUNT(*) * 20 INTO score
  FROM public.affiliate_fraud_flags
  WHERE affiliate_id = p_affiliate_id AND status = 'active';
  
  RETURN LEAST(score, 100);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- UPDATED AT TRIGGERS
-- =============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS update_affiliate_applications_updated_at ON public.affiliate_applications;
CREATE TRIGGER update_affiliate_applications_updated_at
  BEFORE UPDATE ON public.affiliate_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_affiliate_onboarding_updated_at ON public.affiliate_onboarding;
CREATE TRIGGER update_affiliate_onboarding_updated_at
  BEFORE UPDATE ON public.affiliate_onboarding
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_affiliate_campaigns_updated_at ON public.affiliate_campaigns;
CREATE TRIGGER update_affiliate_campaigns_updated_at
  BEFORE UPDATE ON public.affiliate_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();