
export interface Booking {
  id: string;
  sender_id: string;
  recipient_id: string;
  client_name?: string;
  client_avatar?: string;
  service_id?: string;
  service_name?: string;
  date_requested?: string;
  time_requested?: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
  note?: string;
  created_at: string;
  artist_name?: string; // Added for customer bookings view
}

export interface BookingCounts {
  pending: number;
  accepted: number;
  completed: number;
  total: number;
  declined?: number;
  cancelled?: number;
}

export interface ServiceType {
  id: string;
  label: string;
}

export interface DaySchedule {
  id?: string;
  day: string;
  time: string;
  active: boolean;
}

export interface BookingWithDetails extends Booking {
  price?: number;
  appointment_time?: string;
}

export interface DashboardStats {
  booking_count: number;
  completed_services: number;
  total_earnings: number;
  average_rating: number;
  referral_count: number;
  repeat_client_percentage: number;
  profile_views: number;
}

export interface EarningsData {
  monthly_earnings: Array<{month: string, amount: number}>;
  total_earnings: number;
  pending_payouts: number;
}

export interface PortfolioImage {
  id: string;
  url: string;
  title?: string;
  description?: string;
  name?: string;
  created_at?: string;
  featured?: boolean;
}

export interface ArtistProfileState {
  id?: string;
  name?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  specialty?: string;
  experience?: number;
  rating?: number;
  portfolio?: PortfolioImage[];
  services?: any[];
  
  full_name?: string;
  user_id?: string;
  credits?: number;
  referral_count?: number; 
  affiliate_code?: string;
  portfolio_urls?: string[];
  preferred_language?: string;
  accepts_bookings?: boolean;
  preferences?: string[];
  avatar_url?: string;
  profile_completion?: number;
  independent?: boolean;
  years_experience?: number;
  skills?: string[];
  instagram?: string;
  website?: string;
}

export interface ArtistDataContextType {
  profile: any;
  stats: any;
  loading: boolean;
  error: Error | string | null;
  refresh: () => void;
  
  // Properties used by components
  artistProfile: ArtistProfileState;
  refreshArtistProfile: () => Promise<void>;
  portfolioImages: PortfolioImage[];
  loadingPortfolio: boolean;
  handleCopyReferralLink?: () => void;
  copied?: boolean;
  firstName?: string;
  userCredits?: number;
  
  // Properties used in ArtistMetrics
  bookingCount: { toString: () => string };
  reviewCount: number;
  averageRating: { toString: () => string };
}
