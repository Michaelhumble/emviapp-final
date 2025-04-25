
export type UserRole = 'customer' | 'artist' | 'salon' | 'freelancer' | 'manager' | 'admin' | 'nail technician/artist' | 'owner' | 'vendor' | 'supplier' | 'beauty supplier' | 'renter' | 'other';

export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  role?: UserRole;
  created_at?: string;
  updated_at?: string;
  
  // Profile information
  phone?: string;
  bio?: string;
  specialty?: string;
  instagram?: string;
  website?: string;
  
  // Location data
  location?: any;
  
  // Additional properties
  credits?: number;
  referral_count?: number; 
  referral_code?: string;
  affiliate_code?: string;
  portfolio_urls?: string[];
  preferred_language?: string;
  accepts_bookings?: boolean;
  preferences?: string[];
  profile_completion?: number;
  independent?: boolean;
  badges: any[] | Json;
  booking_url?: string;
  contact_link?: string;
  completed_profile_tasks?: string[];
  boosted_until?: string;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  isLoading: boolean;
  isSignedIn: boolean;
  isError: boolean;
  error: Error | null;
  isNewUser: boolean;
  session: Session | null;
  clearIsNewUser: () => void;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: Error }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ success: boolean; error?: Error; userId?: string }>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<boolean>;
  updateUserRole?: (role: UserRole) => Promise<void>;
  updateProfile?: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: Error }>;
}
