
import { User } from "@supabase/supabase-js";

// Define UserRole directly in this file
export type UserRole = 
  | "artist" 
  | "customer" 
  | "salon" 
  | "owner" 
  | "vendor" 
  | "supplier" 
  | "beauty supplier" 
  | "freelancer" 
  | "nail technician/artist"
  | "renter"
  | "other"
  | null;

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  isSignedIn: boolean;
  isError: boolean; 
  signIn: (email: string, password: string) => Promise<any>; // Changed to any to accept different return types
  signUp: (email: string, password: string) => Promise<any>; // Changed to any to accept different return types
  signOut: () => Promise<void>;
  updateUserRole: (role: UserRole) => Promise<void>;
  refreshUserProfile: () => Promise<boolean>; // Keep boolean return for flexibility
}

// Comprehensive UserProfile interface with all possible properties used throughout the app
export interface UserProfile {
  // Core Fields
  id?: string;
  user_id?: string;
  email?: string | null;
  full_name?: string | null;
  phone?: string;
  bio?: string;
  avatar_url?: string | null;
  location?: string;
  
  // Social Media
  instagram?: string;
  website?: string;
  
  // Professional Information
  role?: string;
  custom_role?: string;
  specialty?: string;
  salon_name?: string;
  company_name?: string;
  
  // Portfolio & Gallery
  portfolio_urls?: string[];
  gallery?: string[];
  
  // Timing & Dates
  created_at?: number | string;
  updated_at?: number | string;
  lastSeen?: number;
  years_experience?: number;
  boosted_until?: string;
  
  // Services & Bookings
  accepts_bookings?: boolean;
  booking_url?: string;
  services?: any[];
  servicesOffered?: string[];
  
  // Stats & Metrics
  credits?: number;
  profile_views?: number;
  averageRating?: number;
  referral_code?: string;
  referral_count?: number;
  
  // Settings & Preferences
  preferred_language?: string;
  account_type?: string;
  skills?: string[];
  badges?: any;
  contact_link?: string;
  preferences?: string[];
  completed_profile_tasks?: string[];
  
  // Deprecated Fields (kept for backward compatibility)
  uid?: string;
  displayName?: string | null;
  photoURL?: string | null;
  reviews?: string[];
  
  // Payment Related Fields
  pricing?: {
    hourlyRate?: number;
    fixedProject?: number;
  };
  paymentPreferences?: {
    paypal?: string;
    venmo?: string;
    cashApp?: string;
  };
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  stripeCurrentPeriodEnd?: number;
  
  // Scheduling
  schedulingOptions?: {
    availability?: string[];
    bookingLink?: string;
  };
  
  // Additional Fields
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  additionalNotes?: string;
  is_active?: boolean;
  emailVerified?: boolean;
  username?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  birthDate?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  affiliate_code?: string;
}
