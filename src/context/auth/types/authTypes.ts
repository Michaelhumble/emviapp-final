
import { User, Session } from "@supabase/supabase-js";

export type UserRole = 'artist' | 'customer' | 'salon' | 'owner' | 'freelancer' | 'supplier' | 'admin' | 'super_admin' | 'beauty supplier' | 'nail technician/artist' | string | null;

export interface UserProfile {
  id: string;
  user_id?: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  specialty?: string;
  role?: UserRole;
  salon_name?: string;
  instagram?: string;
  location?: string | any;
  phone?: string;
  created_at?: string;
  updated_at?: string;
  booked_until?: string;
  years_experience?: number;
  completed_profile_tasks?: string[];
  portfolio_urls?: string[];
  professional_name?: string;
  affiliate_code?: string;
  referral_code?: string;
  referral_count?: number;
  credits?: number;
  profile_views?: number;
  badges?: any[];
  booking_url?: string;
  contact_link?: string;
  accepts_bookings?: boolean;
  preferences?: string[];
  preferred_language?: string;
  skills?: string[];
  profile_completion?: number;
  favorite_artist_types?: string[];
  artistTypes?: string[];
  birthday?: string | null;
  communication_preferences?: string[];
  independent?: boolean;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole;
  loading: boolean;
  isSignedIn: boolean;
  isNewUser: boolean;
  isError: boolean;
  clearIsNewUser: () => void;
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string, userData: any) => void;
  signOut: () => void;
  refreshUserProfile: () => Promise<any>;
  updateUserRole: (role: UserRole) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  hasRole: (role: UserRole) => boolean;
}
