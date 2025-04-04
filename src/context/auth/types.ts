
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
  skill_level?: string | null;
  skills?: string[] | null;
  salon_name?: string | null;
  business_address?: string | null;
  company_name?: string | null;
  product_type?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
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
}

// Import Supabase types to avoid importing them everywhere
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
