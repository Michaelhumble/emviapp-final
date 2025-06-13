
import { useState, useEffect } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
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

  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error || !profile) {
        console.log('No profile found or error fetching profile:', error);
        return null;
      }

      // Ensure role is properly typed as UserRole
      const normalizedProfile: UserProfile = {
        ...profile,
        role: normalizeRole(profile.role) || null,
      };

      setUserProfile(normalizedProfile);
      setUserRole(normalizedProfile.role);
      return normalizedProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  const refreshUserProfile = async (): Promise<boolean> => {
    if (!user?.id) return false;
    
    try {
      const profile = await fetchUserProfile(user.id);
      return !!profile;
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
      
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      // Clear local state first
      setUser(null);
      setSession(null);
      setUserProfile(null);
      setUserRole(null);
      setIsSignedIn(false);
      
      // Sign out from Supabase
      await supabase.auth.signOut({ scope: 'global' });
      
      // Clear any remaining auth tokens
      localStorage.removeItem('supabase.auth.token');
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: userData,
        },
      });
      
      if (error) throw error;
      
      if (data.user && !data.session) {
        setIsNewUser(true);
      }
      
      return { 
        success: true, 
        userId: data.user?.id 
      };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user?.id) return { success: false, error: new Error('No user found') };
    
    try {
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Refresh profile after update
      await refreshUserProfile();
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const updateUserRole = async (role: UserRole) => {
    if (!user?.id) return;
    
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

  const clearIsNewUser = () => {
    setIsNewUser(false);
  };

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (!mounted) return;

        console.log('Auth state change:', event, session?.user?.id);
        
        setSession(session);
        setUser(session?.user ?? null);
        setIsSignedIn(!!session?.user);
        
        if (session?.user) {
          // Handle new user signup
          if (event === 'SIGNED_UP') {
            setIsNewUser(true);
          }
          
          // Defer profile fetching to prevent deadlocks
          setTimeout(() => {
            if (mounted) {
              fetchUserProfile(session.user.id);
            }
          }, 0);
        } else {
          setUserProfile(null);
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      setSession(session);
      setUser(session?.user ?? null);
      setIsSignedIn(!!session?.user);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
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
