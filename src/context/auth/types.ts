
import { Session, User } from '@supabase/supabase-js';

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
  email?: string;
  full_name?: string;
  avatar_url?: string;
  custom_role?: string;
  bio?: string;
  contact_link?: string;
  instagram?: string;
  website?: string;
  user_role?: UserRole;
  created_at?: string;
  salon_name?: string;
  company_name?: string;
  location?: string;
  referral_count?: number;
  affiliate_code?: string;
  badges?: any[];
  credits?: number;
  boosted_until?: string;
  
  // Social links that may be added later
  facebook?: string;
  twitter?: string;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  loading: boolean; // Alias for isLoading (for backward compatibility)
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  isSignedIn: boolean;
  isNewUser: boolean;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
  updateUserAvatar: (file: File) => Promise<string | null>;
  clearIsNewUser: () => void;
}
