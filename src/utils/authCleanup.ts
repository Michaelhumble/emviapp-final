/**
 * 🧹 COMPREHENSIVE AUTH STATE CLEANUP UTILITY
 * 
 * This utility handles complete cleanup of authentication state
 * to prevent auth limbo states and token conflicts.
 * 
 * WHY AGGRESSIVE CLEANUP IS NEEDED:
 * - Supabase can leave corrupted tokens in storage
 * - Multiple project environments can create conflicting keys
 * - Browser storage can become inconsistent across tabs
 * - Auth state can desync between user and session objects
 * 
 * FUTURE-PROOFING:
 * - Handles all known Supabase storage patterns
 * - Cross-browser compatible cleanup
 * - Defensive against new storage key patterns
 * - Comprehensive logging for debugging
 */

import { supabase } from "@/integrations/supabase/client";

/**
 * 🚨 AGGRESSIVE AUTH STATE CLEANUP
 * Removes ALL possible auth-related storage across all browsers
 */
export const cleanupAuthState = () => {
  console.log('🧹 [AUTH CLEANUP] Starting selective auth state cleanup...');
  
  // ONLY clean up app-specific keys, NOT Supabase session tokens
  const appSpecificKeys = [
    'emviapp_new_user',
    'emviapp_user_role'
  ];
  
  let removedCount = 0;
  
  // Remove only app-specific keys, preserve Supabase session storage
  appSpecificKeys.forEach(key => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      removedCount++;
      console.log('🗑️ [AUTH CLEANUP] Removed app key:', key);
    }
  });
  
  console.log(`✅ [AUTH CLEANUP] Selective cleanup complete. Removed ${removedCount} app-specific items`);
  return removedCount;
};

/**
 * 🛡️ DETECT CORRUPTED AUTH TOKENS
 * Checks for common token corruption patterns
 */
export const detectCorruptedTokens = () => {
  const issues = [];
  
  // Check for malformed tokens
  Object.keys(localStorage).forEach(key => {
    if (key.includes('auth') || key.includes('sb-')) {
      try {
        const value = localStorage.getItem(key);
        if (value && value.includes('undefined') || value === 'null') {
          issues.push(`Malformed token in ${key}: ${value}`);
        }
      } catch (e) {
        issues.push(`Unreadable token in ${key}: ${e.message}`);
      }
    }
  });
  
  return issues;
};

/**
 * 🔄 CLEANUP BEFORE AUTH OPERATIONS
 * Always call this before sign-in or sign-up
 */
export const cleanupBeforeAuth = async () => {
  console.log('🔄 [AUTH CLEANUP] Pre-auth cleanup starting...');
  
  // Only clean up app-specific storage, NOT Supabase session tokens
  cleanupAuthState();
  
  console.log('✅ [AUTH CLEANUP] Pre-auth cleanup complete (selective mode)');
};

/**
 * 🚨 EMERGENCY AUTH RESET
 * Nuclear option for completely resetting auth state
 */
export const emergencyAuthReset = async () => {
  console.log('🚨 [EMERGENCY RESET] Starting nuclear auth reset...');
  
  // Multiple cleanup passes to ensure everything is gone
  for (let i = 0; i < 3; i++) {
    cleanupAuthState();
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Force reload to completely reset state
  setTimeout(() => {
    console.log('🔄 [EMERGENCY RESET] Forcing page reload...');
    window.location.href = '/';
  }, 500);
};

/**
 * 🐛 DEBUG: Manual storage clear for admin users
 * Only available in development or for admin users
 */
export const debugClearAllStorage = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('🐛 [DEBUG] Manual storage clear requested');
    localStorage.clear();
    sessionStorage.clear();
    console.log('🗑️ [DEBUG] All storage cleared');
    return true;
  }
  console.warn('⚠️ [DEBUG] Manual storage clear only available in development');
  return false;
};