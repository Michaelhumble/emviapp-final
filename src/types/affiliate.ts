export interface AffiliateStats {
  totalClicks: number;
  totalConversions: number;
  totalCommissions: number;
  conversionRate: number;
  thisMonth: {
    clicks: number;
    conversions: number;
    commissions: number;
  };
}

export interface AffiliateLink {
  id: string;
  slug: string;
  destination_url: string;
  title: string | null;
  clicks_count: number;
  conversions_count: number;
  created_at: string;
  hmac_signature: string;
}

export interface Payout {
  id: string;
  period_start: string;
  period_end: string;
  commission_amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  paid_at: string | null;
  stripe_payout_id: string | null;
  failure_reason: string | null;
}

export interface AssetItem {
  id: string;
  title: string;
  description: string;
  file_path: string;
  file_size: number;
  dimensions?: string;
  download_count: number;
}

export interface AffiliatePartner {
  id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  slug: string;
  commission_rate: number;
  total_clicks: number;
  total_conversions: number;
  total_commissions: number;
  stripe_connect_account_id: string | null;
  created_at: string;
  current_tier?: string;
  fraud_score?: number;
  is_flagged?: boolean;
  onboarding_completed?: boolean;
  monthly_conversions?: number;
}

export interface AffiliateApplication {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  website_url?: string;
  social_media_links: Record<string, string>;
  audience_size: string;
  audience_description: string;
  promotion_channels: string[];
  experience_level: string;
  why_join: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  reviewed_by?: string;
  reviewed_at?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface AffiliateTier {
  id: string;
  name: string;
  min_conversions: number;
  commission_rate: number;
  perks: string[];
  badge_color: string;
  priority_support: boolean;
  created_at: string;
}

export interface AffiliateCampaign {
  id: string;
  affiliate_id: string;
  campaign_name: string;
  campaign_type: string;
  target_page: string;
  deep_link_path: string;
  custom_slug: string;
  utm_params: Record<string, string>;
  clicks_count: number;
  conversions_count: number;
  conversion_rate: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  expires_at?: string;
}

export interface AffiliateOnboarding {
  id: string;
  affiliate_id: string;
  completed_steps: string[];
  current_step: string;
  progress_percentage: number;
  connected_stripe: boolean;
  created_first_link: boolean;
  read_guidelines: boolean;
  downloaded_assets: boolean;
  made_first_promotion: boolean;
  started_at: string;
  completed_at?: string;
  last_interaction_at: string;
}