
export interface PortfolioImage {
  id: string;
  url: string;
  title?: string;
  description?: string;
  name?: string;
  created_at?: string;
  featured?: boolean;
}

export interface ArtistProfile {
  id?: string;
  user_id?: string;
  full_name?: string;
  specialty?: string;
  bio?: string;
  location?: string;
  years_experience?: number;
  instagram?: string;
  website?: string;
  skills?: string[];
  portfolio_urls?: string[];
  avatar_url?: string;
  independent?: boolean;
  accepts_bookings?: boolean;
  rating?: number;
  credits?: number;
  profile_completion?: number;
  referral_count?: number;
  affiliate_code?: string;
  preferred_language?: string;
}

export interface ArtistStats {
  booking_count: number;
  completed_services: number;
  total_earnings: number;
  average_rating: number;
  referral_count: number;
  repeat_client_percentage: number;
  profile_views: number;
}

export interface HighlightStat {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export interface ProfileHighlightProps {
  stats: {
    rating?: number;
    clients?: number;
    completionRate?: number;
    responseTime?: string;
    repeatClients?: number;
    experience?: string | number;
  };
}
