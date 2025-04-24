
export interface Booking {
  id: string;
  sender_id?: string;
  recipient_id?: string;
  client_name: string;
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
