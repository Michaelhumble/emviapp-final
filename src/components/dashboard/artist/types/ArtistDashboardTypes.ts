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
