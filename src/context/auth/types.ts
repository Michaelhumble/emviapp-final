import { Session, User } from "@supabase/supabase-js";

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
  user_id?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  bio?: string;
  location?: string;
  salon_name?: string;
  specialty?: string;
  // Social media and web presence
  instagram?: string;
  website?: string;
  // Profile media
  avatar_url?: string;
  portfolio_urls?: string[];
  // Professional details
  skills?: string[];
  skill_level?: string;
  // Preferences and statistics
  preferences?: string[];
  profile_views?: number;
  // Booking capabilities
  accepts_bookings?: boolean;
  booking_url?: string;
  // Referral and affiliate program
  referral_code?: string;
  referral_count?: number;
  affiliate_code?: string;
  credits?: number;
  // Pro features
  boosted_until?: string;
  // Language preferences
  preferred_language?: string;
  // Additional fields for specific roles
  custom_role?: string;
  contact_link?: string;
  company_name?: string;
  // Timestamps
  created_at?: string;
  updated_at?: string;
  // Add other profile fields
}

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  isSignedIn: boolean;
  isNewUser: boolean;
  clearIsNewUser: () => void;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: { user: User | null; session: Session | null } | null;
  }>;
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<{
    error: Error | null;
    data: { user: User | null; session: Session | null } | null;
  }>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}
