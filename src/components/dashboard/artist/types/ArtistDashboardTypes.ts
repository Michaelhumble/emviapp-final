
export interface DashboardStats {
  booking_count: number;
  completed_services: number;
  total_earnings: number;
  average_rating: number;
  referral_count: number;
  repeat_client_percentage: number;
  profile_views: number; // Added this missing property
}

export interface MonthlyEarning {
  month: string;
  amount: number;
}

export interface EarningsData {
  monthly_earnings: MonthlyEarning[];
  total_earnings: number;
  pending_payouts: number;
}

export interface Booking {
  id: string;
  sender_id: string;
  recipient_id: string;
  client_name?: string;
  service_name?: string;
  date_requested: string;
  time_requested: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
  created_at: string;
  price?: number;
  note?: string;
  artist_name?: string;
  service_id?: string; // Added missing property for booking type
}

export interface BookingWithDetails extends Booking {
  service_id?: string;
  appointment_time?: string;
}

// Add missing types needed by other components
export interface DaySchedule {
  day: string;
  time: string;
  active: boolean;
}

export interface PortfolioImage {
  id: string;
  url: string;
  name: string;
  created_at: string;
}

export interface ArtistProfileState {
  id: string;
  user_id: string;
  full_name: string;
  portfolio_images: PortfolioImage[];
  portfolio_urls: string[];
  referral_count: number;
  affiliate_code: string;
  credits?: number;
  [key: string]: any; // To allow for additional properties
}

export interface ArtistDataContextType {
  artistProfile: ArtistProfileState | null;
  loading: boolean;
  error: Error | null;
  refreshProfile: () => void;
  handleCopyReferralLink: () => void;
  copied: boolean;
  firstName: string;
  userCredits: number;
  refreshArtistProfile: () => Promise<void>;
  portfolioImages: PortfolioImage[];
  loadingPortfolio: boolean;
}

// Add BookingCounts interface that was missing
export interface BookingCounts {
  pending: number;
  upcoming?: number;
  accepted: number;
  completed: number;
  total: number;
}

// Add ServiceType interface that was missing
export interface ServiceType {
  id: string;
  label: string;
}
