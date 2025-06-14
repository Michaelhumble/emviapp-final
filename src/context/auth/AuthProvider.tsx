
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole, AuthContextType } from './types';
import { normalizeRole } from '@/utils/roles';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const fetchUserProfile = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        setIsError(true);
        return false;
      }

      if (data) {
        // Normalize role and badges fields for type safety
        const normalizedProfile: UserProfile = {
          ...data,
          role: normalizeRole(data.role) || 'customer',
          badges: Array.isArray(data.badges) ? data.badges : []
        };
        
        setUserProfile(normalizedProfile);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      setIsError(true);
      return false;
    }
  };

  const refreshUserProfile = async (): Promise<boolean> => {
    if (!user?.id) return false;
    return await fetchUserProfile(user.id);
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      return { success: true };
    } catch (error) {
      const authError = error as Error;
      toast.error(authError.message);
      return { success: false, error: authError };
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      if (data.user) {
        setIsNewUser(true);
        return { success: true, userId: data.user.id };
      }

      return { success: false, error: new Error('User creation failed') };
    } catch (error) {
      const authError = error as Error;
      toast.error(authError.message);
      return { success: false, error: authError };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setUserProfile(null);
      setIsNewUser(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user?.id) {
      return { success: false, error: new Error('No user logged in') };
    }

    try {
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id);

      if (error) {
        return { success: false, error };
      }

      await refreshUserProfile();
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const updateUserRole = async (role: UserRole) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', user.id);

      if (!error) {
        await refreshUserProfile();
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const clearIsNewUser = () => {
    setIsNewUser(false);
  };

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchUserProfile(session.user.id);
      }

      setLoading(false);
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUserProfile(null);
        }

        if (event === 'SIGNED_UP') {
          setIsNewUser(true);
        }

        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    session,
    userProfile,
    userRole: userProfile?.role || null,
    loading,
    isSignedIn: !!user,
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
