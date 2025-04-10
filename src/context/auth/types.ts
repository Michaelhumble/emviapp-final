
import { User } from "@supabase/supabase-js";
import { UserProfile } from "@/types/profile";

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
  isError: boolean; // Added this property
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ user: User | null; error: Error | null }>;
  signOut: () => Promise<void>;
  updateUserRole: (role: UserRole) => Promise<void>;
  refreshUserProfile: () => Promise<boolean>; // Changed return type to boolean
}

export type { UserProfile };
