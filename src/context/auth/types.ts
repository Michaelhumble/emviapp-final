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
  email: string;
  full_name: string;
  avatar_url?: string;
  location?: string;
  bio?: string;
  phone?: string;
  instagram?: string;
  website?: string;
  specialty?: string;
  role?: string;
  skill_level?: string;
  skills?: string[];
  salon_name?: string;
  business_address?: string;
  company_name?: string;
  product_type?: string;
  // Fields for salon owners
  license_number?: string | null;
  salon_type?: string | null;
  // Fields for vendors/suppliers
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
