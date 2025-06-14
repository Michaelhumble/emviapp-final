
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole } from '../types';
import { normalizeRole } from '@/utils/roles';
import { normalizeUserProfile } from '@/utils/profileNormalization';

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchUserProfile = async (userId: string): Promise<boolean> => {
    try {
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        setIsError(true);
        return false;
      }

      if (profile) {
        // Use normalization utility
        const normalizedProfile = normalizeUserProfile(profile);
        setUserProfile(normalizedProfile);
        setUserRole(normalizedProfile.role);
        setIsError(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      setIsError(true);
      return false;
    }
  };

  const refreshUserProfile = async (): Promise<boolean> => {
    if (!user?.id) return false;
    return await fetchUserProfile(user.id);
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN' && session?.user) {
          await fetchUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUserProfile(null);
          setUserRole(null);
          setIsError(false);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const updateUserRole = async (role: UserRole) => {
    try {
      if (!user?.id) return;
      
      const normalizedRole = normalizeRole(role);
      if (!normalizedRole) return;
      
      const { error } = await supabase
        .from('users')
        .update({ role: normalizedRole })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setUserRole(normalizedRole);
      await refreshUserProfile();
    } catch (error) {
      console.error("Error updating user role:", error);
      throw error;
    }
  };

  return {
    user,
    session,
    userProfile,
    userRole,
    loading: loading,
    isSignedIn: !!session,
    isError,
    refreshUserProfile,
    updateUserRole,
    setLoading
  };
};
