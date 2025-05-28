
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, UserProfile, UserRole } from './types';
import { useSession } from './hooks/useSession';
import { useUserProfile } from './hooks/useUserProfile';
import { useAuthMethods } from './hooks/useAuthMethods';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  // Use session management hook
  const { session, user, isNewUser, clearIsNewUser } = useSession();
  
  // Use user profile management hook
  const { userProfile, userRole, refreshUserProfile } = useUserProfile(user, setLoading);
  
  // Use authentication methods hook
  const { signIn, signUp, signOut } = useAuthMethods(setLoading);

  // Derived state
  const isSignedIn = !!user;

  // Enhanced sign-in wrapper
  const enhancedSignIn = async (email: string, password: string) => {
    try {
      const result = await signIn(email, password);
      return { success: !result.error, error: result.error };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  // Enhanced sign-up wrapper
  const enhancedSignUp = async (email: string, password: string, userData?: any) => {
    try {
      const result = await signUp(email, password);
      return { 
        success: !result.error, 
        error: result.error,
        userId: result.data?.user?.id 
      };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  // Enhanced sign-out wrapper
  const enhancedSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Update user role function
  const updateUserRole = async (role: UserRole) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Refresh profile to get updated role
      await refreshUserProfile();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  // Update profile function
  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { success: false, error: new Error('No user') };
    
    try {
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Refresh profile to get updated data
      await refreshUserProfile();
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error as Error };
    }
  };

  const contextValue: AuthContextType = {
    user,
    userProfile,
    userRole: userRole || 'customer',
    loading,
    isSignedIn,
    isError,
    isNewUser,
    clearIsNewUser,
    signIn: enhancedSignIn,
    signUp: enhancedSignUp,
    signOut: enhancedSignOut,
    refreshUserProfile,
    updateUserRole,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
