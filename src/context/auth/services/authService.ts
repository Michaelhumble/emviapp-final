
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole } from "../types";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

/**
 * Fetch user profile from the database
 */
export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    if (data) {
      // Cast data to UserProfile with type assertion
      return data as unknown as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
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
export const signUpWithEmailPassword = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
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
