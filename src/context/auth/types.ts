
import { AuthResponse, Session, User } from '@supabase/supabase-js';

// User roles in the system - strictly defined and normalized
export type UserRole = 
  | 'customer' 
  | 'artist' 
  | 'salon_owner'
  | 'freelancer'
  | 'supplier'
  | 'other';

// Clean user profile data structure
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
