import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Hook to handle authentication methods with improved error handling
 */
export const useAuthMethods = (setLoading: (loading: boolean) => void) => {
  const signIn = async (email: string, password: string) => {
    try {
      console.log('[Auth] Signing in user:', email);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      console.log('[Auth] Sign in successful');
      toast.success("Signed in successfully!");
      return { data, error: null };
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error(error.message || "Failed to sign in");
      return { data: null, error };
    } finally {
      // Don't set loading false here - it will be handled by the auth state change
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log('[Auth] Signing up new user:', email);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Mark as new user in localStorage
      localStorage.setItem('emviapp_new_user', 'true');
      
      console.log('[Auth] Sign up successful');
      toast.success("Account created successfully!");
      return { data, error: null };
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(error.message || "Failed to sign up");
      return { data: null, error };
    } finally {
      // Don't set loading false here - it will be handled by the auth state change
    }
  };

  /**
   * Completely sign out the user and clear all auth-related data
   */
  const signOut = async () => {
    try {
      console.log('[Auth] Signing out user');
      setLoading(true);
      
      // Clear any auth-related localStorage items first
      localStorage.removeItem('emviapp_user_role');
      localStorage.removeItem('emviapp_new_user');
      localStorage.removeItem('emviapp_session');
      
      // Other app-specific storage items
      localStorage.removeItem('lastProfileRefresh');
      localStorage.removeItem('dashboardPreferences');
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      console.log('[Auth] Sign out successful');
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Error in signOut:", error);
      toast.error("Failed to sign out");
      
      // Force reset session data even if Supabase signOut fails
      try {
        await supabase.auth.setSession({ access_token: '', refresh_token: '' });
      } catch (e) {
        console.error("Failed to reset session:", e);
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    signOut
  };
};
