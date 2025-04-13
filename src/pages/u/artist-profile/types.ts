
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
