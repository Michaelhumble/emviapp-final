
import { Session, User } from '@supabase/supabase-js';

export type UserRole = 
  | 'artist' 
  | 'customer' 
  | 'owner' 
  | 'salon' 
  | 'vendor'
  | 'beauty supplier'
  | 'supplier'
  | 'freelancer'
  | 'nail technician/artist'
  | null;

export interface UserProfile {
  id: string;
  email: string;
  phone?: string | null;
  avatar_url?: string | null;
  full_name?: string | null;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  instagram?: string | null;
  role?: UserRole;
  specialty?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  badges?: Array<{ name: string; description: string; icon: string; }> | null;
  credits?: number | null;
  referral_code?: string | null;
  booking_url?: string | null;
  boosted_until?: string | null;
  accepts_bookings?: boolean | null;
  portfolio_urls?: string[] | null;
  completed_profile_tasks?: string[] | null;
  custom_role?: string | null;
  contact_link?: string | null;
  preferred_language?: string | null;
  preferences?: string[] | null;
  referred_by?: string | null;
}

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole;
  loading: boolean;
  isSignedIn: boolean;
  isNewUser: boolean;
  clearIsNewUser: () => void;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, options?: object) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}
