
/** PROTECTED: Do not modify without explicit approval. */
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

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
  
  // Matchmaking fields
  available_for_hire?: boolean | null;
  looking_for_work?: boolean | null;
  just_moved?: boolean | null;
  moved_to_city?: string | null;
  moved_to_state?: string | null;
  moved_date?: string | null;
  matchmaking_radius?: number | null;
  
  // Additional fields for compatibility
  [key: string]: any;
}

/**
 * 🎯 ENHANCED AUTH CONTEXT TYPE
 * 
 * This interface defines the complete auth context API.
 * All components should use this through useAuth() hook.
 */
export interface AuthContextType {
  // Core State
  user: SupabaseUser | null;
  session: Session | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  isSignedIn: boolean;
  isError: boolean;
  isNewUser: boolean;
  
  // Enhanced State
  isInitialized: boolean;
  lastValidation: number;
  
  // Core Actions
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: Error }>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ success: boolean; error?: Error; userId?: string }>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: Error }>;
  updateUserRole: (role: UserRole) => Promise<void>;
  refreshUserProfile: () => Promise<boolean>;
  
  // Utility Actions
  clearIsNewUser: () => void;
  setLoading: (loading: boolean) => void;
  
  // Emergency Actions
  emergencyReset: () => Promise<void>;
}
