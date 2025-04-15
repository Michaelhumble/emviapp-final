
export interface DashboardStats {
  booking_count: number;
  completed_services: number;
  total_earnings: number;
  average_rating: number;
  referral_count: number;
  repeat_client_percentage: number;
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

export interface BookingWithDetails {
  id: string;
  sender_id: string;
  recipient_id: string;
  service_id?: string;
  service_name?: string;
  date_requested: string;
  time_requested: string;
  appointment_time?: string;
  status: string;
  created_at: string;
  price?: number;
  note?: string;
}

// Add the missing type definitions
export interface Booking {
  id: string;
  sender_id: string;
  recipient_id: string;
  client_name?: string;
  client_avatar?: string;
  artist_name?: string;
  service_id?: string;
  service_name?: string;
  date_requested: string;
  time_requested?: string;
  appointment_time?: string;
  status: string;
  created_at: string;
  price?: number;
  note?: string;
}

export interface BookingCounts {
  pending: number;
  accepted: number;
  completed: number;
  total: number;
  upcoming?: number;
}

export interface PortfolioImage {
  id: string;
  url: string;
  name: string;
  description?: string;
}

export interface ArtistProfileState {
  id: string;
  user_id: string;
  full_name: string;
  portfolio_images: any[];
  portfolio_urls: string[];
  referral_count: number;
  affiliate_code: string;
  accepts_bookings?: boolean;
  preferences?: string[];
  credits?: number;
  preferred_language?: string;
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

export interface DaySchedule {
  day: string;
  time: string;
  active: boolean;
}
