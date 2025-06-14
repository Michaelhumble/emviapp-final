
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, UserProfile, UserRole } from './types';
import { normalizeRole } from '@/utils/roles';
import { normalizeUserProfile } from '@/utils/profileNormalization';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  // Check for new user flag
  useEffect(() => {
    const newUserFlag = localStorage.getItem('emviapp_new_user');
    if (newUserFlag === 'true') {
      setIsNewUser(true);
    }
  }, []);

  const clearIsNewUser = () => {
    setIsNewUser(false);
    localStorage.removeItem('emviapp_new_user');
  };

  const fetchUserProfile = async (userId: string): Promise<boolean> => {
    try {
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return false;
      }

      if (profile) {
        // Use normalization utility
        const normalizedProfile = normalizeUserProfile(profile);
        setUserProfile(normalizedProfile);
        setUserRole(normalizedProfile.role);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return false;
    }
  };

  const refreshUserProfile = async (): Promise<boolean> => {
    if (!user?.id) return false;
    return await fetchUserProfile(user.id);
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN' && session?.user) {
          await fetchUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUserProfile(null);
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success("Signed in successfully!");
      return { success: true };
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast.error(error.message || "Failed to sign in");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData || {}
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        localStorage.setItem('emviapp_new_user', 'true');
        toast.success("Account created successfully!");
        return { success: true, userId: data.user.id };
      }
      
      return { success: false };
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error(error.message || "Failed to sign up");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUserProfile(null);
      setUserRole(null);
      clearIsNewUser();
      toast.success("Successfully signed out");
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      if (!user?.id) return { success: false, error: new Error("No user logged in") };
      
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      await refreshUserProfile();
      return { success: true };
    } catch (error: any) {
      console.error("Error updating profile:", error);
      return { success: false, error };
    }
  };

  const updateUserRole = async (role: UserRole) => {
    try {
      if (!user?.id) return;
      
      const normalizedRole = normalizeRole(role);
      if (!normalizedRole) return;
      
      const { error } = await supabase
        .from('users')
        .update({ role: normalizedRole })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setUserRole(normalizedRole);
      await refreshUserProfile();
    } catch (error) {
      console.error("Error updating user role:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    session,
    userProfile,
    userRole,
    loading,
    isSignedIn: !!session,
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
