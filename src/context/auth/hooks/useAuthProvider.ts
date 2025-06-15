import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/profile';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  userProfile: Profile | null;
  userRole: string | null;
  loading: boolean;
  error: Error | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: Partial<Profile>) => Promise<void>;
  fetchProfile: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  
  const cleanupAuthState = useCallback(() => {
    setUser(null);
    setUserProfile(null);
    setUserRole(null);
    setLoading(false);
    setError(null);
  }, []);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            email: email,
          }
        }
      });
      if (error) {
        throw error;
      }
      setUser(data.user);
      navigate('/auth/verify-email');
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        throw error;
      }
      setUser(data.user);
      await fetchProfile();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!user) {
        console.warn("No user found, can't fetch profile.");
        return;
      }
      
      let { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (profileError) {
        throw profileError;
      }
      
      setUserProfile(profile as Profile);
      setUserRole(profile?.role || null);
      
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<Profile>) => {
    setLoading(true);
    setError(null);
    try {
      if (!user) {
        throw new Error("No user found, can't update profile.");
      }
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);
        
      if (updateError) {
        throw updateError;
      }
      
      // Optimistically update local profile
      setUserProfile(prevProfile => ({
        ...prevProfile,
        ...profileData,
      } as Profile));
      
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(true);
        setUser(session?.user || null);
        
        if (session?.user) {
          await fetchProfile();
          navigate('/dashboard');
        } else {
          cleanupAuthState();
          if (event !== 'INITIAL_SESSION') {
            navigate('/auth');
          }
        }
        setLoading(false);
      }
    );
    
    // Initial load if there's a session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session.user);
          fetchProfile();
          navigate('/dashboard');
        } else {
          cleanupAuthState();
          navigate('/auth');
        }
      })
      .catch(error => {
        console.error("Authentication check failed:", error);
        setError(new Error("Failed to check authentication status."));
        cleanupAuthState();
        navigate('/auth');
      })
      .finally(() => setLoading(false));

    return () => {
      authListener?.unsubscribe();
    };
  }, [navigate, cleanupAuthState, fetchProfile]);
  
  const signOut = async () => {
        setLoading(true);
        setError(null);
    
        try {
          // Clean up auth state and sign out
          cleanupAuthState();
          await supabase.auth.signOut({ scope: 'global' });
          
          // Force page reload for a clean state
          window.location.href = '/auth';
        } catch (error) {
          console.error('Error during sign out:', error);
          // Force redirect even if signOut fails
          window.location.href = '/auth';
        }
      };

  return { user, userProfile, userRole, loading, error, signUp, signIn, signOut, updateProfile, fetchProfile };
};
