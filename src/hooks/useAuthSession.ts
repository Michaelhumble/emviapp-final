
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * A robust hook for handling authentication state and actions
 */
export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    // Set up auth state listener FIRST (this is crucial for proper session handling)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log('Auth state changed:', event);
      
      // Update session and user state synchronously
      setSession(newSession);
      setUser(newSession?.user ?? null);

      // Handle specific auth events
      if (event === 'SIGNED_OUT') {
        console.log('User signed out, clearing data');
        // Clear any user-specific data from localStorage
        localStorage.removeItem('emviapp_user_role');
        localStorage.removeItem('emviapp_new_user');
        localStorage.removeItem('artist_dashboard_tab');
        
        // No navigation here - let the component handle redirect after state updates
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Initial session check:', currentSession ? 'Session exists' : 'No session');
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    }).catch(err => {
      console.error('Error checking session:', err);
      setError('Failed to check authentication status');
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Enhanced sign out with proper cleanup and error handling
  const signOut = useCallback(async (): Promise<{ success: boolean; error?: Error }> => {
    setLoading(true);
    try {
      console.log('Starting sign out process');
      
      // Clear auth-related local storage first
      const keysToRemove = [
        'artist_dashboard_tab',
        'emviapp_user_role',
        'emviapp_new_user',
        'supabase.auth.token',
      ];
      
      // Clear specific keys
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      // Perform the actual sign out
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
      if (error) {
        throw error;
      }
      
      console.log('Sign out successful');
      
      // Set state synchronously after successful sign out
      setUser(null);
      setSession(null);
      
      toast.success("Successfully signed out");
      return { success: true };
    } catch (error: any) {
      console.error("Sign out error:", error);
      
      // Even if there's an error, we should force clear state
      setUser(null);
      setSession(null);
      
      toast.error("Sign out encountered an error. Redirecting anyway...");
      return { success: false, error: new Error(error.message || "Unknown error during sign out") };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    session,
    user,
    loading,
    error,
    isAuthenticated: !!session,
    signOut,
  };
}
