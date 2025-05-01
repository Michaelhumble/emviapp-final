
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User, AuthError, AuthChangeEvent } from '@supabase/supabase-js';
import { UserRole } from '@/context/auth/types/authTypes';
import { toast } from 'sonner';
import { normalizeRole } from '@/utils/roles';

// Define the interface for login credentials
interface LoginCredentials {
  email: string;
  password: string;
}

// Define the interface for signup credentials
interface SignUpCredentials {
  email: string;
  password: string;
  userData?: any;
}

export function useSessionQuery() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [authError, setAuthError] = useState<Error | null>(null);
  
  // Use navigate hook for redirection
  const navigate = useNavigate();

  // Initialize auth state and session
  useEffect(() => {
    // Check for new user status in localStorage
    const storedNewUserStatus = localStorage.getItem('emviapp_new_user') === 'true';
    if (storedNewUserStatus) {
      setIsNewUser(true);
    }

    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // If the user just signed up, set isNewUser to true
      if (event === AuthChangeEvent.SIGNED_UP) {
        setIsNewUser(true);
        localStorage.setItem('emviapp_new_user', 'true');
        
        // Check for role in user metadata and store it
        const userRole = session?.user?.user_metadata?.role as UserRole;
        if (userRole) {
          localStorage.setItem('emviapp_user_role', userRole);
        }
        
        navigate('/choose-role');
      }
      
      // If the user signs in, check for role info
      if (event === AuthChangeEvent.SIGNED_IN) {
        const userRole = session?.user?.user_metadata?.role as UserRole;
        if (userRole) {
          localStorage.setItem('emviapp_user_role', userRole);
        }
      }

      // If the user signs out, reset all states
      if (event === AuthChangeEvent.SIGNED_OUT) {
        setIsNewUser(false);
        localStorage.removeItem('emviapp_new_user');
        localStorage.removeItem('emviapp_user_role');
      }
      
      setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check for role in user metadata
      if (session?.user?.user_metadata?.role) {
        localStorage.setItem('emviapp_user_role', session.user.user_metadata.role);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Function to clear new user status
  const clearIsNewUser = () => {
    setIsNewUser(false);
    localStorage.removeItem('emviapp_new_user');
  };

  // Function to sign in
  const signIn = async (credentials: LoginCredentials) => {
    setIsSigningIn(true);
    setAuthError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });
      
      if (error) {
        setAuthError(error);
        toast.error(`Sign in failed: ${error.message}`);
        return { success: false, error, user: null };
      }
      
      return { success: true, user: data.user, error: null };
    } catch (error) {
      setAuthError(error as Error);
      toast.error('An unexpected error occurred during sign in');
      return { success: false, user: null, error: error as Error };
    } finally {
      setIsSigningIn(false);
    }
  };

  // Function to sign up
  const signUp = async (credentials: SignUpCredentials) => {
    setIsSigningUp(true);
    setAuthError(null);
    
    try {
      const userRole = credentials.userData?.role || 'customer';
      
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            ...credentials.userData,
            role: normalizeRole(userRole as UserRole),
          },
        },
      });
      
      if (error) {
        setAuthError(error);
        toast.error(`Sign up failed: ${error.message}`);
        return { success: false, error, user: null };
      }
      
      // Set new user flag in local storage
      localStorage.setItem('emviapp_new_user', 'true');
      setIsNewUser(true);
      
      return { success: true, user: data.user, error: null };
    } catch (error) {
      setAuthError(error as Error);
      toast.error('An unexpected error occurred during sign up');
      return { success: false, user: null, error: error as Error };
    } finally {
      setIsSigningUp(false);
    }
  };

  // Function to sign out
  const signOut = async () => {
    setIsSigningOut(true);
    
    try {
      await supabase.auth.signOut();
      // Reset all auth-related state
      setUser(null);
      setSession(null);
      setIsNewUser(false);
      localStorage.removeItem('emviapp_new_user');
      localStorage.removeItem('emviapp_user_role');
      return true;
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
      return false;
    } finally {
      setIsSigningOut(false);
    }
  };

  // Function to retry authentication
  const retryAuthentication = async () => {
    setLoading(true);
    setAuthError(null);
    
    try {
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        console.error('Session refresh failed:', error);
        setAuthError(error);
        return false;
      }
      
      if (data?.session) {
        setSession(data.session);
        setUser(data.session.user);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Authentication retry failed:', error);
      setAuthError(error as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    session,
    user,
    loading,
    isSigningIn,
    isSigningUp,
    isSigningOut,
    isNewUser,
    clearIsNewUser,
    authError,
    signIn,
    signUp,
    signOut,
    retryAuthentication,
    setLoading,
  };
}
