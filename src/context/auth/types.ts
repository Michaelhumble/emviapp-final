
import { Database } from '@/integrations/supabase/types';

// Defines the possible roles a user can have
export type UserRole = 
  | 'customer' 
  | 'artist' 
  | 'nail technician/artist' 
  | 'salon' 
  | 'owner' 
  | 'vendor' 
  | 'supplier'
  | 'beauty supplier'
  | 'freelancer'
  | 'renter'
  | 'other';

// Extends the user profile with additional fields
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  location: string | null;
  bio: string | null;
  phone: string | null;
  instagram: string | null;
  website: string | null;
  specialty: string | null;
  role: UserRole | null;
  // Additional fields that may exist in the database
  skill_level?: string | null;
  skills?: string[] | null;
  salon_name?: string | null;
  business_address?: string | null;
  company_name?: string | null;
  product_type?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  custom_role?: string | null;
  preferences?: string[] | null;
  contact_link?: string | null;
  // Affiliate system fields
  affiliate_link?: string | null;
  affiliate_code?: string | null;
  referred_by?: string | null;
  referral_count?: number;
  credits?: number;
  // Profile stats
  profile_views?: number;
}

// Profile status information
export interface ProfileStatus {
  profileComplete: boolean;
}

// Auth context type definition
export interface AuthContextType {
  session: Session | null;
  user: SupabaseUser | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  // Add missing properties needed by components
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>; // Added signUp method
  isSignedIn: boolean;
}

// Import Supabase types to avoid importing them everywhere
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
