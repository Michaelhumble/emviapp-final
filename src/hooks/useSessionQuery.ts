
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

const sessionKeys = {
  all: ['auth', 'session'] as const,
  current: () => [...sessionKeys.all, 'current'] as const,
};

export function useSessionQuery() {
  const queryClient = useQueryClient();
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  
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
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    },
    staleTime: Infinity, // Don't automatically refetch
    cacheTime: Infinity, // Keep in cache
  });
  
  // Authentication mutations
  const signInMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(sessionKeys.current(), data.session);
    },
  });
  
  const signUpMutation = useMutation({
    mutationFn: async ({ email, password, userData }: { email: string; password: string; userData: any }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      if (error) throw error;
      setIsNewUser(true);
      localStorage.setItem('emviapp_new_user', 'true');
      return data;
    }
  });
  
  const signOutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.setQueryData(sessionKeys.current(), null);
    },
  });
  
  // Clear new user status
  const clearIsNewUser = useCallback(() => {
    setIsNewUser(false);
    localStorage.removeItem('emviapp_new_user');
  }, []);
  
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
  };
}
