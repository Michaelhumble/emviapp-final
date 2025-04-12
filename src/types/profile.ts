
export interface Location {
  lat: number | null;
  lng: number | null;
  address?: string | null;
  split?: string;
}

export interface OpeningTime {
  day: string;
  open: string;
  close: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  title?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  website?: string;
  location?: Location | string;
  salonName?: string;
  boothRental?: boolean;
  specialties?: string[];
  services?: string[];
  gallery?: string[];
  resume?: string;
  certifications?: string[];
  yearsOfExperience?: number;
  hourlyRate?: number;
  openingTimes?: OpeningTime[];
  profile_views?: number;
  
  // Additional properties from auth context UserProfile
  full_name?: string;
  user_id?: string;
  avatar_url?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
  specialty?: string;
  username?: string;
  boosted_until?: string;
  salon_name?: string;
  company_name?: string;
  contact_link?: string;
  years_experience?: number;
  badges?: any[];
  accepts_bookings?: boolean;
  booking_url?: string;
  completed_profile_tasks?: string[];
  preferences?: string[];
  preferred_language?: string;
}
