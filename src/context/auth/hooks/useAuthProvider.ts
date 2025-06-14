import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { UserProfile, UserRole } from '../types';
import { normalizeUserProfile } from '@/utils/auth/normalizeProfile';

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
	const [isNewUser, setIsNewUser] = useState<boolean>(false);

	const clearIsNewUser = useCallback(() => {
		setIsNewUser(false);
	}, []);

  const fetchUserProfile = useCallback(async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return normalizeUserProfile(data);
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  }, []);

  const refreshUserProfile = useCallback(async (): Promise<boolean> => {
    if (!user?.id) return false;
    
    try {
      const profile = await fetchUserProfile(user.id);
      setUserProfile(profile);
      if (profile?.role) {
        setUserRole(profile.role);
      }
      return true;
    } catch (error) {
      console.error('Error refreshing user profile:', error);
      return false;
    }
  }, [user?.id, fetchUserProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        console.error('Sign-in error:', error);
        setIsError(true);
        return { success: false, error };
      }

      setIsSignedIn(true);
      return { success: true };
    } catch (error: any) {
      console.error('Unexpected sign-in error:', error);
      setIsError(true);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Sign-out error:', error);
        setIsError(true);
        return;
      }

      setIsSignedIn(false);
      setUser(null);
      setSession(null);
      setUserProfile(null);
      setUserRole(null);
    } catch (error: any) {
      console.error('Unexpected sign-out error:', error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, userData: any = {}) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: userData,
        },
      });

      if (error) {
        console.error('Signup error:', error);
        setIsError(true);
        return { success: false, error };
      }

      setIsSignedIn(true);
      setIsNewUser(true);
      return { success: true, userId: data.user?.id };
    } catch (error: any) {
      console.error('Unexpected signup error:', error);
      setIsError(true);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<UserProfile>) => {
    if (!user?.id) {
      console.error("Cannot update profile: User not authenticated.");
      return { success: false, error: new Error("User not authenticated") };
    }

    try {
      setLoading(true);
      const { data: profileData, error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id)
        .select('*')
        .single();

      if (error) {
        console.error("Profile update error:", error);
        setIsError(true);
        return { success: false, error };
      }

      const normalizedProfile = normalizeUserProfile(profileData);
      setUserProfile(normalizedProfile);
      return { success: true };
    } catch (error: any) {
      console.error("Unexpected profile update error:", error);
      setIsError(true);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [user?.id, normalizeUserProfile]);

  const updateUserRole = useCallback(async (role: UserRole) => {
    if (!user?.id) {
      console.error("Cannot update user role: User not authenticated.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: { role: role },
      });

      if (error) {
        console.error("User role update error:", error);
        setIsError(true);
        return;
      }

      setUserRole(role);
      if (userProfile) {
        setUserProfile({ ...userProfile, role: role });
      }
    } catch (error: any) {
      console.error("Unexpected user role update error:", error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }, [user?.id, userProfile]);

  const handleAuthStateChange = useCallback(async (event: AuthChangeEvent, session: Session | null) => {
    console.log("Auth state change:", event, session?.user?.id);
    
    setSession(session);
    setUser(session?.user ?? null);
    setLoading(false);

    if (session?.user) {
      const profile = await fetchUserProfile(session.user.id);
      setUserProfile(profile);
      if (profile?.role) {
        setUserRole(profile.role);
      }
      
      if (event === 'SIGNED_UP') {
        setIsNewUser(true);
      }
    } else {
      setUserProfile(null);
      setUserRole(null);
    }
  }, [fetchUserProfile]);

  return {
    user,
    session,
    userProfile,
    userRole,
    loading,
    isSignedIn,
    isError,
		isNewUser,
		clearIsNewUser,
    setLoading,
    refreshUserProfile,
    signIn,
    signOut,
    signUp,
    updateProfile,
    updateUserRole,
  };
};
