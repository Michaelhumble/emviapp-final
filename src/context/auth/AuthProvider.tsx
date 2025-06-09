
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole, AuthContextType } from './types';
import { useSession } from './hooks/useSession';
import { fetchFreshProfileData } from './utils/profileFetcher';
import { normalizeRole } from '@/utils/roles';
import * as authService from '@/services/auth';

// 🚨 GIANT AUTH DEBUGGING - Force print to console at module level
console.log('🚨 AUTH PROVIDER MODULE LOADED');

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { session, user, loading: sessionLoading, isNewUser, clearIsNewUser } = useSession();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // 🚨 GIANT DEBUG - Force print auth state changes
  console.log('🚨 AUTH PROVIDER RENDER:', {
    user: user?.id,
    session: !!session,
    userRole,
    userProfile: userProfile?.id,
    loading,
    sessionLoading
  });

  const refreshUserProfile = async (): Promise<boolean> => {
    if (!user?.id) {
      console.log('🚨 refreshUserProfile: No user ID');
      return false;
    }

    console.log('🚨 refreshUserProfile: Starting for user', user.id);
    
    try {
      setLoading(true);
      const { profile, role } = await fetchFreshProfileData(user.id);
      
      console.log('🚨 refreshUserProfile: Got data:', { profile: !!profile, role });
      
      setUserProfile(profile);
      setUserRole(role);
      setIsError(false);
      return true;
    } catch (error) {
      console.error('🚨 refreshUserProfile: Error:', error);
      setIsError(true);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Effect to handle user/session changes
  useEffect(() => {
    console.log('🚨 AUTH EFFECT: User/session change detected', {
      userId: user?.id,
      hasSession: !!session,
      sessionLoading
    });

    if (sessionLoading) {
      console.log('🚨 AUTH EFFECT: Session still loading, waiting...');
      return;
    }

    if (!user || !session) {
      console.log('🚨 AUTH EFFECT: No user/session, clearing state');
      setUserProfile(null);
      setUserRole(null);
      setLoading(false);
      setIsError(false);
      return;
    }

    // 🚨 URGENT DEBUG - Check user metadata immediately
    console.log('🚨 AUTH EFFECT: User metadata:', user.user_metadata);
    console.log('🚨 AUTH EFFECT: App metadata:', user.app_metadata);
    
    const metadataRole = user.user_metadata?.role;
    console.log('🚨 AUTH EFFECT: Metadata role found:', metadataRole);
    
    if (metadataRole) {
      const normalizedRole = normalizeRole(metadataRole);
      console.log('🚨 AUTH EFFECT: Normalized metadata role:', normalizedRole);
      setUserRole(normalizedRole);
      localStorage.setItem('emviapp_user_role', normalizedRole || '');
    }

    // Fetch fresh profile data
    refreshUserProfile();
  }, [user, session, sessionLoading]);

  // 🚨 FORCE CONSOLE OUTPUT on every render
  useEffect(() => {
    console.log('🚨 AUTH STATE UPDATE:', {
      userRole,
      userRoleType: typeof userRole,
      userProfile: userProfile?.role,
      userId: user?.id,
      loading
    });
  }, [userRole, userProfile, user, loading]);

  const updateUserRole = async (role: UserRole) => {
    console.log('🚨 updateUserRole called with:', role);
    
    if (!user?.id) {
      console.error('🚨 updateUserRole: No user ID');
      return;
    }

    try {
      const normalizedRole = normalizeRole(role);
      console.log('🚨 updateUserRole: Normalized role:', normalizedRole);
      
      // Update auth metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { role: normalizedRole }
      });

      if (authError) {
        console.error('🚨 updateUserRole: Auth update error:', authError);
        throw authError;
      }

      // Update database
      const { error: dbError } = await supabase
        .from('users')
        .update({ role: normalizedRole })
        .eq('id', user.id);

      if (dbError) {
        console.error('🚨 updateUserRole: DB update error:', dbError);
        throw dbError;
      }

      // Update local state
      setUserRole(normalizedRole);
      localStorage.setItem('emviapp_user_role', normalizedRole || '');
      
      console.log('🚨 updateUserRole: Success, new role:', normalizedRole);
    } catch (error) {
      console.error('🚨 updateUserRole: Failed:', error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user?.id) {
      return { success: false, error: new Error('No user ID') };
    }

    try {
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id);

      if (error) throw error;

      // Refresh profile data
      await refreshUserProfile();
      
      return { success: true };
    } catch (error) {
      console.error('🚨 updateProfile: Error:', error);
      return { success: false, error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('🚨 signIn called for:', email);
    
    try {
      const result = await authService.signInWithEmail(email, password);
      console.log('🚨 signIn result:', result);
      
      if (result.success && result.user) {
        console.log('🚨 signIn: User metadata after login:', result.user.user_metadata);
        const metadataRole = result.user.user_metadata?.role;
        if (metadataRole) {
          const normalizedRole = normalizeRole(metadataRole);
          console.log('🚨 signIn: Setting role from metadata:', normalizedRole);
          setUserRole(normalizedRole);
          localStorage.setItem('emviapp_user_role', normalizedRole || '');
        }
      }
      
      return result;
    } catch (error) {
      console.error('🚨 signIn: Error:', error);
      return { success: false, error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    console.log('🚨 signUp called with userData:', userData);
    
    try {
      const result = await authService.signUpWithEmail(email, password, userData);
      console.log('🚨 signUp result:', result);
      return result;
    } catch (error) {
      console.error('🚨 signUp: Error:', error);
      return { success: false, error: error as Error };
    }
  };

  const signOut = async () => {
    console.log('🚨 signOut called');
    
    try {
      await authService.signOut();
      setUserProfile(null);
      setUserRole(null);
      setLoading(false);
      setIsError(false);
      localStorage.removeItem('emviapp_user_role');
      console.log('🚨 signOut: Success');
    } catch (error) {
      console.error('🚨 signOut: Error:', error);
    }
  };

  const contextValue: AuthContextType = {
    user,
    userProfile,
    userRole,
    loading: loading || sessionLoading,
    isSignedIn: !!user && !!session,
    isError,
    isNewUser,
    clearIsNewUser,
    signIn,
    signUp,
    signOut,
    refreshUserProfile,
    updateUserRole,
    updateProfile,
  };

  // 🚨 FINAL DEBUG LOG before render
  console.log('🚨 AUTH CONTEXT VALUE:', {
    userRole: contextValue.userRole,
    userRoleType: typeof contextValue.userRole,
    isSignedIn: contextValue.isSignedIn,
    loading: contextValue.loading,
    userId: contextValue.user?.id
  });

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
