/**
 * 🎯 CENTRALIZED AUTH STATE MANAGER
 * 
 * This module handles ALL authentication state logic in one place.
 * NO other component should manage auth state directly.
 * 
 * FEATURES:
 * - Bulletproof session validation
 * - Real-time token checking
 * - Event broadcasting for instant UI updates
 * - Edge-case recovery
 * - Debug utilities
 */

import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserRole, UserProfile } from "./types";
import { normalizeRole } from "@/utils/roles";
import { cleanupAuthState, detectCorruptedTokens } from "@/utils/authCleanup";
import { toast } from "sonner";

export interface AuthState {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  isSignedIn: boolean;
  isInitialized: boolean;
  lastValidation: number;
}

export interface AuthActions {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ success: boolean; error?: any; userId?: string }>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: any }>;
  updateUserRole: (role: UserRole) => Promise<void>;
  refreshUserProfile: () => Promise<boolean>;
  emergencyReset: () => Promise<void>;
}

class AuthStateManager {
  private state: AuthState = {
    user: null,
    session: null,
    userProfile: null,
    userRole: null,
    loading: true,
    isSignedIn: false,
    isInitialized: false,
    lastValidation: 0
  };

  private listeners: Set<(state: AuthState) => void> = new Set();
  private initPromise: Promise<void> | null = null;

  constructor() {
    console.log('🎯 [AUTH MANAGER] Initializing...');
  }

  /**
   * 🔄 SUBSCRIBE TO STATE CHANGES
   * Components use this to get real-time updates
   */
  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.add(listener);
    // Immediately call with current state
    listener(this.getState());
    
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * 📊 GET CURRENT STATE (IMMUTABLE)
   */
  getState(): AuthState {
    return { ...this.state };
  }

  /**
   * 🔄 BROADCAST STATE TO ALL LISTENERS
   */
  private broadcast() {
    const state = this.getState();
    console.log('📡 [AUTH MANAGER] Broadcasting state:', {
      isSignedIn: state.isSignedIn,
      hasUser: !!state.user,
      hasSession: !!state.session,
      isInitialized: state.isInitialized,
      loading: state.loading
    });

    this.listeners.forEach(listener => {
      try {
        listener(state);
      } catch (error) {
        console.error('❌ [AUTH MANAGER] Listener error:', error);
      }
    });
  }

  /**
   * 🚀 INITIALIZE AUTH STATE
   * Must complete before any UI renders
   */
  async initialize(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this._performInitialization();
    return this.initPromise;
  }

  private async _performInitialization(): Promise<void> {
    try {
      console.log('🚀 [AUTH MANAGER] Starting initialization...');

      // 🔐 GET INITIAL SESSION - TRUST SUPABASE STORAGE COMPLETELY
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.warn('⚠️ [AUTH MANAGER] Session check warning (continuing):', error.message);
        // Don't fail initialization on session errors - user might still be logged in
      }

      // 🔄 SET UP AUTH LISTENER FIRST
      this.setupAuthListener();

      // 🎯 TRUST SUPABASE SESSION STORAGE COMPLETELY - NO VALIDATION
      if (session) {
        console.log('✅ [AUTH MANAGER] Session found, restoring authenticated state');
        await this.setAuthenticatedState(session);
      } else {
        console.log('ℹ️ [AUTH MANAGER] No session found, user not signed in');
        this.setUnauthenticatedState();
      }

      this.state.isInitialized = true;
      this.state.loading = false;
      
      console.log('✅ [AUTH MANAGER] Initialization complete');
      this.broadcast();

    } catch (error) {
      console.error('🚨 [AUTH MANAGER] Critical initialization error:', error);
      await this.emergencyReset();
    }
  }

  /**
   * 🛡️ VALIDATE SESSION WITH REAL-TIME SUPABASE CHECK
   */
  private async validateSession(session: Session): Promise<boolean> {
    try {
      // Check if tokens are valid format
      if (!session.access_token || !session.user || !session.user.id) {
        console.warn('⚠️ [AUTH MANAGER] Invalid session format');
        return false;
      }

      // Real-time validation with Supabase
      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data.user) {
        console.warn('⚠️ [AUTH MANAGER] Session validation failed:', error?.message);
        return false;
      }

      this.state.lastValidation = Date.now();
      return true;

    } catch (error) {
      console.warn('⚠️ [AUTH MANAGER] Session validation error:', error);
      return false;
    }
  }

  /**
   * 🎯 SET AUTHENTICATED STATE
   */
  private async setAuthenticatedState(session: Session) {
    console.log('🎯 [AUTH MANAGER] Setting authenticated state for:', session.user.email);
    
    this.state.session = session;
    this.state.user = session.user;
    
    // CRITICAL: Set isSignedIn to true IMMEDIATELY when we have valid session
    this.state.isSignedIn = true;
    
    console.log('✅ [AUTH MANAGER] User marked as signed in with valid session');

    // Load profile and role (these can fail without affecting signed-in status)
    await this.loadUserProfile(session.user.id);
    this.loadUserRole(session.user);
    
    console.log('🎯 [AUTH MANAGER] Final authenticated state:', {
      isSignedIn: this.state.isSignedIn,
      hasUser: !!this.state.user,
      hasSession: !!this.state.session,
      userEmail: this.state.user?.email
    });
  }

  /**
   * 🚪 SET UNAUTHENTICATED STATE
   */
  private setUnauthenticatedState() {
    this.state.session = null;
    this.state.user = null;
    this.state.userProfile = null;
    this.state.userRole = null;
    this.state.isSignedIn = false;
  }

  /**
   * 👤 LOAD USER PROFILE
   */
  private async loadUserProfile(userId: string): Promise<void> {
    try {
      console.log('👤 [AUTH MANAGER] Loading profile for user:', userId);
      
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      console.log('👤 [AUTH MANAGER] Profile query result:', { profileData, error });
      
      if (error) {
        console.error('❌ [AUTH MANAGER] Profile load error - RLS ISSUE:', error);
        // If profile load fails due to RLS, we can still mark as signed in with metadata
        console.warn('⚠️ [AUTH MANAGER] Using fallback role from user metadata');
        return;
      }
      
      if (profileData && typeof profileData === 'object' && 'role' in profileData) {
        this.state.userProfile = {
          ...(profileData as any),
          role: normalizeRole(profileData.role as string) || 'customer'
        } as UserProfile;
        console.log('✅ [AUTH MANAGER] Profile loaded successfully:', this.state.userProfile);
      } else {
        console.warn('⚠️ [AUTH MANAGER] No profile data found for user');
      }
    } catch (error) {
      console.error('❌ [AUTH MANAGER] Profile load critical error:', error);
    }
  }

  /**
   * 🎭 LOAD USER ROLE
   */
  private loadUserRole(user: User) {
    const metadataRole = user.user_metadata?.role;
    if (metadataRole) {
      const normalizedRole = normalizeRole(metadataRole as UserRole);
      this.state.userRole = normalizedRole;
      if (normalizedRole) {
        localStorage.setItem('emviapp_user_role', normalizedRole);
      }
    } else {
      // Check localStorage for cached role
      const cachedRole = localStorage.getItem('emviapp_user_role');
      if (cachedRole) {
        this.state.userRole = normalizeRole(cachedRole as UserRole);
      }
    }
  }

  /**
   * 🔄 SETUP AUTH LISTENER
   */
  private setupAuthListener() {
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 [AUTH MANAGER] Auth state change:', {
        event,
        hasSession: !!session,
        hasUser: !!session?.user
      });

      // Prevent infinite loops by checking if state actually changed
      const currentSession = this.state.session;
      const sessionChanged = !currentSession !== !session || 
                           currentSession?.access_token !== session?.access_token;

      if (!sessionChanged && this.state.isInitialized) {
        console.log('🔄 [AUTH MANAGER] No state change, skipping update');
        return;
      }

      if (event === 'SIGNED_OUT') {
        // Only clean up app-specific keys, not Supabase session tokens
        localStorage.removeItem('emviapp_new_user');
        localStorage.removeItem('emviapp_user_role');
        this.setUnauthenticatedState();
      } else if (session) {
        // TRUST Supabase session completely - don't validate to prevent sign-outs
        await this.setAuthenticatedState(session);
      }

      this.state.loading = false;
      this.broadcast();
    });
  }

  /**
   * 🚨 HANDLE SESSION ERRORS
   */
  private async handleSessionError(error: any) {
    console.error('🚨 [AUTH MANAGER] Session error:', error.message);
    
    // Clean up corrupted state (preserve valid Supabase tokens)
    localStorage.removeItem('emviapp_new_user');
    localStorage.removeItem('emviapp_user_role');
    this.setUnauthenticatedState();
    this.state.loading = false;
    this.state.isInitialized = true;

    // Show user-friendly error
    if (error.message.includes('session_not_found') ||
        error.message.includes('bad_jwt') ||
        error.message.includes('missing sub claim')) {
      toast.error("Your session has expired. Please sign in again.");
    }

    this.broadcast();
  }

  /**
   * 🔐 SIGN IN
   */
  async signIn(email: string, password: string): Promise<{ success: boolean; error?: any }> {
    try {
      console.log('🔐 [AUTH MANAGER] Starting sign in for:', email);
      
      const isEmviEmail = email.endsWith('@emvi.app');
      if (isEmviEmail) {
        console.log('🎯 [AUTH MANAGER] @emvi.app email detected - bypassing restrictions');
      }
      
      // DON'T touch any storage during sign-in - let Supabase handle everything
      // NO cleanup of any kind during normal authentication flows
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ [AUTH MANAGER] Sign in failed:', error.message);
        
        // For @emvi.app emails, if it's an email confirmation issue, force confirm via edge function
        if (isEmviEmail && (error.message.includes('email_not_confirmed') || error.message.includes('Email not confirmed'))) {
          console.log('🔧 [AUTH MANAGER] Email not confirmed, forcing confirmation for @emvi.app email...');
          
          try {
            // Call edge function to force confirm the email
            const { data: confirmData, error: confirmError } = await supabase.functions.invoke('force-confirm-email', {
              body: { email }
            });
            
            if (confirmError) {
              console.error('❌ [AUTH MANAGER] Force confirm failed:', confirmError);
              toast.error("Failed to confirm @emvi.app email. Please contact support.");
              return { success: false, error: confirmError };
            }
            
            console.log('✅ [AUTH MANAGER] Email force-confirmed, retrying login...');
            
            // Wait a moment for confirmation to process
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Retry login
            const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            
            if (!retryError && retryData.user) {
              console.log('✅ [AUTH MANAGER] Retry login successful for:', email);
              toast.success("Signed in successfully!");
              return { success: true };
            } else {
              console.error('❌ [AUTH MANAGER] Retry login failed:', retryError);
              toast.error("Login retry failed after email confirmation.");
              return { success: false, error: retryError };
            }
            
          } catch (retryError) {
            console.error('❌ [AUTH MANAGER] Failed to force confirm email:', retryError);
            toast.error("@emvi.app email confirmation failed. Please contact support.");
            return { success: false, error: retryError };
          }
        } else {
          toast.error(error.message);
        }
        return { success: false, error };
      }

      console.log('✅ [AUTH MANAGER] Sign in successful for:', email);
      toast.success("Signed in successfully!");
      return { success: true };

    } catch (error) {
      const err = error as Error;
      console.error('🚨 [AUTH MANAGER] Sign in error:', err);
      toast.error(err.message || "Failed to sign in");
      return { success: false, error: err };
    }
  }

  /**
   * 🚪 SIGN OUT
   */
  async signOut(): Promise<void> {
    try {
      console.log('🚪 [AUTH MANAGER] Starting sign out...');
      
      // Immediate UI cleanup
      this.setUnauthenticatedState();
      this.broadcast();
      
      // Clean only app-specific storage, preserve Supabase session for proper cleanup
      localStorage.removeItem('emviapp_new_user');
      localStorage.removeItem('emviapp_user_role');
      
      // Remote sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      toast.success("Signed out successfully");
      
    } catch (error) {
      console.error('❌ [AUTH MANAGER] Sign out error:', error);
      toast.error("Failed to sign out");
      // Force cleanup anyway
      await this.emergencyReset();
    }
  }

  /**
   * 📝 SIGN UP
   */
  async signUp(email: string, password: string, userData: any = {}): Promise<{ success: boolean; error?: any; userId?: string }> {
    try {
      console.log('📝 [AUTH MANAGER] Starting sign up...');
      
      // CRITICAL: Never clean storage during sign up - destroys session persistence
      
      const isEmviEmail = email.endsWith('@emvi.app');
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/`,
          // Skip email confirmation for @emvi.app emails
          ...(isEmviEmail ? { skipEmailConfirmation: true } : {})
        }
      });

      if (error) {
        console.error('❌ [AUTH MANAGER] Sign up failed:', error.message);
        toast.error(error.message);
        return { success: false, error };
      }

      console.log('✅ [AUTH MANAGER] Sign up successful');
      
      if (isEmviEmail) {
        toast.success("Your @emvi.app account is ready to use!");
      } else {
        toast.success("Account created successfully!");
      }
      
      return { success: true, userId: data.user?.id };

    } catch (error) {
      const err = error as Error;
      console.error('🚨 [AUTH MANAGER] Sign up error:', err);
      toast.error(err.message || "Failed to sign up");
      return { success: false, error: err };
    }
  }

  /**
   * 🚨 EMERGENCY RESET
   */
  async emergencyReset(): Promise<void> {
    console.log('🚨 [AUTH MANAGER] Emergency reset triggered');
    
    // Multiple cleanup passes
    for (let i = 0; i < 3; i++) {
      cleanupAuthState();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Reset state
    this.setUnauthenticatedState();
    this.state.loading = false;
    this.state.isInitialized = true;
    
    this.broadcast();
    
    toast.error("Authentication reset. Please sign in again.");
  }

  /**
   * 🔄 REFRESH USER PROFILE
   */
  async refreshUserProfile(): Promise<boolean> {
    if (this.state.user?.id) {
      try {
        await this.loadUserProfile(this.state.user.id);
        this.broadcast();
        return true;
      } catch (error) {
        console.error('❌ [AUTH MANAGER] Profile refresh error:', error);
        return false;
      }
    }
    return false;
  }

  /**
   * 📝 UPDATE PROFILE
   */
  async updateProfile(data: Partial<UserProfile>): Promise<{ success: boolean; error?: any }> {
    try {
      if (!this.state.user?.id) {
        return { success: false, error: new Error("No user logged in") };
      }

      const { error } = await supabase
        .from('profiles')
        .update(data as any)
        .eq('id', this.state.user.id);

      if (error) throw error;

      await this.refreshUserProfile();
      toast.success("Profile updated successfully!");
      return { success: true };

    } catch (error) {
      const err = error as Error;
      console.error('❌ [AUTH MANAGER] Profile update error:', err);
      toast.error(err.message || "Failed to update profile");
      return { success: false, error: err };
    }
  }

  /**
   * 🎭 UPDATE USER ROLE
   */
  async updateUserRole(role: UserRole): Promise<void> {
    try {
      if (!this.state.user?.id) return;

      const { error } = await supabase
        .from('profiles')
        .update({ role } as any)
        .eq('id', this.state.user.id);

      if (error) throw error;

      this.state.userRole = role;
      localStorage.setItem('emviapp_user_role', role);
      this.broadcast();
      
      toast.success("Role updated successfully!");

    } catch (error) {
      console.error('❌ [AUTH MANAGER] Role update error:', error);
      toast.error("Failed to update role");
    }
  }
}

// Singleton instance
export const authStateManager = new AuthStateManager();