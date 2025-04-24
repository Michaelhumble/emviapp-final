
export interface Booking {
  id: string;
  sender_id?: string;
  recipient_id?: string;
  client_name?: string; // Changed from required to optional
  service_name?: string;
  date_requested?: string;
  time_requested?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  note?: string;
  price?: number;
  paid?: boolean;
  created_at?: string;
  date?: Date;
  time?: number;
}

export interface BookingCounts {
  pending: number;
  accepted: number;
  completed: number;
  declined: number;
  cancelled: number;
  total: number;
}
