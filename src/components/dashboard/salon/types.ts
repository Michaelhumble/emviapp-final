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
}
