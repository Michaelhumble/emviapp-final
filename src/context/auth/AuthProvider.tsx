import React, { createContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType, UserProfile, UserRole } from "./types";
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { normalizeUserProfile } from "@/utils/auth/normalizeProfile";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
AuthContext.displayName = 'AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const clearIsNewUser = () => {
    setIsNewUser(false);
  };

  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return normalizeUserProfile(data);
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  const refreshUserProfile = async (): Promise<boolean> => {
    if (!user?.id) return false;
    
    try {
      const profile = await fetchUserProfile(user.id);
      setUserProfile(profile);
      if (profile?.role) {
        setUserRole(profile.role);
      }
      return true;
    } catch (error) {
      console.error('Error refreshing user profile:', error);
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        console.error('Sign-in error:', error);
        setIsError(true);
        return { success: false, error };
      }

      setIsSignedIn(true);
      return { success: true };
    } catch (error: any) {
      console.error('Unexpected sign-in error:', error);
      setIsError(true);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setUserProfile(null);
      setUserRole(null);
      setIsSignedIn(false);
      console.log('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: any = {}) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: userData,
        },
      });

      if (error) {
        console.error('Signup error:', error);
        setIsError(true);
        return { success: false, error };
      }

      setIsSignedIn(true);
      setIsNewUser(true);
      return { success: true, userId: data.user?.id };
    } catch (error: any) {
      console.error('Unexpected signup error:', error);
      setIsError(true);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      setLoading(true);
      if (!user?.id) throw new Error("User ID is missing.");

      const { data: profileData, error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Profile update error:', error);
        return { success: false, error };
      }

      // Fetch and set the updated profile
      await refreshUserProfile();
      return { success: true };
    } catch (error: any) {
      console.error('Unexpected profile update error:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (role: UserRole) => {
    try {
      setLoading(true);
      if (!user) throw new Error("User not authenticated.");

      // Update user metadata
      const { data, error } = await supabase.auth.updateUser({
        data: { role: role },
      });

      if (error) {
        console.error("Error updating user role in auth metadata:", error);
        throw error;
      }

      // Update user profile in database
      const { error: profileError } = await supabase
        .from('users')
        .update({ role: role })
        .eq('id', user.id);

      if (profileError) {
        console.error("Error updating user role in database:", profileError);
        throw profileError;
      }

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

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log('Auth state change:', event, session?.user?.id);
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          setUserProfile(profile);
          if (profile?.role) {
            setUserRole(profile.role);
          }
          
          if (event === 'SIGNED_UP') {
            setIsNewUser(true);
          }
        } else {
          setUserProfile(null);
          setUserRole(null);
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        setUserProfile(profile);
        if (profile?.role) {
          setUserRole(profile.role);
        }
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = {
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
    signOut,
    signUp,
    updateProfile,
    updateUserRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
