/**
 * 🔐 AUTHENTICATION PROVIDER - CENTRALIZED STATE MANAGEMENT
 * 
 * CRITICAL: This is the SINGLE SOURCE OF TRUTH for all authentication state
 * All components MUST use this context - NO local auth state allowed
 * 
 * Key Features:
 * - Immediate state propagation to all consumers
 * - Robust loading states to prevent UI flashing
 * - Synchronized user/session updates
 * - Real-time auth state without page refresh
 */

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { Session, User, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserRole, UserProfile } from "./types";
import { normalizeRole } from "@/utils/roles";
import { AuthContextType } from "./types";
import { AuthContext } from "./AuthContext";
import { toast } from "sonner";
import { needsRoleSelection } from "@/utils/roleDashboardMap";

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
      const { data: profileData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (!error && profileData) {
        const normalizedProfile = {
          ...profileData,
          role: normalizeRole(profileData.role as string) || 'customer'
        } as UserProfile;
        setUserProfile(normalizedProfile);
        
        // Set role from profile with normalization
        if (profileData.role) {
          const normalizedRole = normalizeRole(profileData.role as UserRole);
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

      // Sign in successful - the onAuthStateChange will handle state updates
      toast.success("Signed in successfully!");
      return { success: true };
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to sign in");
      return { success: false, error: err };
    }
  };

  // Sign out method with comprehensive cleanup
  const signOut = async () => {
    try {
      console.log('🚪 Starting comprehensive sign out process...');
      
      // 🚨 IMMEDIATE STATE CLEANUP for instant UI feedback
      setUser(null);
      setSession(null);
      setUserRole(null);
      setUserProfile(null);
      setIsNewUser(false);
      setLoading(false);
      
      // 🧹 COMPREHENSIVE CLEANUP: Clear ALL auth-related storage
      const authKeys = [
        'emviapp_new_user', 
        'emviapp_user_role',
        'sb-wwhqbjrhbajpabfdwnip-auth-token',
        'supabase.auth.token'
      ];
      
      authKeys.forEach(key => {
        localStorage.removeItem(key);
        console.log('🗑️ Removed:', key);
      });
      
      // Clear all Supabase auth keys (handles environment differences)
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
          console.log('🗑️ Removed localStorage key:', key);
        }
      });
      
      // Clear sessionStorage if used
      Object.keys(sessionStorage || {}).forEach(key => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          sessionStorage.removeItem(key);
          console.log('🗑️ Removed sessionStorage key:', key);
        }
      });
      
      // 🌐 GLOBAL SIGN OUT for cross-domain compatibility
      try {
        const { error } = await supabase.auth.signOut({ scope: 'global' });
        if (error) {
          console.warn("⚠️ Sign out warning:", error.message);
          // Don't throw - we've already cleared local state
        }
      } catch (supabaseError) {
        console.warn("⚠️ Supabase sign out failed:", supabaseError);
        // Continue with local cleanup even if remote sign out fails
      }
      
      toast.success("Signed out successfully");
      
      // 🔄 FORCE FULL PAGE RELOAD for completely clean state
      setTimeout(() => {
        console.log('🔄 Forcing page reload for clean state...');
        window.location.href = '/';
      }, 300); // Reduced timeout for faster UX
      
    } catch (error) {
      console.error("❌ Sign out error:", error);
      toast.error("Failed to sign out");
      
      // 🚨 FALLBACK: Even if sign out fails, redirect to clean up state
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
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

      // Sign up successful - the onAuthStateChange will handle state updates
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
    console.log('🔐 AuthProvider: Initializing auth state');
    
    // Check for existing new user status
    const storedNewUserStatus = localStorage.getItem('emviapp_new_user') === 'true';
    if (storedNewUserStatus) {
      setIsNewUser(true);
    }

    // 🔐 CRITICAL: Get initial session FIRST before setting up listeners
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        console.log('🔐 AuthProvider: Initial session check', {
          hasSession: !!session,
          hasUser: !!session?.user,
          userId: session?.user?.id,
          error: error?.message
        });
        
        // Set initial state
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('✅ AuthProvider: Found existing session, fetching profile');
          
          // Check for role in metadata first
          const userRole = session.user.user_metadata?.role;
          if (userRole) {
            const normalizedRole = normalizeRole(userRole as UserRole);
            setUserRole(normalizedRole);
            if (normalizedRole) {
              localStorage.setItem('emviapp_user_role', normalizedRole);
              console.log('🎭 AuthProvider: Role set from session metadata:', normalizedRole);
            }
          }
          
          // Fetch full profile
          await fetchUserProfile(session.user.id);
        } else {
          console.log('❌ AuthProvider: No existing session found');
          // Check localStorage for cached role
          const cachedRole = localStorage.getItem('emviapp_user_role');
          if (cachedRole) {
            setUserRole(normalizeRole(cachedRole as UserRole));
          }
        }
        
        // Set loading to false after initial check
        setLoading(false);
        
      } catch (error) {
        console.error('🚨 AuthProvider: Error initializing auth:', error);
        setLoading(false);
      }
    };

    // Initialize auth first
    initializeAuth();

    // 🔐 CRITICAL: Set up auth state listener for IMMEDIATE propagation
    // This ensures ALL consuming components update instantly when auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔐 AuthProvider: Auth state change detected', {
        event,
        hasUser: !!session?.user,
        userId: session?.user?.id,
        timestamp: new Date().toISOString()
      });
      
      // 🚨 IMMEDIATE STATE UPDATES: Set state synchronously for instant propagation
      setSession(session);
      setUser(session?.user ?? null);
      
      if (event === 'SIGNED_UP' as AuthChangeEvent) {
        console.log('📝 AuthProvider: User signed up - setting new user flag');
        setIsNewUser(true);
        localStorage.setItem('emviapp_new_user', 'true');
        
        // Store role from metadata if available
        const userRole = session?.user?.user_metadata?.role;
        if (userRole) {
          const normalizedRole = normalizeRole(userRole as UserRole);
          setUserRole(normalizedRole);
          if (normalizedRole) {
            localStorage.setItem('emviapp_user_role', normalizedRole);
            console.log('🎭 AuthProvider: Role set from signup metadata:', normalizedRole);
          }
        }
      }
      
      if (event === 'SIGNED_IN' as AuthChangeEvent) {
        console.log('✅ AuthProvider: User signed in - fetching profile');
        // Store role from metadata if available
        const userRole = session?.user?.user_metadata?.role;
        if (userRole) {
          const normalizedRole = normalizeRole(userRole as UserRole);
          setUserRole(normalizedRole);
          if (normalizedRole) {
            localStorage.setItem('emviapp_user_role', normalizedRole);
            console.log('🎭 AuthProvider: Role set from signin metadata:', normalizedRole);
          }
        }
        
        // 🔄 DEFERRED PROFILE FETCH: Use setTimeout to prevent auth listener deadlock
        if (session?.user?.id) {
          setTimeout(() => {
            console.log('👤 AuthProvider: Fetching user profile');
            fetchUserProfile(session.user.id);
          }, 0);
        }
      }

      if (event === 'SIGNED_OUT' as AuthChangeEvent) {
        console.log('🚪 AuthProvider: User signed out - clearing state');
        setIsNewUser(false);
        setUserRole(null);
        setUserProfile(null);
        localStorage.removeItem('emviapp_new_user');
        localStorage.removeItem('emviapp_user_role');
      }
      
  // 🏁 LOADING COMPLETE: Always set loading to false after auth event
      setLoading(false);
      
      console.log('🔐 AuthProvider: State update complete', {
        event,
        isSignedIn: !!session?.user,
        hasProfile: !!session?.user?.id,
        loading: false
      });
    });

    return () => {
      console.log('🔐 AuthProvider: Cleaning up subscription');
      subscription.unsubscribe();
    };
  }, []);

  // CENTRALIZED AUTH STATE CALCULATIONS (SINGLE SOURCE OF TRUTH)
  
  /** 
   * SIMPLIFIED isSignedIn check: User exists with valid session
   * This ensures immediate state detection without complex loading checks
   */
  const isSignedIn = !!user && !!session && !!user.id;
  
  /**
   * CENTRALIZED currentUserRole: Returns role only when authenticated and not loading
   * Returns null if user needs role selection (triggers onboarding)
   */
  const currentUserRole = isSignedIn ? userRole : null;
  
  /**
   * CENTRALIZED needsOnboarding: True if user is signed in but needs role selection
   */
  const needsOnboarding = isSignedIn && needsRoleSelection(userRole);


  // Context value
  const value: AuthContextType = {
    user,
    session,
    userRole: currentUserRole, // Use computed role
    userProfile,
    loading,
    isSignedIn, // Use robust calculation
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
