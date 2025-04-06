
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole, AuthContextType } from "../types";
import { Session, User } from "@supabase/supabase-js";
import { fetchUserProfile, signInWithEmailPassword, signUpWithEmailPassword, signOutUser } from "../services/authService";

// Use the correct type that matches Supabase's auth events
// But the actual value we receive is a string, not the enum itself
import { AuthChangeEvent } from "@supabase/supabase-js";

/**
 * Custom hook to handle auth provider logic
 */
export const useAuthProvider = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Compare event as a string rather than as the enum
        // 'SIGNED_UP' is the string value that Supabase sends
        if (event === 'SIGNED_UP') {
          console.log("New user signed up!");
          setIsNewUser(true);
          // Store this in localStorage as well for persistence
          localStorage.setItem('emviapp_new_user', 'true');
        }
      }
    );

    // Check for existing session
    const getInitialSession = async () => {
      try {
        setLoading(true);
        
        // Get the user's session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        // Check if user is new from localStorage
        const isNewUserFromStorage = localStorage.getItem('emviapp_new_user') === 'true';
        if (isNewUserFromStorage) {
          setIsNewUser(true);
        }
        
        if (initialSession?.user) {
          // Fetch the user's profile
          await fetchAndSetUserProfile(initialSession.user.id);
        }
      } catch (error) {
        console.error("Error fetching initial session:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile and set states
  const fetchAndSetUserProfile = async (userId: string) => {
    const profile = await fetchUserProfile(userId);
    if (profile) {
      setUserProfile(profile);
      setUserRole(profile.role as UserRole);
    }
  };

  // Clear the new user flag
  const clearIsNewUser = () => {
    setIsNewUser(false);
    localStorage.removeItem('emviapp_new_user');
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    return await signInWithEmailPassword(email, password);
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    const data = await signUpWithEmailPassword(email, password);
    
    // Set the new user flag
    setIsNewUser(true);
    localStorage.setItem('emviapp_new_user', 'true');
    
    return data;
  };

  // Sign out the current user
  const signOut = async () => {
    try {
      await signOutUser();
      
      // Clear user data
      setSession(null);
      setUser(null);
      setUserProfile(null);
      setUserRole(null);
    } catch (error) {
      console.error("Error in signOut:", error);
      throw error;
    }
  };

  // Refresh the user profile data
  const refreshUserProfile = async () => {
    if (user) {
      await fetchAndSetUserProfile(user.id);
    }
  };

  // The value to provide to the context consumers
  const authContextValue: AuthContextType = {
    session,
    user,
    userProfile,
    userRole,
    loading,
    isSignedIn: !!user,
    isNewUser,
    clearIsNewUser,
    signIn,
    signUp,
    signOut,
    refreshUserProfile,
  };

  return authContextValue;
};
