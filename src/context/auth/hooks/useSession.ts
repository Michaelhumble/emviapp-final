
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User, AuthChangeEvent } from "@supabase/supabase-js";
import { toast } from "sonner";

/**
 * Hook to handle Supabase session management
 */
export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, currentSession) => {
        console.log("Auth state changed:", event);
        
        // Update session and user
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Handle sign up event - Using proper type comparison with enum
        if (event === 'SIGNED_UP' as AuthChangeEvent) {
          console.log("New user signed up!");
          setIsNewUser(true);
          localStorage.setItem('emviapp_new_user', 'true');
        }
        
        // Handle sign in event - Using proper type comparison with enum
        if (event === 'SIGNED_IN' as AuthChangeEvent) {
          console.log("User signed in!");
          // Check if this is a returning user
          const isNewUserFromStorage = localStorage.getItem('emviapp_new_user') === 'true';
          setIsNewUser(isNewUserFromStorage);
        }
        
        // Clear user data on sign out - Using proper type comparison with enum
        if (event === 'SIGNED_OUT' as AuthChangeEvent) {
          setSession(null);
          setUser(null);
          setIsNewUser(false);
          localStorage.removeItem('emviapp_new_user');
        }
      }
    );

    // Get initial session
    const getInitialSession = async () => {
      try {
        setLoading(true);
        
        // Get current session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        // Check if user is new from localStorage
        const isNewUserFromStorage = localStorage.getItem('emviapp_new_user') === 'true';
        if (isNewUserFromStorage) {
          setIsNewUser(true);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching initial session:", error);
        setLoading(false);
      }
    };

    getInitialSession();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
};
