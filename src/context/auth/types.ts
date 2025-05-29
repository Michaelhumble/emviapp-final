
import { User as SupabaseUser } from '@supabase/supabase-js';

export type { SupabaseUser as User };

export type UserRole = 'customer' | 'artist' | 'salon' | 'owner' | 'manager' | 'admin' | 'freelancer' | 'nail technician/artist' | 'beauty supplier' | 'supplier' | 'vendor' | 'renter' | 'other';

export interface UserProfile {
  id: string;
  email: string; // Changed from optional to required to match other UserProfile definitions
  full_name?: string;
  role?: UserRole;
  avatar_url?: string;
  bio?: string;
  specialty?: string;
  location?: string;
  referral_code?: string;
  portfolio_urls?: string[];
  [key: string]: any;
}

export interface AuthContextType {
  user: SupabaseUser | null;
  userProfile: UserProfile | null;
  userRole: UserRole;
  loading: boolean;
  isSignedIn: boolean;
  isError: boolean;
  isNewUser: boolean;
  clearIsNewUser: () => void;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: Error }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ success: boolean; error?: Error; userId?: string }>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<boolean>;
  updateUserRole: (role: UserRole) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: Error }>;
}
