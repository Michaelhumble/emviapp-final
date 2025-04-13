
import { User } from "@supabase/supabase-js";

export type UserRole = 
  | "artist" 
  | "owner" 
  | "customer" 
  | "supplier" 
  | "freelancer" 
  | "salon" 
  | "nail technician/artist" 
  | "renter" 
  | "other"
  | null;

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  role?: UserRole;
  custom_role?: string;
  specialty?: string;
  location?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  created_at?: string;
  updated_at?: string;
  username?: string;
  booking_url?: string;
  contact_link?: string;
  salon_id?: string;
  is_salon_owner?: boolean;
  job_title?: string;
  accepts_bookings?: boolean;
  portfolio_urls?: string[] | null;
  skills?: string[] | null;
  preferred_language?: string;
  subscription_tier?: string;
  subscription_expires?: string;
  badges?: any[] | null;
  completed_profile_tasks?: string[] | null;
  credit_balance?: number;
  total_credits_earned?: number;
  is_premium?: boolean;
  profile_views?: number;
  years_experience?: number;
  professional_name?: string;
}

export interface AuthContextType {
  loading: boolean;
  isSignedIn: boolean;
  isError: boolean;
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole;
  isNewUser: boolean;
  clearIsNewUser: () => void;
  signIn: (email: string, password: string) => Promise<{
    success: boolean;
    error?: Error;
  }>;
  signOut: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    userData?: Partial<UserProfile>
  ) => Promise<{
    success: boolean;
    error?: Error;
  }>;
  updateUserRole: (role: UserRole) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{
    success: boolean;
    error?: Error;
  }>;
}
