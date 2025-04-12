
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
  // Required properties
  id: string;
  email: string;
  
  // Auth related properties from auth context
  userId?: string;
  user_id?: string;
  firstName?: string;
  lastName?: string;
  full_name?: string;
  avatar_url?: string;
  avatarUrl?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
  
  // Profile information
  phone?: string;
  bio?: string;
  title?: string;
  specialty?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  website?: string;
  
  // Location data (can be string or object)
  location?: Location | string;
  
  // Salon-specific properties
  salonName?: string;
  salon_name?: string;
  company_name?: string;
  boothRental?: boolean;
  
  // Professional information
  specialties?: string[];
  services?: string[] | any[];
  gallery?: string[];
  resume?: string;
  certifications?: string[];
  yearsOfExperience?: number;
  years_experience?: number;
  hourlyRate?: number;
  openingTimes?: OpeningTime[];
  
  // Additional properties
  profile_views?: number;
  username?: string;
  boosted_until?: string;
  contact_link?: string;
  badges?: any[];
  accepts_bookings?: boolean;
  booking_url?: string;
  completed_profile_tasks?: string[];
  preferences?: string[];
  preferred_language?: string;
  affiliate_code?: string;
  google_review_link?: string;
  
  // Helper method to safely get location as string
  getLocationString?: () => string;
}

// Helper function to safely get location as a string for display
export function getLocationString(location: Location | string | undefined | null): string {
  if (!location) return '';
  
  if (typeof location === 'string') {
    return location;
  }
  
  // Handle Location object
  return location.address || '';
}
