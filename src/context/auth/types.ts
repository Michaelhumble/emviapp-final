
import { User } from '@supabase/supabase-js';

export type UserRole = 'customer' | 'artist' | 'salon' | 'owner' | 'manager' | 'admin' | 'freelancer' | 'nail technician/artist' | 'beauty supplier' | 'supplier' | 'vendor' | 'renter' | 'other';

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
  phone?: string;
  instagram?: string;
  website?: string;
  credits?: number;
  badges?: Record<string, any> | any[];
  boosted_until?: string;
  accepts_bookings?: boolean;
  booking_url?: string;
  completed_profile_tasks?: string[];
  preferences?: string[];
  preferred_language?: string;
  referral_count?: number;
  contact_link?: string;
  custom_role?: string;
  updated_at?: string;
  created_at?: string;
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
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: Error }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ success: boolean; error?: Error; userId?: string }>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<boolean>;
  updateUserRole: (role: UserRole) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: Error }>;
}
