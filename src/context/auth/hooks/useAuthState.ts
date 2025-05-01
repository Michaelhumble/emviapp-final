
import { useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { UserProfile, UserRole } from '../types/authTypes';

/**
 * Hook to manage authentication state
 * @returns Authentication state variables and setters
 */
export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isError, setIsError] = useState(false);

  const clearIsNewUser = () => {
    setIsNewUser(false);
  };

  return {
    // Session state
    session,
    setSession,
    user, 
    setUser,
    userProfile,
    setUserProfile,
    userRole,
    setUserRole,
    
    // UI state
    loading,
    setLoading,
    isNewUser,
    setIsNewUser,
    isError,
    setIsError,
    clearIsNewUser,
  };
};
