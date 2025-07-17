/**
 * 🪝 ENHANCED AUTH HOOK
 * 
 * This is the ONLY way components should access auth state.
 * Provides real-time updates and prevents infinite loops.
 */

import { useEffect, useState } from 'react';
import { authStateManager, AuthState, AuthActions } from '@/context/auth/AuthStateManager';

export function useAuthState(): AuthState & AuthActions {
  const [state, setState] = useState<AuthState>(() => authStateManager.getState());

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = authStateManager.subscribe(setState);
    
    return unsubscribe;
  }, []);

  // Return state + actions
  return {
    ...state,
    signIn: authStateManager.signIn.bind(authStateManager),
    signOut: authStateManager.signOut.bind(authStateManager),
    signUp: authStateManager.signUp.bind(authStateManager),
    updateProfile: authStateManager.updateProfile.bind(authStateManager),
    updateUserRole: authStateManager.updateUserRole.bind(authStateManager),
    refreshUserProfile: authStateManager.refreshUserProfile.bind(authStateManager),
    emergencyReset: authStateManager.emergencyReset.bind(authStateManager),
  };
}