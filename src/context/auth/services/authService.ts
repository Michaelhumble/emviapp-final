
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole } from "../types";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

/**
 * Fetch user profile from the database
 * 
 * @param {string} userId - The user ID to fetch the profile for
 * @returns {Promise<UserProfile | null>} The user profile or null if not found
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
 * 
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @returns {Promise<{ data: any, user: User | null }>} Authentication result with user data
 * @throws {Error} If authentication fails
 */
export const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    console.log(`Attempting to sign in user: ${email}`);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Authentication error:", error.message);
      throw error;
    }

    // Show success toast
    toast.success("Signed in successfully!");
    console.log("User signed in successfully:", data.user?.id);
    
    return data;
  } catch (error) {
    console.error("Error signing in:", error);
    toast.error(error.message || "Failed to sign in");
    throw error;
  }
};

/**
 * Sign up with email and password
 * 
 * @param {string} email - The user's email address
 * @param {string} password - The desired password
 * @returns {Promise<{ data: any, user: User | null }>} Registration result with user data
 * @throws {Error} If registration fails
 */
export const signUpWithEmailPassword = async (email: string, password: string) => {
  try {
    console.log(`Attempting to create new user: ${email}`);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Registration error:", error.message);
      throw error;
    }

    // Show success toast
    toast.success("Account created successfully!");
    console.log("User registered successfully:", data.user?.id);
    
    return data;
  } catch (error) {
    console.error("Error signing up:", error);
    toast.error(error.message || "Failed to sign up");
    throw error;
  }
};

/**
 * Sign out the current user
 * 
 * @returns {Promise<boolean>} True if sign out was successful
 * @throws {Error} If sign out fails
 */
export const signOutUser = async () => {
  try {
    console.log("Signing out user");
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Sign out error:", error.message);
      throw error;
    }
    
    console.log("User signed out successfully");
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    toast.error("Failed to sign out");
    throw error;
  }
};
