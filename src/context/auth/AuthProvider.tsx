
import React, { createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { AuthContextType, UserProfile } from './types';
import { useAuthProvider } from './hooks/useAuthProvider';
import { normalizeRole } from '@/utils/roles';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    user,
    session,
    userProfile,
    setUser,
    setSession,
    setUserProfile,
    loading,
    signIn,
    signOut,
    signUp,
    updateProfile,
    refreshProfile
  } = useAuthProvider();

  // Type-safe profile setter that normalizes role and badges
  const setNormalizedUserProfile = (profile: any) => {
    if (profile) {
      const normalizedProfile: UserProfile = {
        ...profile,
        role: normalizeRole(profile.role) || 'customer',
        badges: Array.isArray(profile.badges) ? profile.badges.filter((badge): badge is string => typeof badge === 'string') : []
      };
      setUserProfile(normalizedProfile);
    } else {
      setUserProfile(null);
    }
  };

  // Wrapper functions to match AuthContextType interface
  const wrappedSignIn = async (email: string, password: string) => {
    const result = await signIn(email, password);
    return {
      success: !result.error,
      error: result.error ? new Error(result.error.message) : undefined
    };
  };

  const wrappedSignOut = async () => {
    await signOut();
  };

  const wrappedSignUp = async (email: string, password: string, userData?: any) => {
    const result = await signUp(email, password, userData);
    return {
      success: !result.error,
      error: result.error ? new Error(result.error.message) : undefined,
      userId: result.data?.user?.id
    };
  };

  const wrappedUpdateProfile = async (data: Partial<UserProfile>) => {
    const result = await updateProfile(data);
    return {
      success: !result.error,
      error: result.error ? new Error(result.error.message) : undefined
    };
  };

  const value: AuthContextType = {
    user,
    session,
    userProfile,
    userRole: userProfile?.role || null,
    loading,
    isSignedIn: !!user,
    isError: false,
    isNewUser: false,
    clearIsNewUser: () => {},
    setLoading: () => {},
    refreshUserProfile: async () => {
      await refreshProfile();
      return true;
    },
    signIn: wrappedSignIn,
    signOut: wrappedSignOut,
    signUp: wrappedSignUp,
    updateProfile: wrappedUpdateProfile,
    updateUserRole: async (role) => {
      await updateProfile({ role });
    }
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
