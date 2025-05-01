
import { User } from '@supabase/supabase-js';

/**
 * Represents the possible user roles in the application
 * @description These roles determine access levels and dashboard routing
 */
export type UserRole = 
  | 'customer'      // Regular users browsing and booking services
  | 'artist'        // Nail technicians and beauty artists
  | 'salon'         // Salon businesses
  | 'owner'         // Owner of salon businesses
  | 'manager'       // Manager of salon businesses
  | 'admin'         // Application administrators
  | 'freelancer'    // Independent beauty professionals
  | 'nail technician/artist' // Specialized nail artists
  | 'beauty supplier' // Beauty product suppliers
  | 'supplier'      // General suppliers
  | 'vendor'        // Vendors selling products/services
  | 'renter'        // Booth/chair renters
  | 'other';        // Other user types

/**
 * User profile data structure
 * @description Extended user information beyond auth data
 */
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  role?: UserRole;
  avatar_url?: string;
  bio?: string;
  specialty?: string;
  location?: string;
  referral_code?: string;
  portfolio_urls?: string[];
  [key: string]: any;
}

/**
 * Auth context data and methods
 * @description Provides authentication state and functions throughout the app
 */
export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole;
  loading: boolean;
  isSignedIn: boolean;
  isError: boolean;
  isNewUser: boolean;
  clearIsNewUser: () => void;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: Error }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ success: boolean; error?: Error; userId?: string }>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<boolean>;
  updateUserRole: (role: UserRole) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: Error }>;
}
