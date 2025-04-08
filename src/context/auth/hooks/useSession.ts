
import { useEffect, useState } from 'react';
import { Session, User, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  
  // Use try/catch to handle the case when hook is called outside Router context
  let navigate;
  try {
    navigate = useNavigate();
  } catch (error) {
    // If useNavigate throws an error, we're outside Router context
    // Provide a no-op function instead
    navigate = (path: string) => {
      console.warn('Navigation attempted outside Router context:', path);
    };
  }

  useEffect(() => {
    console.log('[Auth] Initializing session...');
    
    // Check for new user status in localStorage
    const storedNewUserStatus = localStorage.getItem('emviapp_new_user') === 'true';
    if (storedNewUserStatus) {
      setIsNewUser(true);
    }

    // IMPORTANT: First set up the auth state change listener
    // This must happen before getSession to avoid potential race conditions
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log(`[Auth] Auth state changed: ${event}`);
      
      setSession(newSession);
      setUser(newSession?.user ?? null);
      
      if (newSession?.user) {
        console.log(`[Auth] User authenticated: ${newSession.user.id}`);
      } else {
        console.log('[Auth] No authenticated user');
      }
      
      // If the user just signed up, set isNewUser to true
      if (event === 'SIGNED_UP' as AuthChangeEvent) {
        console.log('[Auth] New user signed up');
        setIsNewUser(true);
        localStorage.setItem('emviapp_new_user', 'true');
        navigate('/choose-role');
      }

      // If the user signs out, reset all states
      if (event === 'SIGNED_OUT' as AuthChangeEvent) {
        console.log('[Auth] User signed out');
        setIsNewUser(false);
        localStorage.removeItem('emviapp_new_user');
        // Clear any other auth-related local storage
        localStorage.removeItem('emviapp_user_role');
        localStorage.removeItem('emviapp_session');
      }
      
      setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      console.log('[Auth] Get session result:', existingSession ? 'Session found' : 'No session');
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      console.log('[Auth] Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Function to clear new user status
  const clearIsNewUser = () => {
    setIsNewUser(false);
    localStorage.removeItem('emviapp_new_user');
  };

  return { 
    session, 
    user, 
    loading, 
    isNewUser, 
    clearIsNewUser, 
    setLoading 
  };
}
