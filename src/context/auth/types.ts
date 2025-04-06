
import { User } from '@supabase/supabase-js';

export type UserRole = 
  | 'artist' 
  | 'salon' 
  | 'customer' 
  | 'freelancer' 
  | 'vendor' 
  | 'supplier' 
  | 'beauty supplier' 
  | 'owner' 
  | 'nail technician/artist'
  | 'renter'
  | 'other';

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
  preferred_language: string;
  referral_count: number;
  affiliate_code: string;
  referral_code: string;
  salon_name: string;
  company_name: string;
  custom_role: string;
  contact_link: string;
  skills: string[];
  skill_level: string;
  profile_views: number;
  preferences: string[];
  credits: number;
  boosted_until: string | null;
}

export interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  userRole: UserRole;
}

export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any, data: any }>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
  isAuthenticated: boolean;
}
