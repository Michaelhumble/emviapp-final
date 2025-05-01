
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User, AuthChangeEvent } from '@supabase/supabase-js';
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
    navigate = () => {};
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
        
        // Check for role in user metadata and store it
        const userRole = session?.user?.user_metadata?.role;
        if (userRole) {
          localStorage.setItem('emviapp_user_role', userRole);
        }
        
        navigate('/choose-role');
      }
      
      // If the user signs in, check for role info
      if (event === 'SIGNED_IN' as AuthChangeEvent) {
        const userRole = session?.user?.user_metadata?.role;
        if (userRole) {
          localStorage.setItem('emviapp_user_role', userRole);
        }
      }

      // If the user signs out, reset all states
      if (event === 'SIGNED_OUT' as AuthChangeEvent) {
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

  return { session, user, loading, isNewUser, clearIsNewUser, setLoading };
}
