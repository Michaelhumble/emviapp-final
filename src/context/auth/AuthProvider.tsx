
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, UserProfile, UserRole } from './types';
import { normalizeRole } from '@/utils/roles';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const clearIsNewUser = () => setIsNewUser(false);

  const refreshUserProfile = async (): Promise<boolean> => {
    if (!user) return false;

    try {
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        if (error.code !== 'PGRST116') {
          console.error('Error fetching user profile:', error);
          setIsError(true);
        }
        return false;
      }

      if (profile) {
        // Properly handle role normalization and type conversion
        const normalizedRole = normalizeRole(profile.role as string);
        const profileWithTypedRole: UserProfile = {
          ...profile,
          role: normalizedRole,
          badges: Array.isArray(profile.badges) ? profile.badges : [],
          completed_profile_tasks: Array.isArray(profile.completed_profile_tasks) ? profile.completed_profile_tasks : [],
          portfolio_urls: Array.isArray(profile.portfolio_urls) ? profile.portfolio_urls : [],
          gallery: Array.isArray(profile.gallery) ? profile.gallery : [],
          services: Array.isArray(profile.services) ? profile.services : [],
          skills: Array.isArray(profile.skills) ? profile.skills : []
        };
        
        setUserProfile(profileWithTypedRole);
        setUserRole(normalizedRole);
      }
      return true;
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
      setIsError(true);
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { success: false, error };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      setUserProfile(null);
      setUserRole(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData || {}
        }
      });

      if (error) {
        return { success: false, error };
      }

      if (data.user) {
        setIsNewUser(true);
        return { success: true, userId: data.user.id };
      }

      return { success: false, error: new Error('No user returned') };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { success: false, error: new Error('No user') };

    try {
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id);

      if (error) throw error;

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
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        refreshUserProfile();
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      
      setSession(session);
      setUser(session?.user ?? null);

      if (event === 'SIGNED_IN' && session?.user) {
        await refreshUserProfile();
        setIsNewUser(false);
      } else if (event === 'SIGNED_OUT') {
        setUserProfile(null);
        setUserRole(null);
        setIsError(false);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    session,
    userProfile,
    userRole,
    loading,
    isSignedIn: !!user,
    isError,
    isNewUser,
    clearIsNewUser,
    setLoading,
    refreshUserProfile,
    signIn,
    signOut,
    signUp,
    updateProfile,
    updateUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
