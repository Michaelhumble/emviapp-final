
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
