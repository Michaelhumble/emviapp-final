
import React from 'react';
import { AuthContext } from './AuthContext';
import { useAuthSession } from '@/hooks/useAuthSession';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const authState = useAuthSession();

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};
