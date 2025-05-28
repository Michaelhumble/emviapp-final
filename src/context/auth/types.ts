
import { User, Session } from '@supabase/supabase-js';

export type UserRole = 
  | 'artist' 
  | 'nail technician/artist'
  | 'salon'
  | 'owner'
  | 'freelancer'
  | 'customer'
  | 'supplier'
  | 'beauty supplier'
  | 'manager'
  | 'renter'
  | 'other';

export interface UserProfile {
  id: string;
  full_name?: string;
  email: string;
  phone?: string;
  bio?: string;
  specialty?: string;
  location?: string;
  avatar_url?: string;
  role?: UserRole;
  created_at: string;
  updated_at: string;
  instagram?: string;
  website?: string;
  salon_name?: string;
  company_name?: string;
  preferred_language?: string;
  profile_views?: number;
  account_type?: string;
  referral_code?: string;
  affiliate_code?: string;
  referral_count?: number;
  booking_url?: string;
  boosted_until?: string | null;
  skills?: string[];
  portfolio_urls?: string[];
  credits?: number;
  creditsThisMonth?: number;
  custom_role?: string;
  contact_link?: string;
  badges?: string[];
  accepts_bookings?: boolean;
  preferences?: string[];
  completed_profile_tasks?: string[];
  years_experience?: number;
  professional_name?: string;
  profile_completion?: number;
  user_id?: string;
  username?: string;
  independent?: boolean;
  favorite_artist_types?: string[];
  artistTypes?: string[];
  birthday?: string | null;
  communication_preferences?: string[];
  commPrefs?: string[];
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  isSignedIn: boolean;
  loading: boolean;
  isNewUser: boolean;
  clearIsNewUser: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}
