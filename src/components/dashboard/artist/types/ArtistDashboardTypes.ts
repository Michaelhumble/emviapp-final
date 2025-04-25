
export interface DashboardStats {
  booking_count: number;
  completed_services: number;
  total_earnings: number;
  average_rating: number;
  referral_count: number;
  repeat_client_percentage?: number;
  profile_views?: number;
}

export interface BookingCardProps {
  booking: any;
  isLoading?: boolean;
}

export interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  isLoading?: boolean;
}

// Missing types referenced in other components
export interface Booking {
  id: string;
  sender_id: string;
  recipient_id: string;
  date_requested?: string;
  time_requested?: string;
  service_id?: string;
  service_type?: string;
  status: 'pending' | 'accepted' | 'declined' | 'cancelled' | 'completed';
  note?: string;
  client_name?: string;
  created_at?: string;
  reminder_sent?: boolean;
  reminder_sent_at?: string;
  metadata?: Record<string, any>;
}

export interface BookingWithDetails extends Booking {
  client?: {
    name: string;
    avatar?: string;
  };
  service?: {
    name: string;
    price: number;
    duration: string;
  };
}

export interface PortfolioImage {
  id: string;
  url: string;
  name: string;
  description?: string;
}

export interface EarningsData {
  totalEarnings: number;
  pendingEarnings: number;
  earningsThisWeek: number;
  earningsTrend: number;
  completedBookings: number;
  transactions: Array<{
    id: string;
    amount: number;
    date: string;
    client: string;
    service: string;
    status: 'completed' | 'pending';
  }>;
}

export interface ArtistProfileState {
  displayName: string;
  role: string;
  avatar?: string;
  location?: string;
  specialty?: string;
  completionPercentage: number;
}

export interface ArtistDataContextType {
  loading: boolean;
  error: Error | null;
  stats: DashboardStats;
  bookings: Booking[];
  refreshData: () => Promise<void>;
}
