import { useState, useEffect } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole } from '../types';
import { normalizeRole } from '@/utils/roles';

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isError, setIsError] = useState(false);

  const refreshUserProfile = async (): Promise<boolean> => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        // Transform database data to UserProfile format
        const transformedProfile: UserProfile = {
          ...data,
          role: normalizeRole(data.role) || 'customer',
          badges: Array.isArray(data.badges) ? data.badges : 
                  (typeof data.badges === 'string' ? [data.badges] : [])
        };
        
        setUserProfile(transformedProfile);
        setUserRole(transformedProfile.role || 'customer');
        return true;
      }
    } catch (error) {
      console.error('Error refreshing user profile:', error);
      setIsError(true);
    }
    return false;
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsSignedIn(!!session?.user);

        // Check for new user signup
        if (event === 'SIGNED_UP') {
          setIsNewUser(true);
        }

        if (session?.user) {
          await refreshUserProfile();
        } else {
          setUserProfile(null);
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsSignedIn(!!session?.user);
      
      if (session?.user) {
        refreshUserProfile();
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    session,
    userProfile,
    userRole,
    loading,
    isSignedIn,
    isError,
    isNewUser,
    refreshUserProfile,
    setLoading,
  };
};
