
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
    // First, clear all local storage and session storage to ensure clean state
    const keysToRemove = [
      'artist_dashboard_tab',
      'emviapp_user_role',
      'emviapp_new_user',
      'supabase.auth.token',
      'sb-wwhqbjrhbajpabfdwnip-auth-token', // Supabase-specific token with project ref
    ];
    
    // Clear specific keys
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Clear session storage
    sessionStorage.clear();
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut({ scope: 'global' });
    if (error) throw error;
    
    toast.success("Successfully signed out");
    return { success: true };
  } catch (error: any) {
    console.error("Sign out error:", error);
    toast.error("Sign out encountered an error. Redirecting anyway...");
    
    // Even if there's an error, we should force a clean state
    try {
      // Force clear remaining localStorage items as a fallback
      localStorage.clear();
      
      // Try a forced signOut with different options as fallback
      await supabase.auth.signOut({ scope: 'global' });
    } catch (e) {
      console.error("Forced sign out also failed:", e);
    }
    
    return { success: false, error };
  }
}
