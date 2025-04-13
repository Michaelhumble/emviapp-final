import React, { useState, useEffect, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContext } from './AuthContext';
import { fetchUserProfile, createUserProfile, updateUserProfile } from './userProfileService';
import { UserRole, UserProfile } from './types';
import { toast } from 'sonner';
import { normalizeRole } from '@/utils/roles';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>('customer');
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isError, setIsError] = useState(false);

  const clearIsNewUser = () => {
    setIsNewUser(false);
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Error signing in:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signUp = async (email: string, password: string, userData = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...userData
          }
        }
      });

      if (error) {
        return { success: false, error: error.message, user: null };
      }
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Error signing up:', error);
      return { success: false, error: 'An unexpected error occurred', user: null };
    }
  };

  const refreshUserProfile = async () => {
    if (!user) return false;
    
    try {
      const profile = await fetchUserProfile(user.id);
      if (profile) {
        setUserProfile(profile);
        if (profile.role) {
          const normalizedRole = normalizeRole(profile.role as UserRole);
          setUserRole(normalizedRole);
        }
      } else {
        console.log('No profile found, creating one...');
        const newProfile = await createUserProfile(user);
        if (newProfile) {
          setUserProfile(newProfile);
          if (newProfile.role) {
            const normalizedRole = normalizeRole(newProfile.role as UserRole);
            setUserRole(normalizedRole);
          }
          setIsNewUser(true);
        }
      }
      return true;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setIsError(true);
      return false;
    }
  };

  const updateUserRole = async (role: UserRole): Promise<void> => {
    if (!user) return;
    
    try {
      const updatedProfile = await updateUserProfile({ 
        id: user.id,
        role: role as string 
      });
      
      if (updatedProfile && updatedProfile.role) {
        const normalizedRole = normalizeRole(updatedProfile.role as UserRole);
        setUserRole(normalizedRole);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      // Clear user state and localStorage
      setUser(null);
      setUserProfile(null);
      setUserRole('customer');
      localStorage.removeItem('emviapp_user_role');
      localStorage.removeItem('emviapp_new_user');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      refreshUserProfile();
    } else {
      setUserProfile(null);
      setUserRole('customer');
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        userRole,
        loading,
        isSignedIn: !!user,
        isError,
        isNewUser,
        clearIsNewUser,
        signIn,
        signUp,
        signOut,
        refreshUserProfile,
        updateUserRole,
        updateProfile: async (data: Partial<UserProfile>) => {
          try {
            return { success: true };
          } catch (error) {
            return { 
              success: false, 
              error: error instanceof Error ? error : new Error('Unknown error occurred') 
            };
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
