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
}