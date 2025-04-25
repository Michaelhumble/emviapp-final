
import { User, Session } from '@supabase/supabase-js';

export type UserRole = 'customer' | 'artist' | 'salon' | 'freelancer' | 'manager' | 'admin' | 'nail technician/artist' | 'owner' | 'vendor' | 'supplier' | 'beauty supplier' | 'renter' | 'other';

export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  role?: UserRole;
  created_at?: string;
  updated_at?: string;
  
  // Profile information
  phone?: string;
  bio?: string;
  specialty?: string;
  instagram?: string;
  website?: string;
  
  // Location data
  location?: any;
  
  // Additional properties
  credits?: number;
  referral_count?: number; 
  referral_code?: string;
  affiliate_code?: string;
  portfolio_urls?: string[];
  preferred_language?: string;
  accepts_bookings?: boolean;
  preferences?: string[];
  profile_completion?: number;
  independent?: boolean;
  badges?: any[] | Record<string, any>;
  booking_url?: string;
  contact_link?: string;
  completed_profile_tasks?: string[];
  boosted_until?: string;
  
  // Additional properties used across components
  skills?: string[];
  years_experience?: number;
  profile_views?: number;
  username?: string;
  custom_role?: string;
  is_premium?: boolean;
  
  // Customer-specific fields
  favorite_artist_types?: string[];
  artistTypes?: string[];
  birthday?: string | null;
  communication_preferences?: string[];
  commPrefs?: string[];
  creditsThisMonth?: number;
  
  // Salon-specific fields
  salon_name?: string;
  company_name?: string;
  salon_type?: string;
  phone_number?: string;
  website_url?: string;
  instagram_url?: string;
  description?: string;
  accepts_walk_ins?: boolean;
  
  // Legacy/compatibility fields
  user_id?: string;
  account_type?: string;
  bookings_count?: number;
  reviews_count?: number;
  last_booking_date?: string;
  gender?: string;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  isLoading: boolean;
  isSignedIn: boolean;
  isError: boolean;
  error: Error | null;
  isNewUser: boolean;
  session: Session | null;
  clearIsNewUser: () => void;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: Error }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ success: boolean; error?: Error; userId?: string }>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<boolean>;
  updateUserRole?: (role: UserRole) => Promise<void>;
  updateProfile?: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: Error }>;
}
