
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "../types";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

/**
 * Get user profile data from auth user metadata
 */
export const getUserProfileFromMetadata = (user: User | null) => {
  if (!user) return null;
  
  return {
    id: user.id,
    email: user.email || '',
    full_name: user.user_metadata?.full_name || '',
    role: user.user_metadata?.role || user.user_metadata?.user_type || 'customer',
    created_at: user.created_at,
    updated_at: user.updated_at,
    // Add other fields as needed from metadata
    phone: user.user_metadata?.phone || null,
    location: user.user_metadata?.location || null,
    bio: user.user_metadata?.bio || null,
    website: user.user_metadata?.website || null,
    instagram: user.user_metadata?.instagram || null,
    credits: user.user_metadata?.credits || 0,
    referral_code: user.user_metadata?.referral_code || null,
    referred_by: user.user_metadata?.referred_by || null
  };
};

/**
 * Sign in with email and password
 */
export const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // Show success toast
    toast.success("Signed in successfully!");
    
    return data;
  } catch (error) {
    console.error("Error signing in:", error);
    toast.error(error.message || "Failed to sign in");
    throw error;
  }
};

/**
 * Sign up with email and password
 */
export const signUpWithEmailPassword = async (
  email: string, 
  password: string, 
  userData: { role: UserRole; full_name?: string; [key: string]: any }
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });

    if (error) {
      throw error;
    }

    // Show success toast
    toast.success("Account created successfully!");
    
    return data;
  } catch (error) {
    console.error("Error signing up:", error);
    toast.error(error.message || "Failed to sign up");
    throw error;
  }
};

/**
 * Sign out the current user
 */
export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    toast.error("Failed to sign out");
    throw error;
  }
};
