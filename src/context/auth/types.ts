
import { Session, User } from '@supabase/supabase-js';
import { Json } from '@/integrations/supabase/types';

export type UserRole = 
  | 'owner' 
  | 'salon' 
  | 'supplier' 
  | 'beauty supplier' 
  | 'vendor' 
  | 'artist' 
  | 'nail technician/artist' 
  | 'customer' 
  | 'freelancer' 
  | 'renter' 
  | 'other';

export interface UserProfile {
  id?: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  custom_role?: string;
  bio?: string;
  contact_link?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  website?: string;
  user_role?: UserRole;
  created_at?: string;
  salon_name?: string;
  company_name?: string;
  skills?: string[];
  skill_level?: string;
  service_category?: string;
  location?: string;
  languages?: string[];
  specialty_tags?: string[];
  referral_count?: number;
  affiliate_code?: string;
  referral_code?: string;
  profile_views?: number;
  badges?: Json;
  credits?: number;
  boosted_until?: string | null;
  role?: UserRole;
  phone?: string;
  preferences?: string[];
  specialty?: string;
  gallery?: string[];
  verification_status?: 'pending' | 'verified' | 'rejected';
  account_type?: 'free' | 'pro' | 'enterprise';
  product_type?: string;
  social_links?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    website?: string;
  };
  preferred_language?: 'en' | 'vi' | 'es';
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  session: Session | null;
  isLoading: boolean;
  loading: boolean; // Alias for isLoading for backward compatibility
  signUp: (email: string, password: string) => Promise<SignUpResponse>;
  signIn: (email: string, password: string) => Promise<SignInResponse>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
  updateUserAvatar: (file: File) => Promise<string | null>;
  isSignedIn: boolean;
  isNewUser: boolean;
  clearIsNewUser: () => void;
}

export interface SignUpResponse {
  error: any;
  data?: {
    user: User | null;
    session: Session | null;
  }
}

export interface SignInResponse {
  error: any;
  data?: {
    user: User | null;
    session: Session | null;
  }
}

export interface UserInfoType {
  roles: UserRole[];
  services?: string[];
  specialties?: string[];
  skillLevel?: string[];
}

export interface ThemeColorMap {
  [key: string]: {
    light: string;
    dark: string;
    gradient: string;
    textLight: string;
    textDark: string;
    patternClass: string;
  };
}
