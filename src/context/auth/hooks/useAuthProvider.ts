
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole, AuthContextType } from "../types";
import { Session, User } from "@supabase/supabase-js";
import { fetchUserProfile, signInWithEmailPassword, signUpWithEmailPassword, signOutUser } from "../services/authService";

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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Compare directly to the string value instead of using AuthChangeEvent as a value
        if (event === 'SIGNED_UP') {
          console.log("New user signed up!");
          setIsNewUser(true);
          localStorage.setItem('emviapp_new_user', 'true');
        }
      }
    );

    const getInitialSession = async () => {
      try {
        setLoading(true);
        
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        const isNewUserFromStorage = localStorage.getItem('emviapp_new_user') === 'true';
        if (isNewUserFromStorage) {
          setIsNewUser(true);
        }
        
        if (initialSession?.user) {
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

  const fetchAndSetUserProfile = async (userId: string) => {
    const profile = await fetchUserProfile(userId);
    if (profile) {
      setUserProfile(profile);
      setUserRole(profile.role as UserRole);
    }
  };

  const clearIsNewUser = () => {
    setIsNewUser(false);
    localStorage.removeItem('emviapp_new_user');
  };

  const signIn = async (email: string, password: string) => {
    return await signInWithEmailPassword(email, password);
  };

  const signUp = async (email: string, password: string) => {
    const data = await signUpWithEmailPassword(email, password);
    
    setIsNewUser(true);
    localStorage.setItem('emviapp_new_user', 'true');
    
    return data;
  };

  const signOut = async () => {
    try {
      await signOutUser();
      
      setSession(null);
      setUser(null);
      setUserProfile(null);
      setUserRole(null);
    } catch (error) {
      console.error("Error in signOut:", error);
      throw error;
    }
  };

  const refreshUserProfile = async () => {
    if (user) {
      await fetchAndSetUserProfile(user.id);
    }
  };

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
