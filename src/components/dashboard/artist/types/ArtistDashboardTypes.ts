
export interface BookingWithDetails {
  id: string;
  sender_id: string;
  recipient_id: string;
  service_id?: string;
  service_name?: string;
  date_requested?: string;
  time_requested?: string;
  appointment_time?: string;
  status: string;
  created_at: string;
  price?: number;
  note?: string;
}

export interface DashboardStats {
  booking_count: number;
  completed_services: number;
  total_earnings: number;
  average_rating: number;
  referral_count: number;
  repeat_client_percentage: number;
}

export interface EarningsData {
  monthly_earnings: MonthlyEarning[];
  total_earnings: number;
  pending_payouts: number;
}

export interface MonthlyEarning {
  month: string;
  amount: number;
}

export interface PortfolioImage {
  id: string;
  name: string;
  url: string;
  created_at: string;
}
