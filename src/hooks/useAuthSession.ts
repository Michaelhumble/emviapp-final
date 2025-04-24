
import { useEffect, useState, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function useAuthSession() {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    isLoading: true,
    isError: false,
    error: null,
  });

  const refreshSession = useCallback(async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      setState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
        isLoading: false,
        isError: false,
        error: null
      }));
    } catch (error) {
      console.error('Error refreshing session:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        isError: true,
        error: error instanceof Error ? error : new Error('Failed to refresh session')
      }));
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        // Handle synchronous state updates immediately
        setState(prev => ({
          ...prev,
          session: currentSession,
          user: currentSession?.user ?? null,
          isLoading: false,
          isError: false,
          error: null
        }));
      }
    );

    // THEN check for existing session
    refreshSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshSession]);

  return state;
}
