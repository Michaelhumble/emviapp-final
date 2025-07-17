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

      // 🔍 DETECT AND CLEAN CORRUPTED TOKENS
      const corruptionIssues = detectCorruptedTokens();
      if (corruptionIssues.length > 0) {
        console.warn('⚠️ [AUTH MANAGER] Detected corrupted tokens on startup:', corruptionIssues);
        cleanupAuthState();
        toast.error("Authentication issue detected. Please sign in again.");
      }

      // 🔐 GET INITIAL SESSION WITH VALIDATION
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('❌ [AUTH MANAGER] Session check failed:', error.message);
        await this.handleSessionError(error);
        return;
      }

      // 🔄 SET UP AUTH LISTENER FIRST
      this.setupAuthListener();

      // 🎯 VALIDATE AND SET INITIAL STATE
      if (session && await this.validateSession(session)) {
        await this.setAuthenticatedState(session);
      } else {
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
    this.state.session = session;
    this.state.user = session.user;
    this.state.isSignedIn = true;

    // Load profile and role
    await this.loadUserProfile(session.user.id);
    this.loadUserRole(session.user);
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
      const { data: profileData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (!error && profileData) {
        this.state.userProfile = {
          ...profileData,
          role: normalizeRole(profileData.role as string) || 'customer'
        } as UserProfile;
      }
    } catch (error) {
      console.error('❌ [AUTH MANAGER] Profile load error:', error);
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
        cleanupAuthState();
        this.setUnauthenticatedState();
      } else if (session && await this.validateSession(session)) {
        await this.setAuthenticatedState(session);
      } else if (session) {
        // Invalid session - clean up
        console.warn('⚠️ [AUTH MANAGER] Invalid session during auth change');
        await this.handleSessionError(new Error('Invalid session'));
        return;
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
    
    // Clean up corrupted state
    cleanupAuthState();
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
      console.log('🔐 [AUTH MANAGER] Starting sign in...');
      
      // Pre-cleanup
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ [AUTH MANAGER] Sign in failed:', error.message);
        toast.error(error.message);
        return { success: false, error };
      }

      console.log('✅ [AUTH MANAGER] Sign in successful');
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
      
      // Clean storage
      cleanupAuthState();
      
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
      
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        console.error('❌ [AUTH MANAGER] Sign up failed:', error.message);
        toast.error(error.message);
        return { success: false, error };
      }

      console.log('✅ [AUTH MANAGER] Sign up successful');
      toast.success("Account created successfully!");
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
        .from('users')
        .update(data)
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
        .from('users')
        .update({ role })
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