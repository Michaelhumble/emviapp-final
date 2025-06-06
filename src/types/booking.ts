
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
  appointment_time?: string; // For compatibility with existing code
  service_type?: string; // For compatibility with existing code
  appointment_date?: string; // For compatibility with existing code
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
