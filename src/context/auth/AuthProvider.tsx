import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, AuthContextType, UserRole } from './types';
import { normalizeRole } from '@/utils/roles';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isError, setIsError] = useState(false);

  const clearIsNewUser = () => setIsNewUser(false);

  const refreshUserProfile = async (): Promise<boolean> => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        // Transform database data to UserProfile format
        const transformedProfile: UserProfile = {
          ...data,
          role: normalizeRole(data.role) || 'customer',
          badges: Array.isArray(data.badges) ? data.badges : 
                  (typeof data.badges === 'string' ? [data.badges] : [])
        };
        
        setUserProfile(transformedProfile);
        setUserRole(transformedProfile.role || 'customer');
        return true;
      }
    } catch (error) {
      console.error('Error refreshing user profile:', error);
      setIsError(true);
    }
    return false;
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return { success: true, error: undefined };
    } catch (error: any) {
      console.error('Error signing in:', error);
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
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
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
          data: userData
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        setIsNewUser(true);
      }
      
      return { 
        success: true, 
        error: undefined, 
        userId: data.user?.id 
      };
    } catch (error: any) {
      console.error('Error signing up:', error);
      return { 
        success: false, 
        error, 
        userId: undefined 
      };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { success: false, error: new Error('No user found') };

    try {
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id);

      if (error) throw error;
      
      await refreshUserProfile();
      return { success: true, error: undefined };
    } catch (error: any) {
      console.error('Error updating profile:', error);
      return { success: false, error };
    }
  };

  const updateUserRole = async (role: UserRole) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', user.id);

      if (error) throw error;
      
      setUserRole(role);
      await refreshUserProfile();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsSignedIn(!!session?.user);

        if (session?.user) {
          await refreshUserProfile();
        } else {
          setUserProfile(null);
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsSignedIn(!!session?.user);
      
      if (session?.user) {
        refreshUserProfile();
      } else {
        setLoading(false);
      }
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
