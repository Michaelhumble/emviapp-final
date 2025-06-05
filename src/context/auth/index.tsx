
import React, { createContext, useContext } from 'react';

interface AuthContextType {
  user: any;
  userRole: string | null;
  isSignedIn: boolean;
  loading: boolean;
  userProfile: any;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  isSignedIn: false,
  loading: true,
  userProfile: null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider value={{
      user: null,
      userRole: null,
      isSignedIn: false,
      loading: false,
      userProfile: null
    }}>
      {children}
    </AuthContext.Provider>
  );
};
