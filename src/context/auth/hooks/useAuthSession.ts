import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User, AuthChangeEvent } from '@supabase/supabase-js';

export const useAuthSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        setLoading(true);
        const { data: { session: initialSession } } = await supabase.auth.getSession();

        if (initialSession) {
          setSession(initialSession);
          setUser(initialSession.user);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, currentSession) => {
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
        } else {
          // Handle sign out
          if (event === 'SIGNED_OUT') {
            setSession(null);
            setUser(null);
          }
          
          // Handle password recovery
          if (event === 'PASSWORD_RECOVERY') {
            // Add password recovery logic
          }
          
          // Handle token refresh
          if (event === 'TOKEN_REFRESHED') {
            // Add token refresh logic
          }
          
          // Handle user update
          if (event === 'USER_UPDATED') {
            // Add user update logic
          }
          
          // Handle user deletion
          if (event === 'USER_DELETED') {
            setSession(null);
            setUser(null);
          }
          
          // Handle sign up
          if (event as AuthChangeEvent === 'SIGNED_UP') {
            // Add sign up logic
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { session, user, loading };
};
