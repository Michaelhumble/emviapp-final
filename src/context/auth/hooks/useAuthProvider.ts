
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
  const [userRole, setUserRole] = useState<UserRole | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isError, setIsError] = useState(false);

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
            setUserRole(normalizeRole(profile.role) as UserRole); // Cast to UserRole
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
                setUserRole(normalizeRole(newProfile.role) as UserRole); // Cast to UserRole
              }
            } else {
              setUserProfile(profile);
              if (profile.role) {
                setUserRole(normalizeRole(profile.role) as UserRole); // Cast to UserRole
              }
            }
          }
        } else {
          setUser(null);
          setUserProfile(null);
          setUserRole(undefined);
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  // Sign in with email/password
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      return data;
    } catch (error: any) {
      toast.error(error.message || 'Error signing in');
      throw error;
    }
  };
  
  // Sign up with email/password
  const signUp = async (email: string, password: string, userData?: Partial<UserProfile>) => {
    try {
      // Register new user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (error) throw error;
      
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
        return { user: data.user, error: null };
      }
      
      return { user: data?.user || null, error: null };
    } catch (error: any) {
      toast.error(error.message || 'Error signing up');
      return { user: null, error: error };
    }
  };
  
  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
      throw error;
    }
  };
  
  // Update user profile
  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user?.id) {
      toast.error('You must be logged in to update your profile');
      return null;
    }
    
    try {
      const updatedProfile = await updateUserProfile({
        id: userProfile?.id || user.id,
        ...data
      });
      
      if (updatedProfile) {
        setUserProfile(updatedProfile);
        if (updatedProfile.role) {
          setUserRole(normalizeRole(updatedProfile.role) as UserRole); // Cast to UserRole
        }
      }
      
      return updatedProfile;
    } catch (error: any) {
      toast.error(error.message || 'Error updating profile');
      throw error;
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
          setUserRole(normalizeRole(profile.role) as UserRole); // Cast to UserRole
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
  const setUserRoleAction = async (role: UserRole) => {
    if (!userProfile?.id) return;
    
    try {
      const updatedProfile = await updateUserProfile({
        id: userProfile.id,
        role: role as string // Convert enum to string for DB
      });
      
      if (updatedProfile) {
        setUserProfile(updatedProfile);
        if (updatedProfile.role) {
          setUserRole(normalizeRole(updatedProfile.role) as UserRole); // Cast to UserRole
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
    signIn,
    signOut,
    signUp,
    refreshUserProfile,
    updateUserRole: setUserRoleAction
  };
};
