
// Adding missing properties to the existing types

export interface Booking {
  id: string;
  sender_id: string;
  recipient_id: string;
  service_id?: string;
  service_name?: string;
  date_requested: string;
  time_requested: string;
  status: string;
  note?: string;
  customer_name?: string;
  artist_name?: string;
  created_at?: string;
  reminder_sent?: boolean;
  reminder_sent_at?: string;
}

export interface BookingStats {
  total: number;
  pending: number;
  accepted: number;
  declined: number;
  completed: number;
}

export interface ArtistDashboardData {
  total_bookings: number;
  pending_bookings: number;
  accepted_bookings: number;
  declined_bookings: number;
  completed_bookings: number;
  total_earnings: number;
  average_rating: number;
  total_reviews: number;
}

// Modified BookingCounts interface to include all required fields
export interface BookingCounts {
  total?: number;
  pending: number;
  accepted?: number;
  declined?: number;
  completed?: number;
  upcoming: number;
}

// Updated PortfolioImage interface to make name property required
export interface PortfolioImage {
  id: string;
  url: string;
  thumbnail_url?: string;
  alt_text?: string;
  created_at?: string;
  name: string; // Making this required to fix the error
}

// Updated ArtistDataContextType interface to match what's being used in the components
export interface ArtistDataContextType {
  artistProfile: ArtistProfileState | null;
  loading: boolean;
  error: Error | null;
  refreshProfile: () => void;
  // Add additional properties used in components
  handleCopyReferralLink?: () => void;
  copied?: boolean;
  firstName?: string;
  userCredits?: number;
  refreshArtistProfile: () => Promise<void>; // Added this required property
  portfolioImages: PortfolioImage[];
  loadingPortfolio: boolean;
}

// Updated ArtistProfileState interface to include all used properties
export interface ArtistProfileState {
  id: string;
  user_id: string;
  full_name: string;
  professional_name?: string;
  bio?: string;
  specialty?: string;
  years_experience?: number;
  portfolio_images: PortfolioImage[];
  rating?: number;
  total_reviews?: number;
  location?: string;
  is_available?: boolean;
  // Add properties used in components
  portfolio_urls?: string[];
  preferred_language?: string;
  accepts_bookings?: boolean;
  preferences?: string[];
  credits?: number;
  affiliate_code?: string;
  referral_count?: number;
  profile_views?: number;
  years_of_experience?: number;
  number_of_stations?: number;
}

// Updating DaySchedule interface to include all required properties
export interface DaySchedule {
  day: string;
  is_available: boolean;
  start_time?: string;
  end_time?: string;
  active: boolean;
  time?: string;
}
