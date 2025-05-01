
import { useState, useEffect, useCallback } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User, Session } from '@supabase/supabase-js';
import { LoginCredentials, SignUpCredentials } from '@/context/auth/types/authTypes';

/**
 * Custom hook to manage authentication session state using React Query
 * Handles authentication operations like sign in, sign up, sign out
 * 
 * @returns {Object} Authentication state and methods
 */
export function useSessionQuery() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [authError, setAuthError] = useState<Error | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Check for new user status in localStorage
  useEffect(() => {
    const storedNewUserStatus = localStorage.getItem('emviapp_new_user') === 'true';
    if (storedNewUserStatus) {
      setIsNewUser(true);
    }
  }, []);

  // Sync session and user state with Supabase auth
  useEffect(() => {
    console.log("Setting up auth state listener");
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log(`Auth state changed: ${event}`);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Handle specific auth events
      if (event === 'SIGNED_UP') {
        console.log("User signed up, setting new user state");
        setIsNewUser(true);
        localStorage.setItem('emviapp_new_user', 'true');
        
        // Store role in localStorage if available
        const userRole = currentSession?.user?.user_metadata?.role;
        if (userRole) {
          localStorage.setItem('emviapp_user_role', userRole);
        }
        
        navigate('/choose-role');
      }
      
      // Handle sign in
      if (event === 'SIGNED_IN') {
        console.log("User signed in");
        const userRole = currentSession?.user?.user_metadata?.role;
        if (userRole) {
          localStorage.setItem('emviapp_user_role', userRole);
        }
      }

      // Handle sign out
      if (event === 'SIGNED_OUT') {
        console.log("User signed out, clearing state");
        setIsNewUser(false);
        localStorage.removeItem('emviapp_new_user');
        localStorage.removeItem('emviapp_user_role');
        queryClient.clear(); // Clear query cache on signout
      }
      
      setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      console.log("Initial session check:", initialSession ? "Session found" : "No session");
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      
      if (initialSession?.user?.user_metadata?.role) {
        localStorage.setItem('emviapp_user_role', initialSession.user.user_metadata.role);
      }
      
      setLoading(false);
    }).catch(error => {
      console.error("Error getting initial session:", error);
      setLoading(false);
    });

    return () => {
      console.log("Cleaning up auth state listener");
      subscription.unsubscribe();
    };
  }, [navigate, queryClient]);

  // Clear new user status
  const clearIsNewUser = useCallback(() => {
    console.log("Clearing new user status");
    setIsNewUser(false);
    localStorage.removeItem('emviapp_new_user');
  }, []);

  // Sign in mutation
  const signInMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      console.log(`Attempting to sign in user: ${credentials.email}`);
      const result = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });
      
      if (result.error) {
        console.error("Sign in error:", result.error.message);
        throw result.error;
      }
      
      console.log("Sign in successful");
      return result.data;
    },
    onSuccess: () => {
      // Reset auth error state
      setAuthError(null);
    },
    onError: (error: Error) => {
      setAuthError(error instanceof Error ? error : new Error("Failed to sign in"));
      // Use string template literal instead of JSX
      toast.error(`Sign in failed: ${error instanceof Error ? error.message : 'Authentication error'}`);
    }
  });

  // Sign up mutation
  const signUpMutation = useMutation({
    mutationFn: async (credentials: SignUpCredentials) => {
      const { email, password, ...userData } = credentials;
      
      console.log(`Attempting to register new user: ${email}`);
      const result = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (result.error) {
        console.error("Sign up error:", result.error.message);
        throw result.error;
      }
      
      console.log("Sign up successful");
      return result.data;
    },
    onSuccess: () => {
      setIsNewUser(true);
      localStorage.setItem('emviapp_new_user', 'true');
      
      // Reset auth error state
      setAuthError(null);
      
      // Use string template literal instead of JSX
      toast.success(`Account created successfully! Please check your email.`);
    },
    onError: (error: Error) => {
      setAuthError(error instanceof Error ? error : new Error("Failed to sign up"));
      // Use string template literal instead of JSX
      toast.error(`Sign up failed: ${error instanceof Error ? error.message : 'Registration error'}`);
    }
  });

  // Sign out mutation
  const signOutMutation = useMutation({
    mutationFn: async () => {
      console.log("Signing out user");
      const result = await supabase.auth.signOut();
      
      if (result.error) {
        console.error("Sign out error:", result.error.message);
        throw result.error;
      }
      
      console.log("Sign out successful");
      return result;
    },
    onSuccess: () => {
      // Clear client-side state
      setAuthError(null);
      queryClient.clear();
      navigate('/');
    },
    onError: (error: Error) => {
      console.error('Sign out error:', error);
      setAuthError(error);
    }
  });

  // Retry authentication
  const retryAuthentication = useCallback(async () => {
    console.log("Attempting to retry authentication");
    setLoading(true);
    try {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setAuthError(null);
      console.log("Authentication retry successful:", data.session ? "Session found" : "No session");
    } catch (error) {
      console.error('Retry authentication error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    session,
    user,
    loading,
    isNewUser,
    clearIsNewUser,
    isSigningIn: signInMutation.isPending,
    isSigningUp: signUpMutation.isPending,
    isSigningOut: signOutMutation.isPending,
    authError,
    
    signIn: async (credentials: LoginCredentials) => {
      try {
        const data = await signInMutation.mutateAsync(credentials);
        return { user: data.user, error: null };
      } catch (error) {
        return { user: null, error: error as Error };
      }
    },
    
    signUp: async (credentials: SignUpCredentials) => {
      try {
        const data = await signUpMutation.mutateAsync(credentials);
        return { user: data.user, error: null };
      } catch (error) {
        return { user: null, error: error as Error };
      }
    },
    
    signOut: async () => {
      await signOutMutation.mutateAsync();
    },
    
    retryAuthentication
  };
}
