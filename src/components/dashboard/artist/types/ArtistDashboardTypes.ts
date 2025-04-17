
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
}

export interface BookingWithDetails extends Booking {
  service_id?: string;
  appointment_time?: string;
}
