
import { User, Session } from '@supabase/supabase-js';

export type UserRole = 'customer' | 'artist' | 'salon' | 'freelancer' | 'manager' | 'admin' | 'nail technician/artist' | 'owner' | 'vendor' | 'supplier' | 'beauty supplier' | 'renter' | 'other';

export interface UserProfile {
  id: string;
  email?: string;
  userId?: string;
  user_id?: string;
  firstName?: string;
  lastName?: string;
  full_name?: string;
  avatar_url?: string;
  avatarUrl?: string;
  role?: UserRole;
  created_at?: string;
  updated_at?: string;
  
  // Profile information
  phone?: string;
  bio?: string;
  title?: string;
  specialty?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  website?: string;
  
  // Location data
  location?: any;
  
  // Salon-specific properties
  salonName?: string;
  salon_name?: string;
  company_name?: string;
  boothRental?: boolean;
  number_of_stations?: number;
  professional_name?: string;
  
  // Additional properties
  profile_views?: number;
  username?: string;
  boosted_until?: string;
  contact_link?: string;
  badges?: any[];
  accepts_bookings?: boolean;
  booking_url?: string;
  completed_profile_tasks?: string[];
  preferences?: string[];
  preferred_language?: string;
  affiliate_code?: string;
  referral_code?: string;
  referral_count?: number;
  credits?: number;
  google_review_link?: string;
  independent?: boolean;
  profile_completion?: number;
  
  // Artist-specific properties
  skills?: string[];
  years_experience?: number;
  portfolio_urls?: string[];
  custom_role?: string;
  is_premium?: boolean;
  
  // Customer-specific properties
  favorite_artist_types?: string[];
  artistTypes?: string[];
  birthday?: string | null;
  communication_preferences?: string[];
  commPrefs?: string[];
  creditsThisMonth?: number;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  isLoading: boolean; // Added missing property
  isSignedIn: boolean;
  isError: boolean;
  error: Error | null; // Added missing property
  isNewUser: boolean;
  session: Session | null; // Added missing property
  clearIsNewUser: () => void;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: Error }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ success: boolean; error?: Error; userId?: string }>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<boolean>;
  updateUserRole?: (role: UserRole) => Promise<void>;
  updateProfile?: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: Error }>;
}
