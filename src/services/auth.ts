
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
    // Clear all app-specific local storage items first
    localStorage.removeItem('artist_dashboard_tab');
    localStorage.removeItem('emviapp_user_role');
    localStorage.removeItem('emviapp_new_user');
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.clear(); // Clear any session storage as well
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    toast.success("Successfully signed out");
    return { success: true };
  } catch (error: any) {
    console.error("Sign out error:", error);
    toast.error("Sign out encountered an error. Redirecting anyway...");
    
    // Even if there's an error, we should force clear auth state
    try {
      // Force clear supabase session
      await supabase.auth.signOut({ scope: 'global' });
    } catch (e) {
      console.error("Forced sign out also failed:", e);
    }
    
    return { success: false, error };
  }
}
