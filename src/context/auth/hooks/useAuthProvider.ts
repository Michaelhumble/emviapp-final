import { useState, useEffect } from "react";
import { User, Session, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole } from "../types";
import { normalizeRole } from "@/utils/roles";
import { fetchFreshProfileData } from "../utils/profileFetcher";

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const clearIsNewUser = () => {
    setIsNewUser(false);
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        setIsError(true);
        return { success: false, error };
      }

      setUser(data.user);
      setSession(data.session);
      setIsSignedIn(true);
      setIsError(false);
      return { success: true };
    } catch (error: any) {
      console.error("Unexpected sign-in error:", error);
      setIsError(true);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
      }
      setUser(null);
      setSession(null);
      setUserProfile(null);
      setUserRole(null);
      setIsSignedIn(false);
      localStorage.removeItem('emviapp_user_role');
      return;
    } catch (error) {
      console.error("Unexpected sign-out error:", error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) {
        console.error("Sign up error:", error);
        setIsError(true);
        return { success: false, error };
      }

      setUser(data.user);
      setSession(data.session);
      setIsNewUser(true);
      setIsSignedIn(true);
      setIsError(false);
      return { success: true, userId: data.user?.id };
    } catch (error: any) {
      console.error("Unexpected sign-up error:", error);
      setIsError(true);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user?.id) {
      console.error("User ID is missing, cannot update profile.");
      return { success: false, error: new Error("User ID is missing") };
    }

    setLoading(true);
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id)
        .select('*')
        .single();

      if (profileError) {
        console.error("Profile update error:", profileError);
        setIsError(true);
        return { success: false, error: profileError };
      }

      // Optimistically update local state
      setUserProfile(profileData as UserProfile);
      setIsError(false);
      return { success: true };
    } catch (error: any) {
      console.error("Unexpected profile update error:", error);
      setIsError(true);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (role: UserRole) => {
    if (!user?.id) {
      console.warn("No user ID found, cannot update role.");
      return;
    }

    try {
      // Optimistically update local storage
      localStorage.setItem('emviapp_user_role', role);

      // Sync role to auth.data (don't wait for this)
      supabase.auth.updateUser({
        data: { role }
      }).then(() => {
        console.log("User role updated in auth.data:", role);
      }).catch(err => {
        console.warn("Failed to update auth metadata with role:", err);
      });

      // Sync role to database (don't wait for this)
      supabase
        .from('users')
        .update({ role })
        .eq('id', user.id)
        .then(() => {
          console.log("User role updated in database:", role);
        })
        .catch(err => {
          console.warn("Failed to update database with role:", err);
        });

      // Update local state
      setUserRole(role);
      if (userProfile) {
        setUserProfile({ ...userProfile, role });
      }
    } catch (error) {
      console.error("Error updating user role:", error);
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

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (!mounted) return;

        console.log("Auth state changed:", event, session?.user?.id);
        
        setSession(session);
        setUser(session?.user ?? null);
        setIsSignedIn(!!session?.user);

        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          if (session?.user) {
            setTimeout(() => {
              if (mounted) refreshUserProfile();
            }, 0);
          }
        } else if (event === "SIGNED_OUT") {
          setUserProfile(null);
          setUserRole(null);
          setIsNewUser(false);
          localStorage.removeItem('emviapp_user_role');
        }

        setLoading(false);
      }
    );

    // Initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setIsSignedIn(!!session?.user);
        if (session?.user) {
          refreshUserProfile();
        }
        setLoading(false);
      }
    }).catch(err => {
      console.error("Error getting initial session:", err);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

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
    signIn,
    signOut,
    signUp,
    updateProfile,
    updateUserRole,
    refreshUserProfile,
  };
};
