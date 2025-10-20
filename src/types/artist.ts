/**
 * Artist Profile Type Definitions
 * Centralized type safety for artist profile data
 */

export interface ArtistProfile {
  id: string;
  full_name: string;
  email?: string;
  avatar_url?: string;
  location?: string;
  specialty?: string;
  rating_avg?: number;
  rating_count?: number;
  bio?: string;
  languages?: string[];
  socials?: {
    instagram?: string;
    tiktok?: string;
    facebook?: string;
  };
  phone?: string;
  years_experience?: number;
  is_verified?: boolean;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  instagram?: string;
  website?: string;
  accepts_bookings?: boolean;
  profile_completion?: number;
  skills?: string[];
  portfolio_urls?: string[];
  independent?: boolean;
  rating?: number;
  available_for_hire?: boolean;
  is_hidden?: boolean;
}

// Export compatibility types but don't replace existing ones
export interface PortfolioImage {
  id: string;
  user_id?: string;
  image_url?: string;
  url: string;
  title?: string;
  description?: string;
  order?: number;
  created_at?: string;
  featured?: boolean;
}

// Profile Highlight types
export interface HighlightStat {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

// Stats object that ProfileHighlights component expects
export interface ProfileHighlightProps {
  stats: {
    rating?: number;
    clients?: number;
    responseTime?: string;
    completionRate?: number;
    repeatClients?: number;
    experience?: string;
  };
}
