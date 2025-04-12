
import { User } from '@supabase/supabase-js';

export type UserRole = 'customer' | 'artist' | 'salon' | 'owner' | 'freelancer' | 'supplier' | 'vendor' | 'beauty supplier' | 'nail technician/artist' | 'renter' | 'other';

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  bio?: string;
  specialty?: string;
  location?: string;
  avatar_url?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
  
  // Social media fields
  instagram?: string;
  website?: string;
  
  // Additional fields
  salon_name?: string;
  company_name?: string;
  preferred_language?: string;
  profile_views?: number;
  account_type?: string;
  referral_code?: string;
  affiliate_code?: string;
  referral_count?: number;
  booking_url?: string;
  boosted_until?: string | null;
  skills?: string[];
  portfolio_urls?: string[];
  credits?: number;
  custom_role?: string;
  contact_link?: string;
  badges?: any[];
  accepts_bookings?: boolean;
  preferences?: string[];
  completed_profile_tasks?: string[];
  services?: any[];
  google_review_link?: string;
  years_experience?: number;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  isSignedIn: boolean;
  isError: boolean;
  isNewUser: boolean;
  clearIsNewUser: () => void;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, userData?: any) => Promise<any>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<boolean>;
  updateUserRole: (role: UserRole) => Promise<void>;
}
