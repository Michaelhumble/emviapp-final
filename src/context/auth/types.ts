import { User as SupabaseUser, Session } from '@supabase/supabase-js';

export type { SupabaseUser as User };

export type UserRole = 
  | 'customer' 
  | 'nail-artist' 
  | 'hair-stylist' 
  | 'lash-tech' 
  | 'barber' 
  | 'esthetician' 
  | 'massage-therapist' 
  | 'salon-owner' 
  | 'freelancer'
  | 'artist' 
  | 'salon' 
  | 'owner' 
  | 'manager' 
  | 'admin' 
  | 'beauty-supplier' 
  | 'supplier' 
  | 'vendor' 
  | 'renter' 
  | 'other';

// Role-specific profile interfaces
export interface BaseProfile {
  id: string;
  email?: string;
  full_name?: string | null;
  phone?: string | null;
  role?: UserRole | null;
  avatar_url?: string | null;
  location?: string | null;
  bio?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ArtistProfile extends BaseProfile {
  specialties?: string[] | null;
  experience_years?: number | null;
  license_number?: string | null;
  portfolio_urls?: string[] | null;
  preferred_work_types?: string[] | null;
  rate_per_hour?: number | null;
  availability_schedule?: any | null;
}

export interface SalonOwnerProfile extends BaseProfile {
  business_name?: string | null;
  salon_type?: string | null;
  services_offered?: string[] | null;
  seat_count?: number | null;
  business_license?: string | null;
  logo_url?: string | null;
  business_hours?: any | null;
  website?: string | null;
  instagram?: string | null;
}

export interface FreelancerProfile extends BaseProfile {
  cities_willing_to_work?: string[] | null;
  rate_range_min?: number | null;
  rate_range_max?: number | null;
  skills?: string[] | null;
  availability?: string | null;
  travel_radius?: number | null;
}

export interface CustomerProfile extends BaseProfile {
  preferred_services?: string[] | null;
  referral_source?: string | null;
}

export interface UserProfile extends BaseProfile {
  // All optional fields from role-specific profiles
  specialties?: string[] | null;
  experience_years?: number | null;
  license_number?: string | null;
  portfolio_urls?: string[] | null;
  preferred_work_types?: string[] | null;
  rate_per_hour?: number | null;
  availability_schedule?: any | null;
  business_name?: string | null;
  salon_type?: string | null;
  services_offered?: string[] | null;
  seat_count?: number | null;
  business_license?: string | null;
  logo_url?: string | null;
  business_hours?: any | null;
  website?: string | null;
  instagram?: string | null;
  cities_willing_to_work?: string[] | null;
  rate_range_min?: number | null;
  rate_range_max?: number | null;
  skills?: string[] | null;
  availability?: string | null;
  travel_radius?: number | null;
  preferred_services?: string[] | null;
  referral_source?: string | null;
  
  // Existing fields
  specialty?: string | null;
  contact_link?: string | null;
  badges?: string[] | null;
  accepts_bookings?: boolean | null;
  completed_profile_tasks?: string[] | null;
  credits?: number | null;
  profile_views?: number | null;
  booking_url?: string | null;
  boosted_until?: string | null;
  salon_name?: string | null;
  company_name?: string | null;
  professional_name?: string | null;
  address?: string | null;
  years_experience?: number | null;
  services?: any[] | null;
  gallery?: string[] | null;
  preferences?: any | null;
  preferred_language?: string | null;
  referred_by?: string | null;
  referral_count?: number | null;
  independent?: boolean | null;
  profile_completion?: number | null;
  
  [key: string]: any;
}

export interface AuthContextType {
  user: SupabaseUser | null;
  session: Session | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  isSignedIn: boolean;
  isError: boolean;
  isNewUser: boolean;
  clearIsNewUser: () => void;
  setLoading: (loading: boolean) => void;
  refreshUserProfile: () => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: Error }>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ success: boolean; error?: Error; userId?: string }>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: Error }>;
  updateUserRole: (role: UserRole) => Promise<void>;
}
