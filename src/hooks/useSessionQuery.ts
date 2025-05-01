
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

const sessionKeys = {
  all: ['auth', 'session'] as const,
  current: () => [...sessionKeys.all, 'current'] as const,
};

export function useSessionQuery() {
  const queryClient = useQueryClient();
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [authError, setAuthError] = useState<Error | null>(null);
  
  // Initial setup for the session listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Update cached session data
      queryClient.setQueryData(sessionKeys.current(), session);
      
      // Handle sign-up events
      if (event === 'SIGNED_UP') {
        setIsNewUser(true);
        localStorage.setItem('emviapp_new_user', 'true');
        
        // Store user role if available
        if (session?.user?.user_metadata?.role) {
          localStorage.setItem('emviapp_user_role', session.user.user_metadata.role);
        }
        toast.success("Account created successfully! Welcome to EmviApp.");
      }
      
      // Handle sign-in events
      if (event === 'SIGNED_IN') {
        toast.success("Signed in successfully!");
        setAuthError(null);
      }
      
      // Handle signed-out events
      if (event === 'SIGNED_OUT') {
        toast.success("Signed out successfully");
        setAuthError(null);
      }
    });
    
    // Check for new user flag in localStorage
    const storedNewUser = localStorage.getItem('emviapp_new_user');
    if (storedNewUser === 'true') {
      setIsNewUser(true);
    }
    
    // Cleanup function
    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);
  
  // Query for the current session
  const { data: session, isLoading } = useQuery({
    queryKey: sessionKeys.current(),
    queryFn: async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        return data.session;
      } catch (error) {
        console.error("Session retrieval error:", error);
        setAuthError(error instanceof Error ? error : new Error("Failed to retrieve session"));
        return null;
      }
    },
    staleTime: Infinity, // Don't automatically refetch
    cacheTime: Infinity, // Keep in cache
    retry: 2, // Retry failed requests twice
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000), // Exponential backoff
  });
  
  // Authentication mutations with enhanced error handling
  const signInMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      setAuthError(null);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        // Handle specific error types with helpful messages
        if (error.message.includes('Invalid login')) {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('Please verify your email before signing in. Check your inbox for a verification link.');
        } else {
          throw error;
        }
      }
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(sessionKeys.current(), data.session);
      setAuthError(null);
    },
    onError: (error) => {
      console.error("Sign in error:", error);
      setAuthError(error instanceof Error ? error : new Error("Failed to sign in"));
      toast.error(
        <div className="flex flex-col">
          <span className="font-medium">Sign in failed</span>
          <span className="text-sm opacity-90 mt-1">{error instanceof Error ? error.message : 'Authentication error'}</span>
        </div>
      );
    }
  });
  
  const signUpMutation = useMutation({
    mutationFn: async ({ email, password, userData }: { email: string; password: string; userData: any }) => {
      setAuthError(null);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (error) {
        // Handle specific error types with helpful messages
        if (error.message.includes('already registered')) {
          throw new Error('This email is already registered. Please sign in instead or use a different email.');
        } else if (error.message.includes('password')) {
          throw new Error('Password is too weak. Please use a stronger password (at least 6 characters).');
        } else {
          throw error;
        }
      }
      
      setIsNewUser(true);
      localStorage.setItem('emviapp_new_user', 'true');
      return data;
    },
    onError: (error) => {
      console.error("Sign up error:", error);
      setAuthError(error instanceof Error ? error : new Error("Failed to sign up"));
      toast.error(
        <div className="flex flex-col">
          <span className="font-medium">Sign up failed</span>
          <span className="text-sm opacity-90 mt-1">{error instanceof Error ? error.message : 'Registration error'}</span>
        </div>
      );
    }
  });
  
  const signOutMutation = useMutation({
    mutationFn: async () => {
      setAuthError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.setQueryData(sessionKeys.current(), null);
      localStorage.removeItem('emviapp_new_user');
      localStorage.removeItem('emviapp_user_role');
    },
    onError: (error) => {
      console.error("Sign out error:", error);
      setAuthError(error instanceof Error ? error : new Error("Failed to sign out"));
      toast.error(
        <div className="flex flex-col">
          <span className="font-medium">Sign out failed</span>
          <span className="text-sm opacity-90 mt-1">
            {error instanceof Error ? error.message : 'Unable to sign out properly'}
          </span>
          <span className="text-xs opacity-75 mt-1">
            Please try again or refresh your browser
          </span>
        </div>
      );
    }
  });
  
  // Clear new user status
  const clearIsNewUser = useCallback(() => {
    setIsNewUser(false);
    localStorage.removeItem('emviapp_new_user');
  }, []);
  
  // Function to retry authentication after failure
  const retryAuthentication = useCallback(() => {
    setAuthError(null);
    queryClient.refetchQueries({ queryKey: sessionKeys.current() });
  }, [queryClient]);
  
  return {
    session,
    user: session?.user || null,
    loading: isLoading,
    isNewUser,
    clearIsNewUser,
    signIn: signInMutation.mutate,
    signUp: signUpMutation.mutate,
    signOut: signOutMutation.mutate,
    isSigningIn: signInMutation.isLoading,
    isSigningUp: signUpMutation.isLoading,
    isSigningOut: signOutMutation.isLoading,
    authError,
    retryAuthentication,
  };
}
