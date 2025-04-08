
import { AuthResponse, Session, User } from '@supabase/supabase-js';

// User roles in the system - strictly defined and normalized
export type UserRole = 
  | 'customer' 
  | 'artist' 
  | 'salon_owner'
  | 'freelancer'
  | 'supplier'
  | 'other';

// Legacy role mappings - includes both standard and non-standard roles for backward compatibility
export type LegacyUserRole = 
  // Standard normalized roles
  | UserRole
  // Legacy/non-standard roles that need mapping
  | 'salon'
  | 'owner'
  | 'vendor'
  | 'beauty supplier'
  | 'nail technician/artist'
  | 'renter';

// Clean user profile data structure with extended properties for backward compatibility
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole | null;
  created_at: string;
  updated_at: string;
  referral_count?: number;
  profile_views?: number;
  
  // Extended properties for backward compatibility
  bio?: string;
  specialty?: string;
  location?: string;
  instagram?: string;
  website?: string;
  phone?: string;
  salon_name?: string;
  company_name?: string;
  custom_role?: string;
  contact_link?: string;
  skills?: string[];
  skill_level?: string;
  portfolio_urls?: string[];
  preferences?: string[];
  boosted_until?: string;
  credits?: number;
  affiliate_code?: string;
  referral_code?: string;
  accepts_bookings?: boolean;
  booking_url?: string;
  preferred_language?: string;
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
  validateUserRole?: () => Promise<void>; // Method for force validation
}
