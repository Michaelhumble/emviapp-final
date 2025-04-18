// First, keep any existing types in this file

// Add the SalonService type for our applications
export interface SalonService {
  id: string;
  title: string;
  price: number;
  duration_minutes: number;
  description?: string;
  is_visible?: boolean;
  image_url?: string;
  user_id: string;
  created_at: string;
  updated_at?: string;
}

// Add the SalonTeamMember type 
export interface SalonTeamMember {
  id: string;
  full_name: string;
  email: string;
  role: string;
  specialty: string;
  status: 'active' | 'inactive' | 'pending';
  joined_at: string;
  avatar_url?: string;
  commission_rate?: number;
  salon_id: string;
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
