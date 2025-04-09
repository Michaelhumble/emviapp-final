
import React, { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContext } from './AuthContext';
import { fetchUserProfile, createUserProfile } from './userProfileService';
import { UserRole, UserProfile } from './types';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  // Clear new user flag
  const clearIsNewUser = () => {
    setIsNewUser(false);
  };

  // Fetch user profile
  const refreshUserProfile = async () => {
    if (!user) return;
    
    try {
      const profile = await fetchUserProfile(user.id);
      if (profile) {
        setUserProfile(profile);
        if (profile.role) {
          setUserRole(profile.role);
        }
      } else {
        console.log('No profile found, creating one...');
        // Create profile if it doesn't exist
        const newProfile = await createUserProfile(user);
        if (newProfile) {
          setUserProfile(newProfile);
          if (newProfile.role) {
            setUserRole(newProfile.role);
          }
          // Mark as new user
          setIsNewUser(true);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Set up auth state listener
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch profile whenever user changes
  useEffect(() => {
    if (user) {
      refreshUserProfile();
    } else {
      setUserProfile(null);
      setUserRole('customer');
    }
  }, [user]);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error signing in:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, options = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options,
      });

      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error signing up:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  // Sign out function
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userProfile,
        userRole,
        loading,
        isSignedIn: !!user,
        isNewUser,
        clearIsNewUser,
        signIn,
        signUp,
        signOut,
        refreshUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
