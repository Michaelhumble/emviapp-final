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
import { cleanupAuthState, cleanupBeforeAuth, detectCorruptedTokens, emergencyAuthReset } from "@/utils/authCleanup";

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

  // 🔐 ENHANCED SIGN IN with comprehensive cleanup and error recovery
  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 [SIGN IN] Starting enhanced sign in process...');
      
      // 🚨 CRITICAL: Cleanup before auth to prevent token conflicts
      await cleanupBeforeAuth();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ [SIGN IN] Authentication failed:', error.message);
        
        // Handle specific auth errors
        if (error.message.includes('Invalid login credentials')) {
          toast.error("Invalid email or password");
        } else if (error.message.includes('session_not_found')) {
          toast.error("Session expired. Please try again.");
          // Trigger emergency reset for session issues
          await emergencyAuthReset();
        } else {
          toast.error(error.message);
        }
        
        return { success: false, error };
      }

      // 🎉 SUCCESS: Log successful authentication
      console.log('✅ [SIGN IN] Authentication successful for:', email);
      toast.success("Signed in successfully!");
      return { success: true };
    } catch (error) {
      const err = error as Error;
      console.error('🚨 [SIGN IN] Unexpected error:', err);
      toast.error(err.message || "Failed to sign in");
      return { success: false, error: err };
    }
  };

  // 🚪 ENHANCED SIGN OUT with comprehensive cleanup and recovery
  const signOut = async () => {
    try {
      console.log('🚪 [SIGN OUT] Starting enhanced sign out process...');
      
      // 🚨 IMMEDIATE UI STATE CLEANUP for instant feedback
      setUser(null);
      setSession(null);
      setUserRole(null);
      setUserProfile(null);
      setIsNewUser(false);
      setLoading(false);
      
      // 🧹 COMPREHENSIVE STORAGE CLEANUP
      const removedCount = cleanupAuthState();
      console.log(`🗑️ [SIGN OUT] Cleaned ${removedCount} storage items`);
      
      // 🌐 GLOBAL SIGN OUT for cross-domain compatibility
      try {
        const { error } = await supabase.auth.signOut({ scope: 'global' });
        if (error) {
          console.warn("⚠️ [SIGN OUT] Global sign out warning:", error.message);
          // Don't throw - we've already cleared local state
        } else {
          console.log('✅ [SIGN OUT] Global sign out successful');
        }
      } catch (supabaseError) {
        console.warn("⚠️ [SIGN OUT] Supabase sign out failed:", supabaseError);
        // Continue with local cleanup even if remote sign out fails
      }
      
      toast.success("Signed out successfully");
      
      // 🔄 FORCE CLEAN RELOAD for completely fresh state
      setTimeout(() => {
        console.log('🔄 [SIGN OUT] Forcing clean page reload...');
        window.location.href = '/';
      }, 200); // Reduced timeout for better UX
      
    } catch (error) {
      console.error("❌ [SIGN OUT] Error during sign out:", error);
      toast.error("Failed to sign out");
      
      // 🚨 FALLBACK: Emergency reset if normal sign out fails
      console.log('🚨 [SIGN OUT] Triggering emergency auth reset...');
      await emergencyAuthReset();
    }
  };

  // 📝 ENHANCED SIGN UP with comprehensive cleanup and validation
  const signUp = async (email: string, password: string, userData: any = {}) => {
    try {
      console.log('📝 [SIGN UP] Starting enhanced sign up process...');
      
      // 🚨 CRITICAL: Cleanup before auth to prevent conflicts
      await cleanupBeforeAuth();
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        console.error('❌ [SIGN UP] Registration failed:', error.message);
        
        // Handle specific signup errors
        if (error.message.includes('already registered')) {
          toast.error("An account with this email already exists");
        } else if (error.message.includes('session_not_found')) {
          toast.error("Session error. Please try again.");
          await emergencyAuthReset();
        } else {
          toast.error(error.message);
        }
        
        return { success: false, error };
      }

      // 🎉 SUCCESS: Log successful registration
      console.log('✅ [SIGN UP] Registration successful for:', email);
      toast.success("Account created successfully!");
      return { success: true, userId: data.user?.id };
    } catch (error) {
      const err = error as Error;
      console.error('🚨 [SIGN UP] Unexpected error:', err);
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

  // 🚀 ENHANCED AUTH INITIALIZATION with error detection and recovery
  useEffect(() => {
    console.log('🔐 [AUTH PROVIDER] Initializing enhanced auth state...');
    
    // 🔍 DETECT CORRUPTED TOKENS on startup
    const corruptionIssues = detectCorruptedTokens();
    if (corruptionIssues.length > 0) {
      console.warn('⚠️ [AUTH PROVIDER] Detected auth corruption on startup:', corruptionIssues);
      cleanupAuthState();
      toast.error("Authentication issue detected. Please sign in again.");
    }
    
    // Check for existing new user status
    const storedNewUserStatus = localStorage.getItem('emviapp_new_user') === 'true';
    if (storedNewUserStatus) {
      setIsNewUser(true);
    }

    // 🔐 CRITICAL: Get initial session FIRST with error handling
    const initializeAuth = async () => {
      try {
        console.log('🔍 [AUTH PROVIDER] Checking for existing session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ [AUTH PROVIDER] Session check failed:', error.message);
          
          // Handle specific session errors
          if (error.message.includes('session_not_found') || 
              error.message.includes('bad_jwt') ||
              error.message.includes('missing sub claim')) {
            console.log('🧹 [AUTH PROVIDER] Cleaning corrupted session...');
            cleanupAuthState();
          }
          
          setLoading(false);
          return;
        }
        
        console.log('🔍 [AUTH PROVIDER] Initial session check result:', {
          hasSession: !!session,
          hasUser: !!session?.user,
          userId: session?.user?.id,
          tokenPreview: session?.access_token ? `${session.access_token.substring(0, 10)}...` : 'none'
        });
        
        // 🚨 IMMEDIATE STATE UPDATE for UI synchronization
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('✅ [AUTH PROVIDER] Valid session found, fetching profile...');
          
          // Check for role in metadata first
          const userRole = session.user.user_metadata?.role;
          if (userRole) {
            const normalizedRole = normalizeRole(userRole as UserRole);
            setUserRole(normalizedRole);
            if (normalizedRole) {
              localStorage.setItem('emviapp_user_role', normalizedRole);
              console.log('🎭 [AUTH PROVIDER] Role set from session metadata:', normalizedRole);
            }
          }
          
          // Fetch full profile
          await fetchUserProfile(session.user.id);
        } else {
          console.log('❌ [AUTH PROVIDER] No valid session found');
          // Check localStorage for cached role
          const cachedRole = localStorage.getItem('emviapp_user_role');
          if (cachedRole) {
            setUserRole(normalizeRole(cachedRole as UserRole));
          }
        }
        
        // 🏁 COMPLETE: Set loading to false after initial check
        setLoading(false);
        console.log('✅ [AUTH PROVIDER] Auth initialization complete');
        
      } catch (error) {
        console.error('🚨 [AUTH PROVIDER] Critical error during initialization:', error);
        // Emergency cleanup and reset
        cleanupAuthState();
        setLoading(false);
        toast.error("Authentication error. Please refresh the page.");
      }
    };

    // Initialize auth first
    initializeAuth();

    // 🔄 ENHANCED AUTH STATE LISTENER with comprehensive error handling
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 [AUTH PROVIDER] Auth state change detected:', {
        event,
        hasUser: !!session?.user,
        userId: session?.user?.id,
        timestamp: new Date().toISOString(),
        tokenPreview: session?.access_token ? `${session.access_token.substring(0, 10)}...` : 'none'
      });
      
      // 🛡️ ERROR DETECTION: Check for corrupted session data
      if (session && (!session.user || !session.access_token)) {
        console.error('🚨 [AUTH PROVIDER] Corrupted session detected:', session);
        cleanupAuthState();
        setSession(null);
        setUser(null);
        toast.error("Authentication issue detected. Please sign in again.");
        return;
      }
      
      // 🚨 IMMEDIATE SYNCHRONOUS STATE UPDATES for instant UI propagation
      setSession(session);
      setUser(session?.user ?? null);
      
      // 🎯 EVENT-SPECIFIC HANDLING with enhanced logging
      if (event === 'SIGNED_UP' as AuthChangeEvent) {
        console.log('📝 [AUTH PROVIDER] User signed up - setting new user flag');
        setIsNewUser(true);
        localStorage.setItem('emviapp_new_user', 'true');
        
        // Store role from metadata if available
        const userRole = session?.user?.user_metadata?.role;
        if (userRole) {
          const normalizedRole = normalizeRole(userRole as UserRole);
          setUserRole(normalizedRole);
          if (normalizedRole) {
            localStorage.setItem('emviapp_user_role', normalizedRole);
            console.log('🎭 [AUTH PROVIDER] Role set from signup metadata:', normalizedRole);
          }
        }
      }
      
      if (event === 'SIGNED_IN' as AuthChangeEvent) {
        console.log('✅ [AUTH PROVIDER] User signed in - fetching profile');
        
        // Store role from metadata if available
        const userRole = session?.user?.user_metadata?.role;
        if (userRole) {
          const normalizedRole = normalizeRole(userRole as UserRole);
          setUserRole(normalizedRole);
          if (normalizedRole) {
            localStorage.setItem('emviapp_user_role', normalizedRole);
            console.log('🎭 [AUTH PROVIDER] Role set from signin metadata:', normalizedRole);
          }
        }
        
        // 🔄 DEFERRED PROFILE FETCH to prevent auth listener deadlock
        if (session?.user?.id) {
          setTimeout(() => {
            console.log('👤 [AUTH PROVIDER] Fetching user profile...');
            fetchUserProfile(session.user.id);
          }, 0);
        }
      }

      if (event === 'SIGNED_OUT' as AuthChangeEvent) {
        console.log('🚪 [AUTH PROVIDER] User signed out - clearing all state');
        setIsNewUser(false);
        setUserRole(null);
        setUserProfile(null);
        
        // Additional cleanup for sign out event
        cleanupAuthState();
      }
      
      if (event === 'TOKEN_REFRESHED' as AuthChangeEvent) {
        console.log('🔄 [AUTH PROVIDER] Token refreshed successfully');
      }
      
      // 🏁 ALWAYS: Set loading to false after any auth event
      setLoading(false);
      
      console.log('✅ [AUTH PROVIDER] Auth state update complete:', {
        event,
        isSignedIn: !!session?.user,
        hasProfile: !!session?.user?.id,
        loading: false
      });
    });

    return () => {
      console.log('🔐 [AUTH PROVIDER] Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array to prevent re-initialization

  // 🎯 CENTRALIZED AUTH STATE CALCULATIONS (SINGLE SOURCE OF TRUTH)
  
  /** 
   * 🔐 ENHANCED isSignedIn check: User exists with valid session and no corruption
   * This ensures immediate state detection with corruption protection
   */
  const isSignedIn = !!user && !!session && !!user.id && !!session.access_token;
  
  /**
   * 🎭 CENTRALIZED currentUserRole: Returns role only when authenticated
   * Returns null if user needs role selection (triggers onboarding)
   */
  const currentUserRole = isSignedIn ? userRole : null;
  
  /**
   * 🚀 CENTRALIZED needsOnboarding: True if user is signed in but needs role selection
   */
  const needsOnboarding = isSignedIn && needsRoleSelection(userRole);

  // 📊 ENHANCED DEBUG LOGGING for comprehensive monitoring
  if (process.env.NODE_ENV === 'development') {
    console.log('🔐 [AUTH PROVIDER] Current State:', {
      loading,
      hasUser: !!user,
      hasSession: !!session,
      hasValidToken: !!session?.access_token,
      isSignedIn,
      currentUserRole,
      needsOnboarding,
      userId: user?.id,
      timestamp: new Date().toISOString()
    });
  }


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
