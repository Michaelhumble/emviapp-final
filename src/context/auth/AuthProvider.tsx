
import React, { createContext, useState, useEffect } from "react";
import { AuthContextType, UserRole } from "./types";

// Create a default auth context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [isNewUser, setIsNewUser] = useState(false);
  
  // This is a minimal implementation just to make buttons work
  // We're not touching the real auth system as instructed
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
