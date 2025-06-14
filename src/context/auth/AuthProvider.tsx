
import React, { createContext, useEffect, useState, ReactNode } from "react";
import { Session, User, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserRole, UserProfile } from "./types";
import { normalizeRole } from "@/utils/roles";
import { AuthContextType } from "./types";
import { AuthContext } from "./AuthContext";
import { toast } from "sonner";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isError, setIsError] = useState(false);

  // Clear new user status
  const clearIsNewUser = () => {
    setIsNewUser(false);
    localStorage.removeItem('emviapp_new_user');
  };

  // Set loading state
  const setLoadingState = (loadingState: boolean) => {
    setLoading(loadingState);
  };

  // Fetch user profile data
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (!error && profile) {
        setUserProfile(profile);
        
        // Set role from profile with normalization
        if (profile.role) {
          const normalizedRole = normalizeRole(profile.role as UserRole);
          setUserRole(normalizedRole);
          if (normalizedRole) {
            localStorage.setItem('emviapp_user_role', normalizedRole);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Refresh user profile function
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

  // Sign in method
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

  // Sign out method
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local state
      setUser(null);
      setSession(null);
      setUserRole(null);
      setUserProfile(null);
      setIsNewUser(false);
      
      // Clear localStorage
      localStorage.removeItem('emviapp_new_user');
      localStorage.removeItem('emviapp_user_role');
      
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  // Sign up method
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

  // Update profile method
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

      // Refresh profile after update
      await fetchUserProfile(user.id);
      toast.success("Profile updated successfully!");
      return { success: true };
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to update profile");
      return { success: false, error: err };
    }
  };

  // Update user role method
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

  // Initialize auth state
  useEffect(() => {
    // Check for existing new user status
    const storedNewUserStatus = localStorage.getItem('emviapp_new_user') === 'true';
    if (storedNewUserStatus) {
      setIsNewUser(true);
    }

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session?.user?.id);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (event === 'SIGNED_UP' as AuthChangeEvent) {
        setIsNewUser(true);
        localStorage.setItem('emviapp_new_user', 'true');
        
        // Store role from metadata if available
        const userRole = session?.user?.user_metadata?.role;
        if (userRole) {
          const normalizedRole = normalizeRole(userRole as UserRole);
          setUserRole(normalizedRole);
          if (normalizedRole) {
            localStorage.setItem('emviapp_user_role', normalizedRole);
          }
        }
      }
      
      if (event === 'SIGNED_IN' as AuthChangeEvent) {
        // Store role from metadata if available
        const userRole = session?.user?.user_metadata?.role;
        if (userRole) {
          const normalizedRole = normalizeRole(userRole as UserRole);
          setUserRole(normalizedRole);
          if (normalizedRole) {
            localStorage.setItem('emviapp_user_role', normalizedRole);
          }
        }
        
        // Fetch full profile data after sign in
        if (session?.user?.id) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        }
      }

      if (event === 'SIGNED_OUT' as AuthChangeEvent) {
        setIsNewUser(false);
        setUserRole(null);
        setUserProfile(null);
        localStorage.removeItem('emviapp_new_user');
        localStorage.removeItem('emviapp_user_role');
      }
      
      setLoading(false);
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Check for role in metadata first
        const userRole = session.user.user_metadata?.role;
        if (userRole) {
          const normalizedRole = normalizeRole(userRole as UserRole);
          setUserRole(normalizedRole);
          if (normalizedRole) {
            localStorage.setItem('emviapp_user_role', normalizedRole);
          }
        }
        
        // Fetch full profile
        fetchUserProfile(session.user.id);
      } else {
        // Check localStorage for cached role
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

  // Context value
  const value: AuthContextType = {
    user,
    session,
    userRole,
    userProfile,
    loading,
    isSignedIn: !!user,
    isError,
    isNewUser,
    clearIsNewUser,
    setLoading: setLoadingState,
    refreshUserProfile,
    signIn,
    signOut,
    signUp,
    updateProfile,
    updateUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
