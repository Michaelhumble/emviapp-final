
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

export interface BookingWithDetails extends Booking {
  price?: number;
  appointment_time?: string;
}

export interface ServiceType {
  id: string;
  label: string;
}
