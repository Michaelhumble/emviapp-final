/**
 * 🧪 AUTH STATE TESTING UTILITIES
 * 
 * Future-proofing utilities for testing authentication state
 * and debugging auth-related issues.
 */

import { cleanupAuthState, detectCorruptedTokens, emergencyAuthReset } from './authCleanup';

/**
 * 🧪 SIMULATE TOKEN CORRUPTION for testing
 * Only available in development mode
 */
export const simulateTokenCorruption = () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('⚠️ Token corruption simulation only available in development');
    return false;
  }
  
  // Inject corrupted tokens
  localStorage.setItem('sb-wwhqbjrhbajpabfdwnip-auth-token', 'undefined');
  localStorage.setItem('supabase.auth.token', 'null');
  localStorage.setItem('corrupted-session', JSON.stringify({ user: null, access_token: 'invalid' }));
  
  console.log('🧪 [TEST] Injected corrupted tokens for testing');
  return true;
};

/**
 * 🧪 TEST AUTH STATE RECOVERY
 * Verifies that the app can recover from corrupted auth state
 */
export const testAuthRecovery = async () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('⚠️ Auth recovery test only available in development');
    return false;
  }
  
  console.log('🧪 [TEST] Starting auth recovery test...');
  
  // Step 1: Simulate corruption
  simulateTokenCorruption();
  
  // Step 2: Detect corruption
  const issues = detectCorruptedTokens();
  console.log('🧪 [TEST] Detected issues:', issues);
  
  // Step 3: Cleanup
  const cleanedCount = cleanupAuthState();
  console.log('🧪 [TEST] Cleaned items:', cleanedCount);
  
  // Step 4: Verify cleanup
  const remainingIssues = detectCorruptedTokens();
  console.log('🧪 [TEST] Remaining issues:', remainingIssues);
  
  const success = remainingIssues.length === 0;
  console.log(`🧪 [TEST] Recovery test ${success ? 'PASSED' : 'FAILED'}`);
  
  return success;
};

/**
 * 🐛 ADMIN DEBUG PANEL
 * Provides debugging utilities for auth issues
 */
export const getAuthDebugInfo = () => {
  const authKeys = Object.keys(localStorage).filter(key => 
    key.includes('auth') || key.includes('sb-') || key.includes('supabase')
  );
  
  const sessionKeys = Object.keys(sessionStorage || {}).filter(key => 
    key.includes('auth') || key.includes('sb-') || key.includes('supabase')
  );
  
  const corruptionIssues = detectCorruptedTokens();
  
  return {
    localStorage: {
      authKeys,
      count: authKeys.length,
      values: authKeys.reduce((acc, key) => {
        acc[key] = localStorage.getItem(key)?.substring(0, 50) + '...';
        return acc;
      }, {} as Record<string, string>)
    },
    sessionStorage: {
      authKeys: sessionKeys,
      count: sessionKeys.length
    },
    corruption: {
      issues: corruptionIssues,
      hasIssues: corruptionIssues.length > 0
    },
    timestamp: new Date().toISOString()
  };
};

/**
 * 🔧 MANUAL RECOVERY UTILITIES
 * Available for admin/debug use
 */
export const manualRecoveryUtils = {
  async forceCleanAuth() {
    console.log('🔧 [MANUAL] Force cleaning auth state...');
    const count = cleanupAuthState();
    return { cleaned: count, timestamp: new Date().toISOString() };
  },
  
  async emergencyReset() {
    console.log('🔧 [MANUAL] Emergency auth reset...');
    await emergencyAuthReset();
    return { status: 'reset_initiated', timestamp: new Date().toISOString() };
  },
  
  getDebugInfo() {
    return getAuthDebugInfo();
  },
  
  testRecovery() {
    return testAuthRecovery();
  }
};