
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, UserProfile, UserRole } from './types';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { toast } from 'sonner';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const isSignedIn = !!session?.user;

  // Clear new user flag
  const clearIsNewUser = () => {
    setIsNewUser(false);
  };

  // Fetch user profile from database
  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      if (data) {
        // Convert badges from Json to string array if needed
        const profile: UserProfile = {
          ...data,
          badges: Array.isArray(data.badges) ? data.badges : 
                  (data.badges && typeof data.badges === 'object' ? 
                   Object.values(data.badges as Record<string, any>).filter(v => typeof v === 'string') : 
                   [])
        };
        return profile;
      }

      return null;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  // Refresh user profile
  const refreshUserProfile = async (): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const profile = await fetchUserProfile(user.id);
      setUserProfile(profile);
      setUserRole(profile?.role || null);
      return true;
    } catch (error) {
      console.error('Error refreshing user profile:', error);
      return false;
    }
  };

  // Sign in method
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  // Sign out method
  const signOut = async () => {
    try {
      setLoading(true);
      
      // Clear local state first
      setUser(null);
      setSession(null);
      setUserProfile(null);
      setUserRole(null);
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        toast.error('Error signing out');
      } else {
        toast.success('Signed out successfully');
      }
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Error signing out');
    } finally {
      setLoading(false);
    }
  };

  // Sign up method
  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;

      if (data.user && !data.session) {
        toast.success('Please check your email to verify your account');
      }

      return { 
        success: true, 
        userId: data.user?.id 
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  // Update profile method
  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user?.id) {
      return { success: false, error: new Error('No user found') };
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      // Update local state
      if (data) {
        const updatedProfile: UserProfile = {
          ...data,
          badges: Array.isArray(data.badges) ? data.badges : 
                  (data.badges && typeof data.badges === 'object' ? 
                   Object.values(data.badges as Record<string, any>).filter(v => typeof v === 'string') : 
                   [])
        };
        setUserProfile(updatedProfile);
        setUserRole(updatedProfile.role || null);
      }

      return { success: true };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error as Error };
    }
  };

  // Update user role method
  const updateUserRole = async (role: UserRole) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', user.id);

      if (error) throw error;

      setUserRole(role);
      
      // Also update the local profile
      if (userProfile) {
        setUserProfile({ ...userProfile, role });
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  };

  // Auth state listener
  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (!mounted) return;

        console.log('Auth state change:', event, newSession?.user?.id);

        if (event === 'SIGNED_IN' && newSession) {
          setSession(newSession);
          setUser(newSession.user);
          
          // Defer profile fetching to avoid deadlocks
          setTimeout(async () => {
            if (mounted && newSession.user) {
              const profile = await fetchUserProfile(newSession.user.id);
              if (mounted) {
                setUserProfile(profile);
                setUserRole(profile?.role || null);
                setLoading(false);
              }
            }
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setUserProfile(null);
          setUserRole(null);
          setLoading(false);
        } else if (event === 'TOKEN_REFRESHED' && newSession) {
          setSession(newSession);
          setUser(newSession.user);
        }
      }
    );

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting initial session:', error);
          setIsError(true);
        } else if (initialSession && mounted) {
          setSession(initialSession);
          setUser(initialSession.user);
          
          const profile = await fetchUserProfile(initialSession.user.id);
          if (mounted) {
            setUserProfile(profile);
            setUserRole(profile?.role || null);
          }
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        setIsError(true);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const contextValue: AuthContextType = {
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

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
