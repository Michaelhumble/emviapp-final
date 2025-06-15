import React, { useState, useEffect, ReactNode, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "./AuthContext";
import { UserProfile, UserRole } from "./types";
import { normalizeRole } from "@/utils/roles";
import { fetchFreshProfileData } from "./utils/profileFetcher";
import { signInWithEmail, signOut, signUpWithEmail } from "@/services/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const clearIsNewUser = useCallback(() => {
    setIsNewUser(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setIsError(false);
    try {
      const { success, user: signedInUser, error } = await signInWithEmail(email, password);
      if (success && signedInUser) {
        setUser(signedInUser);
        setIsSignedIn(true);
        await refreshUserProfile();
        return { success: true };
      } else {
        setIsError(true);
        return { success: false, error: error };
      }
    } catch (error: any) {
      setIsError(true);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    setLoading(true);
    setIsError(false);
    try {
      const { success, user: signedUpUser, error } = await signUpWithEmail(email, password, userData);
      if (success && signedUpUser) {
        setUser(signedUpUser);
        setIsNewUser(true);
        setIsSignedIn(true);
        await refreshUserProfile();
        return { success: true, userId: signedUpUser.id };
      } else {
        setIsError(true);
        return { success: false, error: error };
      }
    } catch (error: any) {
      setIsError(true);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (role: UserRole) => {
    if (!user?.id) return;

    try {
      setLoading(true);
      await supabase.auth.updateUser({
        data: { role: role }
      });

      await supabase
        .from('users')
        .update({ role: role })
        .eq('id', user.id);

      setUserRole(role);
      if (userProfile) {
        setUserProfile({ ...userProfile, role: role });
      }
      localStorage.setItem('emviapp_user_role', role);
    } catch (error) {
      console.error("Error updating user role:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user?.id) return { success: false };

    setLoading(true);
    setIsError(false);

    try {
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id);

      if (error) {
        setIsError(true);
        console.error("Profile update error:", error);
        return { success: false, error };
      }

      // Optimistically update local state
      setUserProfile(prevProfile => prevProfile ? { ...prevProfile, ...data } : null);
      return { success: true };
    } catch (error: any) {
      setIsError(true);
      console.error("Profile update error:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const refreshUserProfile = async (): Promise<boolean> => {
    if (!user?.id) return false;
    
    try {
      const { profile, role } = await fetchFreshProfileData(user.id);
      if (profile) {
        // Type cast the profile data to match UserProfile interface
        const typedProfile: UserProfile = {
          ...profile,
          role: profile.role as UserRole,
          badges: Array.isArray(profile.badges) ? profile.badges as string[] : null
        };
        setUserProfile(typedProfile);
        setUserRole(role);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error refreshing profile:", error);
      return false;
    }
  };

  const signOutAction = async () => {
    setLoading(true);
    setIsError(false);
    try {
      const { success, error } = await signOut();
      if (success) {
        setUser(null);
        setSession(null);
        setUserProfile(null);
        setUserRole(null);
        setIsSignedIn(false);
        return;
      } else {
        setIsError(true);
        console.error("Sign out error:", error);
      }
    } catch (error) {
      setIsError(true);
      console.error("Sign out error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const getInitialSession = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setIsSignedIn(!!session?.user);
        }

        if (session?.user) {
          await refreshUserProfile();
        }
      } catch (error) {
        console.error("Error fetching initial session:", error);
        setIsError(true);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    return () => {
      mounted = false;
    };
  }, [refreshUserProfile]);

  const value = {
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
    signIn,
    signOut: signOutAction,
    signUp,
    updateProfile,
    updateUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
