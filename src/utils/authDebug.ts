/**
 * 🐛 AUTH DEBUG UTILITIES
 * 
 * Development tools for debugging auth issues.
 * Hidden in production.
 */

import { authStateManager } from '@/context/auth/AuthStateManager';
import { cleanupAuthState, detectCorruptedTokens } from './authCleanup';

/**
 * 🔍 DEBUG AUTH STATE
 */
export const debugAuthState = () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('⚠️ Debug tools only available in development');
    return null;
  }

  const state = authStateManager.getState();
  const corruptionIssues = detectCorruptedTokens();
  
  const debugInfo = {
    timestamp: new Date().toISOString(),
    authState: {
      isSignedIn: state.isSignedIn,
      isInitialized: state.isInitialized,
      loading: state.loading,
      hasUser: !!state.user,
      hasSession: !!state.session,
      hasProfile: !!state.userProfile,
      userRole: state.userRole,
      lastValidation: state.lastValidation ? new Date(state.lastValidation).toISOString() : 'never'
    },
    sessionInfo: state.session ? {
      userId: state.session.user?.id,
      email: state.session.user?.email,
      tokenPreview: state.session.access_token?.substring(0, 20) + '...',
      expiresAt: new Date(state.session.expires_at! * 1000).toISOString()
    } : null,
    storageInfo: {
      localStorage: Object.keys(localStorage).filter(key => 
        key.includes('auth') || key.includes('sb-') || key.includes('supabase') || key.includes('emviapp')
      ),
      sessionStorage: Object.keys(sessionStorage || {}).filter(key => 
        key.includes('auth') || key.includes('sb-') || key.includes('supabase')
      )
    },
    corruption: {
      issues: corruptionIssues,
      hasIssues: corruptionIssues.length > 0
    }
  };

  console.log('🐛 [AUTH DEBUG] Current state:', debugInfo);
  return debugInfo;
};

/**
 * 🧹 MANUAL CLEANUP (DEV ONLY)
 */
export const manualAuthCleanup = async () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('⚠️ Manual cleanup only available in development');
    return false;
  }

  console.log('🧹 [AUTH DEBUG] Manual cleanup initiated...');
  
  const beforeState = authStateManager.getState();
  console.log('📊 [AUTH DEBUG] State before cleanup:', {
    isSignedIn: beforeState.isSignedIn,
    hasSession: !!beforeState.session
  });

  // Perform cleanup
  const cleanedCount = cleanupAuthState();
  
  // Wait a moment
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const afterState = authStateManager.getState();
  console.log('📊 [AUTH DEBUG] State after cleanup:', {
    isSignedIn: afterState.isSignedIn,
    hasSession: !!afterState.session,
    cleanedItems: cleanedCount
  });

  return true;
};

/**
 * 🚨 EMERGENCY RESET (DEV ONLY)
 */
export const manualEmergencyReset = async () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('⚠️ Emergency reset only available in development');
    return false;
  }

  console.log('🚨 [AUTH DEBUG] Manual emergency reset...');
  await authStateManager.emergencyReset();
  return true;
};

/**
 * 🧪 SIMULATE TOKEN CORRUPTION (DEV ONLY)
 */
export const simulateTokenCorruption = () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('⚠️ Token corruption simulation only available in development');
    return false;
  }

  // Inject corrupted tokens
  localStorage.setItem('sb-wwhqbjrhbajpabfdwnip-auth-token', 'undefined');
  localStorage.setItem('supabase.auth.token', 'null');
  localStorage.setItem('corrupted-session', JSON.stringify({ 
    user: null, 
    access_token: 'invalid_token_' + Date.now() 
  }));

  console.log('🧪 [AUTH DEBUG] Injected corrupted tokens');
  return true;
};

/**
 * 🔍 VALIDATE CURRENT SESSION
 */
export const validateCurrentSession = async () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('⚠️ Session validation only available in development');
    return null;
  }

  const state = authStateManager.getState();
  
  if (!state.session) {
    console.log('🔍 [AUTH DEBUG] No session to validate');
    return { valid: false, reason: 'no_session' };
  }

  try {
    // Check token format
    if (!state.session.access_token || !state.session.user?.id) {
      return { valid: false, reason: 'invalid_format' };
    }

    // Check expiration
    const expiresAt = state.session.expires_at! * 1000;
    const now = Date.now();
    
    if (expiresAt <= now) {
      return { valid: false, reason: 'expired', expiresAt: new Date(expiresAt).toISOString() };
    }

    return { 
      valid: true, 
      expiresAt: new Date(expiresAt).toISOString(),
      timeUntilExpiry: Math.round((expiresAt - now) / 1000 / 60) + ' minutes'
    };

  } catch (error) {
    return { valid: false, reason: 'validation_error', error: error.message };
  }
};

/**
 * 🛠️ DEV TOOLBAR (Hidden in production)
 */
export const showAuthDebugToolbar = () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // Add global debug functions
  (window as any).authDebug = {
    getState: debugAuthState,
    cleanup: manualAuthCleanup,
    reset: manualEmergencyReset,
    corrupt: simulateTokenCorruption,
    validate: validateCurrentSession
  };

  console.log('🛠️ [AUTH DEBUG] Debug toolbar loaded. Use:');
  console.log('  authDebug.getState() - View current auth state');
  console.log('  authDebug.cleanup() - Manual cleanup');
  console.log('  authDebug.reset() - Emergency reset');
  console.log('  authDebug.corrupt() - Simulate corruption');
  console.log('  authDebug.validate() - Validate session');
};