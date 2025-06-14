
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
        badges: Array.isArray(profile.badges) ? profile.badges : []
      };
      setUserProfile(normalizedProfile);
    } else {
      setUserProfile(null);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    userProfile,
    setUser,
    setSession,
    setUserProfile: setNormalizedUserProfile,
    loading,
    signIn,
    signOut,
    signUp,
    updateProfile,
    refreshProfile
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
