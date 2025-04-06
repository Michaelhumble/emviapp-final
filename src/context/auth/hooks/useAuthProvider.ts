
import { useState, useEffect, useCallback, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole } from '../types';
import { createEmptyProfile, getUserProfile, updateUserProfileInDb, updateUserAvatarInStorage } from '../userProfileService';

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const isSignedIn = !!user;

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const profile = await getUserProfile(userId);
      setUserProfile(profile);
      
      // Set the user role
      if (profile?.user_role) {
        setUserRole(profile.user_role as UserRole);
      }
      
      return profile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }, []);

  const refreshUserProfile = useCallback(async () => {
    if (user?.id) {
      await fetchUserProfile(user.id);
    }
  }, [user, fetchUserProfile]);

  const clearIsNewUser = useCallback(() => {
    setIsNewUser(false);
  }, []);

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        
        if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserProfile(session.user.id);
        
        if (event === 'SIGNED_IN') {
          setIsNewUser(true);
        }
      } else {
        setUserProfile(null);
        setUserRole(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUserProfile]);

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (!error && data.user) {
        await createEmptyProfile(data.user.id);
        setIsNewUser(true);
      }

      return { error };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error, data };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error, data: null };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUserProfile(null);
      setUserRole(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user?.id) return false;
    
    try {
      const success = await updateUserProfileInDb(user.id, updates);
      
      if (success) {
        // Update local state with the new profile data
        setUserProfile(prev => prev ? { ...prev, ...updates } : null);
        
        // Update user role if it was changed
        if (updates.user_role) {
          setUserRole(updates.user_role);
        }
      }
      
      return success;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  };

  const updateUserAvatar = async (file: File) => {
    if (!user?.id) return null;
    
    try {
      const avatarUrl = await updateUserAvatarInStorage(user.id, file);
      
      if (avatarUrl) {
        // Update local profile with new avatar
        setUserProfile(prev => prev ? { ...prev, avatar_url: avatarUrl } : null);
      }
      
      return avatarUrl;
    } catch (error) {
      console.error('Error updating user avatar:', error);
      return null;
    }
  };

  return {
    user,
    session,
    isLoading,
    userProfile,
    userRole,
    signUp,
    signIn,
    signOut,
    refreshUserProfile,
    updateUserProfile,
    updateUserAvatar,
    isSignedIn,
    isNewUser,
    clearIsNewUser,
  };
};
