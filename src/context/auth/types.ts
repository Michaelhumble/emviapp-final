
import { User } from '@supabase/supabase-js';

export type UserRole = 'customer' | 'artist' | 'salon' | 'owner' | 'supplier' | 'freelancer';

export interface UserProfile {
  id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  role?: string;
  avatar_url?: string;
  specialty?: string;
  location?: string;
  bio?: string;
  website?: string;
  instagram?: string;
  salon_name?: string;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  isSignedIn: boolean;
  loading: boolean;
  isError: boolean;
  isNewUser: boolean;
  clearIsNewUser: () => void;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, userData?: any) => Promise<any>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<boolean>;
  updateUserRole: (role: UserRole) => Promise<void>;
}
