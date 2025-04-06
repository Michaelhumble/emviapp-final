
import { useState, useEffect, ReactNode } from 'react';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole, AuthContextType } from './types';
import { AuthContext } from './AuthContext';
import { fetchUserProfile } from './userProfileService';
import { toast } from 'sonner';
import { getPreferredLanguage, hasLanguagePreference, setPreferredLanguage } from '@/utils/languagePreference';

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
  const [isNewUser, setIsNewUser] = useState(false);

  // Initialize auth state and listen for changes
  useEffect(() => {
    console.log("Auth provider initializing");
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
      async (event, session) => {
        console.log("Auth state changed:", event);
        setSession(session);
        setUser(session?.user || null);
        setIsSignedIn(!!session?.user);
        
        // Set isNewUser flag when a new sign up occurs
        if (event === 'SIGNED_IN' || event === 'SIGNED_UP') {
          const { data } = await supabase
            .from('users')
            .select('created_at')
            .eq('id', session?.user?.id)
            .single();
            
          // If user was created in the last 60 seconds, consider them new
          if (data) {
            const createdAt = new Date(data.created_at);
            const isNew = Date.now() - createdAt.getTime() < 60000;
            setIsNewUser(isNew);
            
            // Apply language preference if it exists in localStorage
            if (hasLanguagePreference()) {
              const lang = getPreferredLanguage();
              // Update user's language preference in the database if they're new
              if (isNew && session?.user) {
                await supabase
                  .from('users')
                  .update({ preferred_language: lang })
                  .eq('id', session.user.id);
              }
            }
          }
        }
        
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
        console.log("User role set from profile:", profile.role);
        
        // If user has a preferred language in their profile, update local storage
        if (profile.preferred_language) {
          setPreferredLanguage(profile.preferred_language);
        }
      }
    };

    loadUserProfile();
  }, [user]);

  // Sign up function
  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      setIsNewUser(true);
      toast.success("Account created successfully! Check your email for verification.");
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error(error.message || "Failed to sign up");
      throw error;
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success("Signed in successfully!");
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast.error(error.message || "Failed to sign in");
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
      toast.success("Signed out successfully!");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };
  
  // Reset new user state
  const clearIsNewUser = () => {
    setIsNewUser(false);
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
    signUp,
    isSignedIn,
    isNewUser,
    clearIsNewUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
