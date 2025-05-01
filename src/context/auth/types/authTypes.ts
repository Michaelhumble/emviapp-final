
import { User, Session, AuthSession } from '@supabase/supabase-js';

export type UserRole = 
  | 'customer' 
  | 'artist' 
  | 'salon' 
  | 'owner' 
  | 'freelancer' 
  | 'manager' 
  | 'admin' 
  | 'supplier' 
  | 'vendor' 
  | 'beauty supplier' 
  | 'nail technician/artist' 
  | 'renter' 
  | 'other'
  | null;

export interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  phone?: string;
  bio?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  role?: UserRole;
  specialty?: string;
  location?: string;
  instagram?: string;
  website?: string;
  referred_by?: string;
  referral_code?: string;
  portfolio_urls?: string[];
  affiliate_code?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  role?: UserRole;
  full_name?: string;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole;
  session: Session | null;
  isSignedIn: boolean;
  loading: boolean;
  loggingIn: boolean;
  loggingOut: boolean;
  signingUp: boolean;
  error: Error | null;
  isError: boolean;
  isNewUser: boolean;
  clearIsNewUser: () => void;
  hasRole: (role: UserRole) => boolean;
  signIn: (credentials: LoginCredentials) => Promise<{ user: User | null; error: Error | null }>;
  signOut: () => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<{ user: User | null; error: Error | null }>;
  updateUserRole: (role: UserRole) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: Error }>;
  refreshUserProfile: () => Promise<void>;
}
