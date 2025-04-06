
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

// User roles in the application
export type UserRole = 
  | 'customer' 
  | 'artist' 
  | 'salon' 
  | 'supplier' 
  | 'freelancer' 
  | 'owner' 
  | 'other'
  | 'nail technician/artist'
  | 'renter'
  | 'vendor'
  | 'beauty supplier';

// User profile data with extended information
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
  role: UserRole;
  created_at: string;
  updated_at: string;
  preferred_language?: string;
  referral_count: number;
  // Additional properties that are being used in the app
  salon_name?: string;
  company_name?: string;
  custom_role?: string;
  contact_link?: string;
  skills?: string[];
  skill_level?: string;
  profile_views?: number;
  preferences?: string[];
  affiliate_code?: string; // Added this property for referral codes
}

// Auth context data shape
export interface AuthContextType {
  session: Session | null;
  user: SupabaseUser | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  isSignedIn: boolean;
  isNewUser: boolean; // Flag to track if user just signed up
  clearIsNewUser: () => void; // Function to clear the new user flag
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}
