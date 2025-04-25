
import React, { createContext, useEffect, useState } from 'react';
import { AuthContextType, UserProfile } from './types';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { AuthContext } from './context';
import { useUserProfile } from './hooks/useUserProfile';
import { useAuthProvider } from './hooks/useAuthProvider';

export const ReliableAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use the auth provider hook to handle authentication logic
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
