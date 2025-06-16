import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { UserRole, UserProfile } from '../types';
import { normalizeRole } from '@/utils/roles';
import { toast } from 'sonner';

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  const clearIsNewUser = () => {
    setIsNewUser(false);
    localStorage.removeItem('emviapp_new_user');
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      
      if (data) {
        // Type-safe role assignment
        const profileData = {
          ...data,
          role: data.role as UserRole || 'customer' as UserRole
        };
        setUserProfile(profileData);
        setUserRole(profileData.role);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const refreshUserProfile = async (): Promise<boolean> => {
    if (user?.id) {
      try {
        await fetchUserProfile(user.id);
        return true;
      } catch (error) {
        console.error('Error refreshing user profile:', error);
        return false;
      }
    }
    return false;
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      toast.success("Signed in successfully!");
      return { success: true };
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to sign in");
      return { success: false, error: err };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      setUserRole(null);
      setUserProfile(null);
      setIsNewUser(false);
      
      localStorage.removeItem('emviapp_new_user');
      localStorage.removeItem('emviapp_user_role');
      
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  const signUp = async (email: string, password: string, userData: any = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      toast.success("Account created successfully!");
      return { success: true, userId: data.user?.id };
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to sign up");
      return { success: false, error: err };
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      if (!user?.id) {
        return { success: false, error: new Error("No user logged in") };
      }

      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id);

      if (error) throw error;

      await fetchUserProfile(user.id);
      toast.success("Profile updated successfully!");
      return { success: true };
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to update profile");
      return { success: false, error: err };
    }
  };

  const updateUserRole = async (role: UserRole) => {
    try {
      if (!user?.id) return;

      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', user.id);

      if (error) throw error;

      setUserRole(role);
      localStorage.setItem('emviapp_user_role', role);
      toast.success("Role updated successfully!");
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update role");
    }
  };

  useEffect(() => {
    const storedNewUserStatus = localStorage.getItem('emviapp_new_user') === 'true';
    if (storedNewUserStatus) {
      setIsNewUser(true);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (event === 'SIGNED_UP') {
        setIsNewUser(true);
        localStorage.setItem('emviapp_new_user', 'true');
        
        const userRole = session?.user?.user_metadata?.role;
        if (userRole) {
          const normalizedRole = normalizeRole(userRole as UserRole);
          setUserRole(normalizedRole);
          if (normalizedRole) {
            localStorage.setItem('emviapp_user_role', normalizedRole);
          }
        }
      }
      
      if (event === 'SIGNED_IN' && session?.user) {
        const userRole = session?.user?.user_metadata?.role;
        if (userRole) {
          const normalizedRole = normalizeRole(userRole as UserRole);
          setUserRole(normalizedRole);
          if (normalizedRole) {
            localStorage.setItem('emviapp_user_role', normalizedRole);
          }
        }
        
        if (session?.user?.id) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        }
      }

      if (event === 'SIGNED_OUT') {
        setIsNewUser(false);
        setUserRole(null);
        setUserProfile(null);
        localStorage.removeItem('emviapp_new_user');
        localStorage.removeItem('emviapp_user_role');
      }
      
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const userRole = session.user.user_metadata?.role;
        if (userRole) {
          const normalizedRole = normalizeRole(userRole as UserRole);
          setUserRole(normalizedRole);
          if (normalizedRole) {
            localStorage.setItem('emviapp_user_role', normalizedRole);
          }
        }
        
        fetchUserProfile(session.user.id);
      } else {
        const cachedRole = localStorage.getItem('emviapp_user_role');
        if (cachedRole) {
          setUserRole(normalizeRole(cachedRole as UserRole));
        }
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    session,
    userRole,
    userProfile,
    loading,
    isSignedIn: !!user,
    isError: false,
    isNewUser,
    clearIsNewUser,
    setLoading,
    refreshUserProfile,
    signIn,
    signOut,
    signUp,
    updateProfile,
    updateUserRole
  };
};
