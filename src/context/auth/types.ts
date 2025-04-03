
import { Session, User } from "@supabase/supabase-js";

export type UserRole = 
  | 'customer' 
  | 'artist' 
  | 'salon' 
  | 'vendor'
  | 'freelancer' 
  | 'other'
  | 'renter'  // legacy role
  | 'owner'   // legacy role
  | 'supplier'  // legacy role
  | 'nail technician/artist'  // legacy role
  | 'beauty supplier'  // legacy role
  | null;

export type UserMetadata = {
  full_name?: string;
  user_type?: UserRole;
  [key: string]: any;
};

// Extended user profile interface to include all possible fields
export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  bio: string | null;
  specialty: string | null;
  location: string | null;
  instagram: string | null;
  website: string | null;
  phone: string | null;
  preferred_language: string | null;
  credits: number | null;
  badges: any | null; // Json
  role: UserRole;
  created_at: string | null;
  updated_at: string | null;
  // Fields for salon owners
  salon_name?: string | null;
  business_address?: string | null;
  license_number?: string | null;
  salon_type?: string | null;
  // Fields for vendors/suppliers
  company_name?: string | null;
  product_type?: string | null;
  website_url?: string | null;
  // For extensibility
  [key: string]: any;
}

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userRole: UserRole;
  userProfile: UserProfile | null;
  profileComplete: boolean;
  signUp: (email: string, password: string, metadata?: UserMetadata) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserRole: (role: UserRole) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
};
