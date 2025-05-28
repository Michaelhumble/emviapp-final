
import React, { createContext, useContext, ReactNode } from 'react';
import { useSession } from './hooks/useSession';
import { AuthContextType, UserProfile } from './types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { session, user, loading, isNewUser, clearIsNewUser, setLoading } = useSession();
  
  const isSignedIn = !!user;
  const userProfile = null; // This will be enhanced later with actual profile fetching
  const userRole = user?.user_metadata?.role || null;

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to sign in');
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    return login(email, password);
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.href = '/';
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error.message || 'Failed to sign out');
    }
  };

  const signOut = async () => {
    return logout();
  };

  const refreshUserProfile = async () => {
    console.log('Refresh user profile called');
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    console.log('Update profile called with:', updates);
  };

  const value: AuthContextType = {
    user,
    userProfile,
    userRole,
    isSignedIn,
    loading,
    isNewUser,
    clearIsNewUser,
    login,
    logout,
    signIn,
    signOut,
    refreshUserProfile,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
