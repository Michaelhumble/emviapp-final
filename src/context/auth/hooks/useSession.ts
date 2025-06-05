
import React, { useEffect, useState } from 'react';
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
    navigate = (path: string) => {};
  }

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
      if (event === 'SIGNED_UP' as AuthChangeEvent) {
        setIsNewUser(true);
        localStorage.setItem('emviapp_new_user', 'true');
        
        // REFACTOR: Role is now ONLY stored in auth metadata, not localStorage
        console.log("New user signed up, role stored in auth metadata:", session?.user?.user_metadata?.role);
        
        navigate('/choose-role');
      }
      
      // REFACTOR: Removed localStorage role storage - auth metadata is single source of truth
      if (event === 'SIGNED_IN' as AuthChangeEvent) {
        console.log("User signed in, role from metadata:", session?.user?.user_metadata?.role);
      }

      // If the user signs out, reset all states
      if (event === 'SIGNED_OUT' as AuthChangeEvent) {
        setIsNewUser(false);
        localStorage.removeItem('emviapp_new_user');
        // REFACTOR: No longer clearing role from localStorage - not stored there anymore
      }
      
      setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // REFACTOR: No longer storing role in localStorage - auth metadata is authoritative
      console.log("Existing session role:", session?.user?.user_metadata?.role);
      
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

  return { session, user, loading, isNewUser, clearIsNewUser, setLoading };
}
