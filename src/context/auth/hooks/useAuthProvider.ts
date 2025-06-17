import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AuthChangeEvent } from "@supabase/supabase-js";
import { UserRole, UserProfile } from "../types";
import { useAuthMethods } from "./useAuthMethods";
import { getUserProfileFromMetadata } from "../services/authService";

export const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const { signIn, signUp, signOut } = useAuthMethods(setLoading);

  // Clear new user flag
  const clearIsNewUser = () => {
    setIsNewUser(false);
    localStorage.removeItem('emviapp_new_user');
  };

  // Refresh user profile data
  const refreshUserProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const profile = getUserProfileFromMetadata(session.user);
        setUserProfile(profile);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error refreshing user profile:", error);
      return false;
    }
  };

  // Update profile function
  const updateProfile = async (data) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: data
      });
      
      if (error) throw error;
      
      // Refresh profile after update
      await refreshUserProfile();
      toast.success("Profile updated successfully!");
      return { success: true };
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Update user role
  const updateUserRole = async (role) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: { role }
      });
      
      if (error) throw error;
      
      await refreshUserProfile();
      toast.success("Role updated successfully!");
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
      throw error;
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          setIsError(true);
        } else if (isMounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            const profile = getUserProfileFromMetadata(session.user);
            setUserProfile(profile);
          }
          
          // Check if this is a new user
          const newUserFlag = localStorage.getItem('emviapp_new_user');
          if (newUserFlag === 'true' && session?.user) {
            setIsNewUser(true);
          }
        }
      } catch (error) {
        console.error("Session initialization error:", error);
        if (isMounted) {
          setIsError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session) => {
        if (!isMounted) return;
        
        console.log("Auth state change:", event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        setIsError(false);

        if (session?.user) {
          const profile = getUserProfileFromMetadata(session.user);
          setUserProfile(profile);
          
          // Check for new user flag
          const newUserFlag = localStorage.getItem('emviapp_new_user');
          if (newUserFlag === 'true') {
            setIsNewUser(true);
          }
        } else {
          setUserProfile(null);
          setIsNewUser(false);
        }

        // Only set loading to false after we've processed the auth change
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
          setLoading(false);
        }
      }
    );

    // Initialize session
    getInitialSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Computed values
  const isSignedIn = !!session?.user;
  const userRole = userProfile?.role as UserRole || 'customer';

  return {
    user,
    session,
    userProfile,
    userRole,
    loading,
    isSignedIn,
    isError,
    isNewUser,
    clearIsNewUser,
    setLoading,
    refreshUserProfile,
    signIn: async (email, password) => {
      const result = await signIn(email, password);
      return { success: !result.error, error: result.error };
    },
    signOut,
    signUp: async (email, password, userData) => {
      const result = await signUp(email, password);
      return { 
        success: !result.error, 
        error: result.error,
        userId: result.data?.user?.id 
      };
    },
    updateProfile,
    updateUserRole
  };
};
