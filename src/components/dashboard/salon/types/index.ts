
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

// Add a specific interface for booking statistics
export interface BookingStatsItem {
  week: string;
  count: number;
}

// Add a message sender interface
export interface MessageSender {
  id: string;
  name: string;
  avatar?: string;
  type: 'customer' | 'artist' | 'staff';
}

// Add a salon message interface
export interface SalonMessage {
  id: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  isReplied: boolean;
  sender: MessageSender | null;
}
