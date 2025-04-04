
import { useState, useEffect, ReactNode } from 'react';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole, AuthContextType } from './types';
import { AuthContext } from './AuthContext';
import { fetchUserProfile } from './userProfileService';
import { toast } from '@/hooks/use-toast';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Initialize auth state and listen for changes
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);
      setIsSignedIn(!!session?.user);
      setLoading(false);
    };

    getSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        setIsSignedIn(!!session?.user);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Fetch user profile whenever the user changes
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) {
        setUserProfile(null);
        setUserRole(null);
        return;
      }

      const profile = await fetchUserProfile(user);
      
      if (profile) {
        setUserProfile(profile);
        setUserRole(profile.role);
      }
    };

    loadUserProfile();
  }, [user]);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        description: "Signed in successfully!",
      });
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast({
        variant: "destructive",
        description: error.message || "Failed to sign in",
      });
      throw error;
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setUserProfile(null);
      setUserRole(null);
      toast({
        description: "Signed out successfully!",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        description: "Failed to sign out",
      });
    }
  };
  
  // Refresh user profile function
  const refreshUserProfile = async () => {
    if (!user) return;
    
    const profile = await fetchUserProfile(user);
    
    if (profile) {
      setUserProfile(profile);
      setUserRole(profile.role);
    }
  };

  // Auth context value
  const value: AuthContextType = {
    session,
    user,
    userProfile,
    userRole,
    loading,
    signOut,
    refreshUserProfile,
    signIn,
    isSignedIn
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
