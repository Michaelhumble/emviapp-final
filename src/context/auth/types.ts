
import { AuthResponse, Session, User } from '@supabase/supabase-js';

// User roles in the system
export type UserRole = 
  | 'artist' 
  | 'nail technician/artist'
  | 'salon' 
  | 'owner'
  | 'customer'
  | 'freelancer'
  | 'supplier'
  | 'beauty supplier'
  | 'vendor'
  | 'renter'
  | 'other';

// User profile data structure
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  location: string;
  bio: string;
  phone: string;
  instagram: string;
  website: string;
  specialty: string;
  role: UserRole | null;
  created_at: string;
  updated_at: string;
  preferred_language: string;
  referral_count: number;
  salon_name: string;
  company_name: string;
  custom_role: string;
  contact_link: string;
  skills: string[];
  skill_level: string;
  profile_views: number;
  preferences: any[];
  affiliate_code: string;
  referral_code: string;
  credits: number;
  boosted_until: string | null;
  portfolio_urls: string[];
  accepts_bookings: boolean;
  booking_url: string;
}

// Auth context interface
export interface AuthContextType {
  session: Session | null;
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  isSignedIn: boolean;
  isNewUser: boolean;
  clearIsNewUser: () => void;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  validateUserRole?: () => Promise<void>; // New optional method for force validation
}
