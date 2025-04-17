
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
}

export interface BookingCounts {
  pending: number;
  upcoming?: number;
  accepted: number;
  completed: number;
  total: number;
}

export interface ServiceType {
  id: string;
  label: string;
}
