
import React, { createContext, useContext, ReactNode } from 'react';
import { useSession } from './hooks/useSession';
import { AuthContextType } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { session, user, loading, isNewUser, clearIsNewUser, setLoading } = useSession();
  
  const isSignedIn = !!user;
  const userProfile = null; // This will be enhanced later with actual profile fetching
  const userRole = user?.user_metadata?.role || null;

  const login = async (email: string, password: string) => {
    // Implementation will be added when needed
    console.log('Login called with:', email);
  };

  const logout = async () => {
    // Implementation will be added when needed
    console.log('Logout called');
  };

  const refreshUserProfile = async () => {
    // Implementation will be added when needed
    console.log('Refresh user profile called');
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
    refreshUserProfile
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
