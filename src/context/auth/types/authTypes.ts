
import { User, Session } from '@supabase/supabase-js';

export type UserRole = 
  | 'customer' 
  | 'artist' 
  | 'salon' 
  | 'owner'
  | 'salon owner'
  | 'manager' 
  | 'admin' 
  | 'freelancer' 
  | 'nail technician/artist' 
  | 'beauty supplier' 
  | 'supplier' 
  | 'vendor' 
  | 'renter' 
  | 'other';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  role?: UserRole;
  avatar_url?: string;
  bio?: string;
  specialty?: string;
  location?: string;
  referral_code?: string;
  portfolio_urls?: string[];
  credits?: number;
  boosted_until?: string;
  profile_completion?: number;
  profile_views?: number;
  user_id?: string;
  birthday?: string;
  communication_preferences?: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
  };
  commPrefs?: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
  };
  [key: string]: any;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole;
  loading: boolean;
  isSignedIn: boolean;
  isError: boolean;
  isNewUser: boolean;
  clearIsNewUser: () => void;
  signIn: (params: {email: string, password: string}) => Promise<{ success: boolean; error?: Error; user?: User }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ success: boolean; error?: Error; userId?: string }>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<boolean>;
  updateUserRole: (role: UserRole) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: Error }>;
  hasRole: (role: UserRole) => boolean;
}
