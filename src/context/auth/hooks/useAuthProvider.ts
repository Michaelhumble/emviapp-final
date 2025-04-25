// Make sure the file uses proper TypeScript with proper data access
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole, AuthContextType } from '../types';
import { fetchUserProfile, createUserProfile, updateUserProfile } from '../userProfileService';
import { toast } from 'sonner';
import { normalizeRole } from '@/utils/roles';

export const useAuthProvider = (): AuthContextType => {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isError, setIsError] = useState(false);

  const clearIsNewUser = () => {
    setIsNewUser(false);
  };

  // Check for session on mount
  useEffect(() => {
    const getInitialSession = async () => {
      try {
        setLoading(true);
        
        // Get current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        const currentSession = sessionData?.session;
        setSession(currentSession || null);
        
        if (currentSession?.user) {
          setUser(currentSession.user);
          
          // Fetch user profile data
          const profile = await fetchUserProfile(currentSession.user.id);
          setUserProfile(profile);
          if (profile?.role) {
            const normalizedRole = normalizeRole(profile.role as UserRole);
            setUserRole(normalizedRole);
          }
        }
      } catch (error) {
        console.error('Error fetching initial session:', error);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    
    getInitialSession();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        
        if (newSession?.user) {
          setUser(newSession.user);
          
          if (event === 'SIGNED_IN') {
            // Check if this user exists in our profiles table
            const profile = await fetchUserProfile(newSession.user.id);
            
            if (!profile) {
              // New user, need to create profile
              setIsNewUser(true);
              const newProfile = await createUserProfile(newSession.user);
              setUserProfile(newProfile);
              if (newProfile?.role) {
                const normalizedRole = normalizeRole(newProfile.role as UserRole);
                setUserRole(normalizedRole);
              }
            } else {
              setUserProfile(profile);
              if (profile.role) {
                const normalizedRole = normalizeRole(profile.role as UserRole);
                setUserRole(normalizedRole);
              }
            }
          }
        } else {
          setUser(null);
          setUserProfile(null);
          setUserRole(null);
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  // Sign in with email/password
  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: Error }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        return { success: false, error: new Error(error.message) };
      }
      
      return { success: true };
    } catch (error: any) {
      toast.error(error.message || 'Error signing in');
      return { success: false, error: new Error(error.message || 'Error signing in') };
    }
  };
  
  // Sign up with email/password
  const signUp = async (email: string, password: string, userData?: Partial<UserProfile>): Promise<{ success: boolean; error?: Error }> => {
    try {
      // Register new user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (error) {
        return { success: false, error: new Error(error.message) };
      }
      
      // Create user profile record
      if (data?.user) {
        const newProfile = await createUserProfile({
          ...data.user,
          user_metadata: {
            ...data.user.user_metadata,
            ...userData
          }
        });
        
        setIsNewUser(true);
        return { success: true };
      }
      
      return { success: true };
    } catch (error: any) {
      toast.error(error.message || 'Error signing up');
      return { success: false, error: new Error(error.message || 'Error signing up') };
    }
  };
  
  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local state
      setUser(null);
      setUserProfile(null);
      setUserRole(null);
      setSession(null);
      
      // Clear localStorage role cache
      localStorage.removeItem('emviapp_user_role');
      
      // Redirect to homepage
      window.location.href = '/';
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
      throw error;
    }
  };
  
  // Update user profile
  const updateProfile = async (data: Partial<UserProfile>): Promise<{ success: boolean; error?: Error }> => {
    if (!user?.id) {
      toast.error('You must be logged in to update your profile');
      return { success: false, error: new Error('You must be logged in to update your profile') };
    }
    
    try {
      const updatedProfile = await updateUserProfile({
        id: userProfile?.id || user.id,
        ...data
      });
      
      if (updatedProfile) {
        setUserProfile(updatedProfile);
        if (updatedProfile.role) {
          const normalizedRole = normalizeRole(updatedProfile.role as UserRole);
          setUserRole(normalizedRole);
        }
      }
      
      return { success: true };
    } catch (error: any) {
      toast.error(error.message || 'Error updating profile');
      return { success: false, error: new Error(error.message || 'Error updating profile') };
    }
  };
  
  // Refresh user profile
  const refreshUserProfile = async () => {
    if (!user?.id) return false;
    
    try {
      setIsError(false);
      const profile = await fetchUserProfile(user.id);
      if (profile) {
        setUserProfile(profile);
        if (profile.role) {
          const normalizedRole = normalizeRole(profile.role as UserRole);
          setUserRole(normalizedRole);
        }
      }
      return true;
    } catch (error) {
      console.error('Error refreshing user profile:', error);
      setIsError(true);
      return false;
    }
  };
  
  // Set user role
  const updateUserRole = async (role: UserRole) => {
    if (!userProfile?.id) return;
    
    try {
      const updatedProfile = await updateUserProfile({
        id: userProfile.id,
        role
      });
      
      if (updatedProfile) {
        setUserProfile(updatedProfile);
        if (updatedProfile.role) {
          const normalizedRole = normalizeRole(updatedProfile.role as UserRole);
          setUserRole(normalizedRole);
        }
      }
    } catch (error) {
      console.error('Error setting user role:', error);
    }
  };
  
  return {
    loading,
    isSignedIn: !!user,
    user,
    userRole,
    userProfile,
    isError,
    isNewUser,
    clearIsNewUser,
    signIn,
    signOut,
    signUp,
    updateUserRole,
    updateProfile,
    refreshUserProfile
  };
};
