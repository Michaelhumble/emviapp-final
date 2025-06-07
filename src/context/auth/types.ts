import { User as SupabaseUser } from '@supabase/supabase-js';

export type { SupabaseUser as User };

export type UserRole = 'customer' | 'artist' | 'salon' | 'owner' | 'manager' | 'admin' | 'freelancer' | 'nail technician/artist' | 'beauty supplier' | 'supplier' | 'vendor' | 'renter' | 'other';

export interface UserProfile {
  // Required properties
  id: string;
  email?: string;
  
  // Core profile fields
  full_name?: string | null;
  phone?: string | null;
  role?: UserRole | null;
  avatar_url?: string | null;
  specialty?: string | null;
  location?: string | null;
  bio?: string | null;
  instagram?: string | null;
  website?: string | null;
  
  // Timestamps
  created_at?: string | null;
  updated_at?: string | null;
  
  // Additional database fields
  custom_role?: string | null;
  contact_link?: string | null;
  badges?: string[] | null;
  accepts_bookings?: boolean | null;
  completed_profile_tasks?: string[] | null;
  
  // Social and professional
  portfolio_urls?: string[] | null;
  referral_code?: string | null;
  credits?: number | null;
  profile_views?: number | null;
  booking_url?: string | null;
  boosted_until?: string | null;
  
  // Salon-specific
  salon_name?: string | null;
  company_name?: string | null;
  professional_name?: string | null;
  address?: string | null;
  
  // Experience and services
  years_experience?: number | null;
  services?: any[] | null;
  gallery?: string[] | null;
  preferences?: any | null;
  preferred_language?: string | null;
  referred_by?: string | null;
  referral_count?: number | null;
  independent?: boolean | null;
  skills?: string[] | null;
  profile_completion?: number | null;
  
  // New fields for Open to Offers feature
  open_to_offers?: boolean | null;
  offers_data?: any | null;
  spotlight_until?: string | null;
  
  // Additional fields for compatibility
  [key: string]: any;
}

export interface AuthContextType {
  user: SupabaseUser | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
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
