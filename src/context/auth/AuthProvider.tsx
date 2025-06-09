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
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isError, setIsError] = useState(false);

  const clearIsNewUser = () => {
    setIsNewUser(false);
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: Error }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: new Error(error.message) };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error signing in:', error);
      const errorObj = error instanceof Error ? error : new Error('An unexpected error occurred');
      return { success: false, error: errorObj };
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<UserProfile> = {}): Promise<{ success: boolean; error?: Error; userId?: string }> => {
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
        return { success: false, error: new Error(error.message) };
      }
      
      return { success: true, userId: data.user?.id };
    } catch (error) {
      console.error('Error signing up:', error);
      const errorObj = error instanceof Error ? error : new Error('An unexpected error occurred');
      return { success: false, error: errorObj };
    }
  };

  const refreshUserProfile = async () => {
    if (!user) return false;
    
    try {
      const profile = await fetchUserProfile(user.id);
      if (profile) {
        setUserProfile(profile);
        if (profile.role) {
          const normalizedRole = normalizeRole(profile.role);
          setUserRole(normalizedRole);
        }
      } else {
        console.log('No profile found, creating one...');
        const newProfile = await createUserProfile(user);
        if (newProfile) {
          setUserProfile(newProfile);
          if (newProfile.role) {
            const normalizedRole = normalizeRole(newProfile.role);
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
        role: role
      });
      
      if (updatedProfile && updatedProfile.role) {
        const normalizedRole = normalizeRole(updatedProfile.role);
        setUserRole(normalizedRole);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

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

  const updateProfile = async (data: Partial<UserProfile>): Promise<{ success: boolean; error?: Error }> => {
    try {
      if (!user || !userProfile) {
        return { success: false, error: new Error('User not authenticated') };
      }
      
      const updatedProfile = await updateUserProfile({
        id: userProfile.id,
        ...data
      });
      
      if (updatedProfile) {
        setUserProfile(updatedProfile);
        if (updatedProfile.role && updatedProfile.role !== userRole) {
          const normalizedRole = normalizeRole(updatedProfile.role);
          setUserRole(normalizedRole);
        }
        return { success: true };
      }
      
      return { success: false, error: new Error('Failed to update profile') };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error : new Error('Unknown error occurred') 
      };
    }
  };

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
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
