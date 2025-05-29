
import { useState, useEffect } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  const clearIsNewUser = () => setIsNewUser(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Fix: Use correct string value for AuthChangeEvent
        if (event === 'SIGNED_IN') {
          // Check if this is a new user by looking at user metadata or creation time
          if (session?.user) {
            const userCreatedAt = new Date(session.user.created_at);
            const now = new Date();
            const timeDiff = now.getTime() - userCreatedAt.getTime();
            const isRecentlyCreated = timeDiff < 60000; // Less than 1 minute ago
            
            if (isRecentlyCreated) {
              setIsNewUser(true);
            }
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return {
    session,
    user,
    loading,
    isNewUser,
    clearIsNewUser,
    setLoading
  };
};
