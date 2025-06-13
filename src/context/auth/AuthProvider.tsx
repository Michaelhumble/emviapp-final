
import React, { createContext, useEffect, useState, ReactNode } from "react";
import { Session, User, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "./types";
import { normalizeRole } from "@/utils/roles";
import { AuthContextType } from "./types";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

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
    isNewUser,
    clearIsNewUser,
    setLoading: setLoadingState,
    refreshUserProfile: () => {
      if (user?.id) {
        fetchUserProfile(user.id);
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
