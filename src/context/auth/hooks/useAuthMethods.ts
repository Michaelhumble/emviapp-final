
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Hook to handle authentication methods
 */
export const useAuthMethods = (setLoading: (loading: boolean) => void) => {
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success("Signed in successfully!");
      return data;
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error(error.message || "Failed to sign in");
      throw error;
    } finally {
      // Don't set loading false here - it will be handled by the auth state change
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      localStorage.setItem('emviapp_new_user', 'true');
      
      toast.success("Account created successfully!");
      return data;
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(error.message || "Failed to sign up");
      throw error;
    } finally {
      // Don't set loading false here - it will be handled by the auth state change
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Error in signOut:", error);
      toast.error("Failed to sign out");
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
