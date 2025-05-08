
import React, { createContext, useState, useEffect } from "react";
import { AuthContextType, UserRole } from "./types";

// Export this context so useAuth can import it directly from here
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
