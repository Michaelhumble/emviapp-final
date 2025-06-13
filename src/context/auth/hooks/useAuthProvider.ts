
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole } from '../types';
import { normalizeRole } from '@/utils/roles';

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const convertDatabaseProfileToUserProfile = (dbProfile: any): UserProfile => {
    return {
      ...dbProfile,
      role: normalizeRole(dbProfile.role) as UserRole,
      badges: Array.isArray(dbProfile.badges) ? dbProfile.badges : 
              (typeof dbProfile.badges === 'string' ? [dbProfile.badges] : 
               dbProfile.badges ? [] : null)
    };
  };

  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      
      return data ? convertDatabaseProfileToUserProfile(data) : null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  const clearIsNewUser = () => {
    setIsNewUser(false);
  };

  const refreshUserProfile = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const profile = await fetchUserProfile(user.id);
      if (profile) {
        setUserProfile(profile);
        setUserRole(profile.role || null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error refreshing user profile:', error);
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) return { success: false, error };
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setUserProfile(null);
      setUserRole(null);
      setIsSignedIn(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) return { success: false, error };
      return { success: true, userId: data.user?.id };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { success: false, error: new Error('No user found') };
    
    try {
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id);
      
      if (error) return { success: false, error };
      
      await refreshUserProfile();
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const updateUserRole = async (role: UserRole) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setUserRole(role);
      await refreshUserProfile();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsSignedIn(!!session?.user);
        
        if (event === 'SIGNED_IN' && session?.user) {
          setTimeout(async () => {
            const profile = await fetchUserProfile(session.user.id);
            if (profile) {
              setUserProfile(profile);
              setUserRole(profile.role || null);
            }
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setUserProfile(null);
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsSignedIn(!!session?.user);
      
      if (session?.user) {
        fetchUserProfile(session.user.id).then(profile => {
          if (profile) {
            setUserProfile(profile);
            setUserRole(profile.role || null);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
