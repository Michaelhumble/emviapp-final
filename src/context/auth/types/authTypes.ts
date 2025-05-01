
import { Session, User } from "@supabase/supabase-js";

/**
 * Available user roles in the application
 * 
 * @description Defines all possible user roles within the system
 */
export type UserRole = 
  | "customer" 
  | "artist" 
  | "salon" 
  | "freelancer" 
  | "owner" 
  | "supplier" 
  | "admin"
  | "nail technician/artist"
  | "beauty supplier"
  | "salon owner"
  | "vendor"
  | "manager"
  | "renter"
  | "other";

/**
 * User profile data structure
 * 
 * @description Defines the structure for user profile data stored in the database
 */
export interface UserProfile {
  /** Unique identifier (matches auth.user.id) */
  id: string;
  
  /** User's email address */
  email: string;
  
  /** User's role in the system */
  role?: UserRole;
  
  /** User's first name */
  first_name?: string;
  
  /** User's last name */
  last_name?: string;
  
  /** User's full name (displayed in UI) */
  full_name?: string;
  
  /** User's avatar/profile image URL */
  avatar_url?: string;
  
  /** User's bio/description */
  bio?: string;
  
  /** User's professional specialty */
  specialty?: string;
  
  /** User's geographical location */
  location?: string;
  
  /** User's Instagram handle */
  instagram?: string;
  
  /** User's website URL */
  website?: string;
  
  /** User's preferred language */
  language_preference?: string;
  preferred_language?: string;
  
  /** User's referral/affiliate code */
  referral_code?: string;
  
  /** User's personal rating (e.g., for artists) */
  rating?: number;
  
  /** Timestamp when the profile was created */
  created_at?: string;
  
  /** Timestamp when the profile was last updated */
  updated_at?: string;
  
  /** Whether the profile is publicly visible */
  is_public?: boolean;
  
  /** Record of who referred this user */
  referred_by?: string;
  
  /** User's phone number */
  phone?: string;
  
  /** Whether the profile has been verified */
  verified?: boolean;
  
  /** Username for public profiles */
  username?: string;
  
  /** The code used by another user to refer this user */
  referred_by_referral_code?: string;
  
  /** Affiliate code for marketing purposes */
  affiliate_code?: string;
  
  /** Whether the user is independent (for artists/professionals) */
  independent?: boolean;
  
  /** User's credits in the system */
  credits?: number;
  
  /** Credits earned in the current month */
  creditsThisMonth?: number;
  
  /** Count of users referred */
  referral_count?: number;
  
  /** User preferences */
  preferences?: string[];
  
  /** Favorite artist types */
  favorite_artist_types?: string[];
  artistTypes?: string[];
  
  /** Portfolio image URLs */
  portfolio_urls?: string[];
  
  /** Whether the user is boosted (premium) */
  boosted_until?: string;
  
  /** Completed profile tasks */
  completed_profile_tasks?: string[];
  
  /** Booking URL */
  booking_url?: string;
  
  /** Skills */
  skills?: string[];
  
  /** Custom role description */
  custom_role?: string;
  
  /** Contact link */
  contact_link?: string;
  
  /** Achievement badges */
  badges?: string[];
  
  /** Whether the user accepts bookings */
  accepts_bookings?: boolean;
  
  /** Years of experience */
  years_experience?: number;
  
  /** Professional name */
  professional_name?: string;
  
  /** Salon name for salon owners */
  salon_name?: string;
  
  /** Company name for business owners */
  company_name?: string;
}

/**
 * Credentials for sign-in functionality
 */
export interface LoginCredentials {
  /** User's email address */
  email: string;
  
  /** User's password */
  password: string;
}

/**
 * Extended credentials for sign-up functionality
 */
export interface SignUpCredentials extends LoginCredentials {
  /** Additional user data for registration */
  [key: string]: any;
}

/**
 * Authentication context type definition
 * Provides authentication state and methods throughout the app
 */
export interface AuthContextType {
  /** Current authenticated user */
  user: User | null;
  
  /** Detailed profile data for the current user */
  userProfile: UserProfile | null;
  
  /** Current user's role in the system */
  userRole: UserRole;
  
  /** Current authentication session */
  session: Session | null;
  
  /** Whether authentication data is still loading */
  loading: boolean;
  
  /** Whether user is currently signing in */
  loggingIn: boolean;
  
  /** Whether user is currently signing out */
  loggingOut: boolean;
  
  /** Whether user is currently signing up */
  signingUp?: boolean;
  
  /** Whether the user is authenticated */
  isSignedIn: boolean;
  
  /** Whether there was an error fetching profile */
  isError: boolean;
  
  /** Whether the user just registered */
  isNewUser?: boolean;
  
  /** Function to clear the new user flag */
  clearIsNewUser?: () => void;
  
  /** Any authentication error that occurred */
  error?: Error | null;

  /**
   * Sign in with credentials
   * @param credentials - User login credentials
   */
  signIn: (credentials: LoginCredentials) => Promise<{ user: User | null; error: Error | null }>;
  
  /**
   * Sign up with credentials
   * @param credentials - User registration data
   */
  signUp: (credentials: SignUpCredentials) => Promise<{ user: User | null; error: Error | null }>;
  
  /**
   * Sign out the current user
   */
  signOut: () => Promise<void>;
  
  /**
   * Refresh the user profile data
   */
  refreshUserProfile: () => Promise<void>;
  
  /**
   * Update the user's role
   * @param role - New role to set
   */
  updateUserRole: (role: UserRole) => Promise<void>;
  
  /**
   * Update user profile data
   * @param data - Profile data to update
   */
  updateProfile?: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: Error }>;
  
  /**
   * Check if user has a specific role
   * @param role - Role to check
   */
  hasRole: (role: UserRole | UserRole[]) => boolean;
}
