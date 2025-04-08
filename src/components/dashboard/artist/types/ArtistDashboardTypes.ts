
// Extending the existing types file to make sure it has all necessary fields

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

// Add BookingCounts interface to fix the error
export interface BookingCounts {
  total: number;
  pending: number;
  accepted: number;
  declined: number;
  completed: number;
}

// Add PortfolioImage interface to fix the error
export interface PortfolioImage {
  id: string;
  url: string;
  thumbnail_url?: string;
  alt_text?: string;
  created_at?: string;
}

// Add ArtistDataContextType interface to fix the error
export interface ArtistDataContextType {
  artistProfile: ArtistProfileState | null;
  loading: boolean;
  error: Error | null;
  refreshProfile: () => void;
}

// Add ArtistProfileState interface to fix the error
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
}

// Add DaySchedule interface to fix the error
export interface DaySchedule {
  day: string;
  is_available: boolean;
  start_time?: string;
  end_time?: string;
}
