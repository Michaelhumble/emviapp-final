
import { AuthResponse } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Custom hook to handle auth methods
 */
export const useAuthMethods = (setLoading: (loading: boolean) => void) => {
  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (response.error) {
        toast.error(response.error.message);
      }
      
      return response;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign up with email and password
   */
  const signUp = async (email: string, password: string): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (response.error) {
        toast.error(response.error.message);
      } else {
        toast.success("Verification email sent! Please check your inbox.");
      }
      
      return response;
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign out with fallback cleanup
   */
  const signOut = async (): Promise<void> => {
    setLoading(true);
    try {
      console.log("[Auth] Signing out user");
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("[Auth] Sign out error:", error);
        toast.error("Error signing out. Performing force logout.");
        
        // Fallback: Clear local storage manually if signOut fails
        localStorage.removeItem('sb-supabase-auth-token');
        localStorage.removeItem('emviapp_user_role');
        localStorage.removeItem('emviapp_new_user');
        localStorage.removeItem('emviapp_session');
        
        // Force reload to clear all state
        window.location.href = "/";
      } else {
        console.log("[Auth] Sign out successful");
        // No toast here - will be handled by the redirect component
      }
    } catch (error) {
      console.error("[Auth] Unexpected sign out error:", error);
      
      // Emergency fallback
      localStorage.clear();
      window.location.href = "/";
    } finally {
      setLoading(false);
    }
  };

  return { signIn, signUp, signOut };
};
