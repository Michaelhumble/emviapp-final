
import React, { createContext, useState, useEffect } from "react";
import { AuthContextType, UserRole } from "./types";

// Create and export the auth context with undefined as default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Add display name for easier debugging
AuthContext.displayName = 'AuthContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [isNewUser, setIsNewUser] = useState(false);
  
  // This is a minimal implementation just to make buttons work
  const authContextValue: AuthContextType = {
    user: null,
    userProfile: null,
    userRole,
    loading: false,
    isSignedIn,
    isError: false,
    isNewUser,
    clearIsNewUser: () => setIsNewUser(false),
    signIn: async () => {
      setIsSignedIn(true);
      return { success: true };
    },
    signUp: async () => { 
      setIsSignedIn(true);
      return { success: true };
    },
    signOut: async () => {
      setIsSignedIn(false);
    },
    refreshUserProfile: async () => true,
    updateUserRole: async () => {},
    updateProfile: async () => ({ success: true }),
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
