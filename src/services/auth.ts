
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { success: true, user: data.user };
  } catch (error: any) {
    console.error("Sign in error:", error);
    return { success: false, error, user: null };
  }
}

export async function signUpWithEmail(email: string, password: string, userData: any) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });

    if (error) throw error;
    
    toast.info("Your account has been created! Please check your email for verification instructions.");

    return { success: true, user: data.user };
  } catch (error: any) {
    console.error("Sign up error:", error);
    return { success: false, error, user: null };
  }
}

export async function signOut() {
  try {
    console.log("Starting signOut process in auth service");
    
    // First, clear all local storage and session storage to ensure clean state
    const keysToRemove = [
      'artist_dashboard_tab',
      'emviapp_user_role',
      'emviapp_new_user',
      'supabase.auth.token',
      'sb-wwhqbjrhbajpabfdwnip-auth-token', // Supabase-specific token with project ref
    ];
    
    // Clear specific keys
    keysToRemove.forEach(key => {
      try {
        localStorage.removeItem(key);
        console.log(`Removed ${key} from localStorage`);
      } catch (err) {
        console.warn(`Failed to remove ${key}:`, err);
      }
    });
    
    // Try to clear session storage
    try {
      sessionStorage.clear();
      console.log("Cleared sessionStorage");
    } catch (err) {
      console.warn("Failed to clear sessionStorage:", err);
    }
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut({ scope: 'global' });
    if (error) {
      console.error("Supabase signOut error:", error);
      throw error;
    }
    
    console.log("Successfully signed out from Supabase");
    toast.success("Successfully signed out");
    return { success: true };
  } catch (error: any) {
    console.error("Sign out error:", error);
    toast.error("Sign out encountered an error. Redirecting anyway...");
    
    // Even if there's an error, we should force a clean state
    try {
      // Force clear remaining localStorage items as a fallback
      localStorage.clear();
      console.log("Forced localStorage clear");
      
      // Try a forced signOut with different options as fallback
      await supabase.auth.signOut({ scope: 'global' });
      console.log("Forced Supabase signOut");
    } catch (e) {
      console.error("Forced sign out also failed:", e);
    }
    
    return { success: false, error };
  }
}
