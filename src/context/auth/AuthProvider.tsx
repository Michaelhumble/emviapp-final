/**
 * 🛡️ BULLETPROOF AUTH PROVIDER - BREAKING INFINITE LOOPS
 * 
 * This is the COMPLETELY REFACTORED auth provider that:
 * - Eliminates infinite loops through proper initialization
 * - Uses centralized state management
 * - Provides real-time broadcasting to all consumers
 * - Handles edge cases and corruption gracefully
 * - Ensures UI synchronization without page reloads
 * 
 * KEY FEATURES:
 * - Waits for full initialization before rendering children
 * - Single source of truth for all auth state
 * - Event-driven updates for instant UI synchronization
 * - Comprehensive error handling and recovery
 * - Debug utilities for development
 */

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { AuthContextType } from "./types";
import { AuthContext } from "./AuthContext";
import { authStateManager } from "./AuthStateManager";
import { showAuthDebugToolbar } from "@/utils/authDebug";
import { Loader2 } from "lucide-react";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * 🚀 INITIALIZATION COMPONENT
 * Ensures auth is fully ready before rendering children
 */
const AuthInitializer: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      console.log('🚀 [AUTH PROVIDER] Initializing auth system...');
      
      try {
        // Wait for auth manager to fully initialize
        await authStateManager.initialize();
        
        // Show debug toolbar in development
        if (process.env.NODE_ENV === 'development') {
          showAuthDebugToolbar();
        }
        
        setIsReady(true);
        console.log('✅ [AUTH PROVIDER] Auth system ready');
        
      } catch (error) {
        console.error('🚨 [AUTH PROVIDER] Failed to initialize:', error);
        // Even on error, we need to render something
        setIsReady(true);
      }
    };

    initAuth();
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50/50 to-white">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-600" />
          <p className="text-sm text-gray-600">Initializing EmviApp...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState(() => authStateManager.getState());
  const [isNewUser, setIsNewUser] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Subscribe to auth state changes for real-time updates
    const unsubscribe = authStateManager.subscribe((newState) => {
      console.log('🔄 [AUTH PROVIDER] State update received:', {
        isSignedIn: newState.isSignedIn,
        isInitialized: newState.isInitialized,
        loading: newState.loading
      });
      
      setAuthState(newState);
    });

    // Check for stored new user status
    const storedNewUserStatus = localStorage.getItem('emviapp_new_user') === 'true';
    if (storedNewUserStatus) {
      setIsNewUser(true);
    }

    return unsubscribe;
  }, []);

  // Utility functions that aren't in the state manager
  const clearIsNewUser = () => {
    setIsNewUser(false);
    localStorage.removeItem('emviapp_new_user');
  };

  const setLoading = (loading: boolean) => {
    // This is now handled by the state manager, but kept for compatibility
    console.log('⚠️ [AUTH PROVIDER] setLoading called - consider using state manager directly');
  };

  // Create context value with enhanced state and actions
  const contextValue: AuthContextType = {
    // Core state from auth manager
    user: authState.user,
    session: authState.session,
    userProfile: authState.userProfile,
    userRole: authState.userRole,
    loading: authState.loading,
    isSignedIn: authState.isSignedIn,
    
    // Enhanced state
    isInitialized: authState.isInitialized,
    lastValidation: authState.lastValidation,
    
    // Local state
    isError,
    isNewUser,
    
    // Actions from auth manager
    signIn: authStateManager.signIn.bind(authStateManager),
    signOut: authStateManager.signOut.bind(authStateManager),
    signUp: authStateManager.signUp.bind(authStateManager),
    updateProfile: authStateManager.updateProfile.bind(authStateManager),
    updateUserRole: authStateManager.updateUserRole.bind(authStateManager),
    refreshUserProfile: authStateManager.refreshUserProfile.bind(authStateManager),
    emergencyReset: authStateManager.emergencyReset.bind(authStateManager),
    
    // Utility actions
    clearIsNewUser,
    setLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <AuthInitializer>
        {children}
      </AuthInitializer>
    </AuthContext.Provider>
  );
};

export default AuthProvider;