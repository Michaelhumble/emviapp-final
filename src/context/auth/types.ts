
import { User } from '@supabase/supabase-js';

export type UserRole = 'customer' | 'artist' | 'salon' | 'owner' | 'manager' | 'admin' | 'freelancer' | 'nail technician/artist' | 'beauty supplier' | 'supplier' | 'vendor' | 'renter' | 'other';

export interface UserProfile {
  // Required properties
  id: string;
  email: string;
  
  // Optional user properties that exist in Supabase users table
  full_name?: string;
  role?: UserRole;
  avatar_url?: string;
  bio?: string;
  specialty?: string;
  location?: string;
  instagram?: string;
  website?: string;
  phone?: string;
  
  // Timestamps
  created_at?: string;
  updated_at?: string;
  
  // Special fields
  boosted_until?: string;
  badges?: Record<string, any> | any[];
  accepts_bookings?: boolean;
  booking_url?: string;
  contact_link?: string;
  completed_profile_tasks?: string[];
  preferences?: string[];
  preferred_language?: string;
  referral_code?: string;
  referred_by?: string;
  referral_count?: number;
  credits?: number;
  portfolio_urls?: string[];
  custom_role?: string;
  profile_completion?: number;
  
  // Additional fields needed by components
  username?: string;
  salon_name?: string;
  company_name?: string;
  skills?: string[];
  years_experience?: number;
  independent?: boolean;
  creditsThisMonth?: number;
  artistTypes?: string[];
  favorite_artist_types?: string[];
  birthday?: string;
  commPrefs?: string[];
  communication_preferences?: string[];
  profile_views?: number;
  user_id?: string;
  affiliate_code?: string;
  gender?: string;
  account_type?: string;
  bookings_count?: number;
  reviews_count?: number;
  last_booking_date?: string;
  
  // Salon specific fields
  salon_type?: string;
  phone_number?: string;
  website_url?: string;
  instagram_url?: string;
  description?: string;
  accepts_walk_ins?: boolean;
  salonName?: string;  // Added for backward compatibility
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
