
import { AuthResponse } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserRole } from "@/context/auth/types";
import { normalizeUserRole } from "@/utils/roleUtils";
import { getUserRole } from "@/utils/getUserRole";
import { navigateToRoleDashboard } from "@/utils/navigation";

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
      } else {
        // After successful login, check if we need to synchronize roles
        if (response.data.user) {
          try {
            console.log(`[Auth] User logged in: ${response.data.user.id}`);
            
            // Get user role using our dedicated utility
            const userRole = await getUserRole(response.data.user.id);
            console.log(`[Auth] Detected user role for routing: ${userRole || 'none'}`);
            
            // If no role, user will be directed to choose one later
            if (!userRole) {
              console.warn("[Auth] No role found for logged in user - will prompt to choose role");
              toast.info("Please select your role to continue");
            }
          } catch (syncError) {
            console.error("[Auth] Role sync error:", syncError);
            // Non-blocking error - don't prevent login
          }
        }
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
  const signUp = async (email: string, password: string, role?: UserRole): Promise<AuthResponse> => {
    setLoading(true);
    try {
      // Use the provided role directly without normalizing first
      // (we'll normalize later if needed)
      console.log(`[SignUp] Using explicitly provided role: ${role || 'none provided'}`);
      
      // Sign up with auth API, including role in metadata
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            email: email,
            role: role // Store role directly in auth metadata
          }
        }
      });
      
      if (response.error) {
        toast.error(response.error.message);
      } else if (response.data.user && role) {
        // Successfully created auth user, now ensure role is set in users table
        console.log(`[SignUp] Setting role in users table for user ${response.data.user.id}: ${role}`);
        
        // Update role in the users table
        const { error: updateError } = await supabase
          .from('users')
          .update({ role: role })
          .eq('id', response.data.user.id);
          
        if (updateError) {
          console.error("[SignUp] Error saving role to users table:", updateError);
          toast.error("Account created but role preference could not be saved. Please update your profile.");
        } else {
          console.log("[SignUp] Role saved successfully to both auth and users table");
          toast.success("Verification email sent! Please check your inbox.");
        }
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
