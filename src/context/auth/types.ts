
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
  isError: boolean; 
  signIn: (email: string, password: string) => Promise<any>; // Changed return type
  signUp: (email: string, password: string) => Promise<any>; // Changed return type
  signOut: () => Promise<void>;
  updateUserRole: (role: UserRole) => Promise<void>;
  refreshUserProfile: () => Promise<boolean>; // Keep boolean return type
}

export type { UserProfile };
