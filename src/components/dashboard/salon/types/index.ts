
export interface SalonTeamMember {
  id: string;
  full_name: string;
  specialty: string;
  role: string;
  joined_at: string;
  email: string;
  avatar_url?: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface SalonService {
  id: string;
  title: string;
  duration_minutes: number;
  price: number;
  description?: string;
  is_visible: boolean;
  created_at: string;
  updated_at?: string;
  user_id: string;
  image_url?: string;
}

export interface SalonBooking {
  id: string;
  client_name: string;
  client_email?: string | null;
  client_phone?: string | null;
  service_name: string;
  service_price: number;
  date: Date | null;
  time: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled' | 'declined';
  assigned_staff_name: string | null;
  assigned_staff_id: string | null;
  notes?: string;
  created_at: string;
}

// Add the BookingStatsItem interface that was missing
export interface BookingStatsItem {
  id: string;
  date: string;
  count: number;
  status: string;
}

// Add the SalonMessage interface that was missing
export interface SalonMessage {
  id: string;
  sender_id: string;
  sender_name: string;
  recipient_id: string;
  content: string;
  created_at: string;
  read: boolean;
  salon_id: string;
}

// Add the MessageSender type that was missing
export type MessageSender = 'owner' | 'staff' | 'client' | 'system';
