
import { useEffect, useState } from 'react';
import { Session, User, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for new user status in localStorage
    const storedNewUserStatus = localStorage.getItem('emviapp_new_user') === 'true';
    if (storedNewUserStatus) {
      setIsNewUser(true);
    }

    // Get the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // If the user just signed up, set isNewUser to true
      if (event === 'SIGNED_UP') {
        setIsNewUser(true);
        localStorage.setItem('emviapp_new_user', 'true');
        navigate('/choose-role');
      }

      // If the user signs out, reset all states
      if (event === 'SIGNED_OUT') {
        setIsNewUser(false);
        localStorage.removeItem('emviapp_new_user');
      }
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
