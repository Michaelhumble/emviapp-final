
// Duplicate of the a/artist-profile/types.ts file for consistency
import { Json } from '@/integrations/supabase/types';

export interface ArtistProfileProps {
  id: string;
  username?: string;
  full_name: string;
  bio?: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
  instagram?: string;
  website?: string;
  specialty?: string;
  location?: string;
  role?: string;
  custom_role?: string;
  portfolio_urls?: string[];
  skills?: string[];
  created_at?: string;
  updated_at?: string;
  booking_url?: string;
  contact_link?: string;
  accepts_bookings?: boolean;
  badges?: any[];
  google_review_link?: string;
  boosted_until?: string | null;
  services?: any[];
  completed_profile_tasks?: string[];
  profile_views?: number;
  years_experience?: number;
  professional_name?: string;
  // Add these properties to match usage in the codebase
  title?: string;
  duration_minutes?: number;
  profile_completion?: number;
  name?: string;
}

export interface ArtistProfileData {
  loading: boolean;
  error: Error | null;
  profile: ArtistProfileProps | null;
  portfolioImages: string[];
  services: any[];
  reviews: any[];
  isOwner: boolean;
  isAuthenticated: boolean;
  isLoaded: boolean;
}

export interface Service {
  id: string;
  name: string;
  title?: string;
  description?: string;
  price: number;
  price_type?: string;
  duration?: number;
  duration_minutes?: number;
  image_url?: string;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PortfolioImage {
  id: string;
  url: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  description?: string;
  tags?: string[];
}
