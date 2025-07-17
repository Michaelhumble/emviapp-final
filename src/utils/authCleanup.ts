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
  console.log('🧹 [AUTH CLEANUP] Starting comprehensive auth state cleanup...');
  
  // Standard EmviApp auth keys
  const standardKeys = [
    'emviapp_new_user',
    'emviapp_user_role',
    'supabase.auth.token',
    'sb-wwhqbjrhbajpabfdwnip-auth-token'
  ];
  
  let removedCount = 0;
  
  // Remove standard keys
  standardKeys.forEach(key => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      removedCount++;
      console.log('🗑️ [AUTH CLEANUP] Removed standard key:', key);
    }
  });
  
  // AGGRESSIVE: Remove ALL Supabase-related keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || 
        key.includes('sb-') || 
        key.includes('supabase-auth-token') ||
        key.includes('access-token') ||
        key.includes('refresh-token')) {
      localStorage.removeItem(key);
      removedCount++;
      console.log('🗑️ [AUTH CLEANUP] Removed localStorage key:', key);
    }
  });
  
  // AGGRESSIVE: Remove from sessionStorage
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || 
        key.includes('sb-') || 
        key.includes('supabase-auth-token') ||
        key.includes('access-token') ||
        key.includes('refresh-token')) {
      sessionStorage.removeItem(key);
      removedCount++;
      console.log('🗑️ [AUTH CLEANUP] Removed sessionStorage key:', key);
    }
  });
  
  // FUTURE-PROOF: Clear potential cookies (if any)
  try {
    document.cookie.split(";").forEach((c) => {
      const eqPos = c.indexOf("=");
      const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
      if (name.includes('supabase') || name.includes('sb-') || name.includes('auth')) {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        console.log('🗑️ [AUTH CLEANUP] Cleared cookie:', name);
      }
    });
  } catch (e) {
    console.warn('⚠️ [AUTH CLEANUP] Cookie cleanup failed:', e);
  }
  
  console.log(`✅ [AUTH CLEANUP] Complete. Removed ${removedCount} storage items`);
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
  
  // Detect and log any corrupted tokens
  const issues = detectCorruptedTokens();
  if (issues.length > 0) {
    console.warn('⚠️ [AUTH CLEANUP] Detected corrupted tokens:', issues);
  }
  
  // Perform aggressive cleanup
  cleanupAuthState();
  
  // Try global sign out to clear server-side sessions
  try {
    await supabase.auth.signOut({ scope: 'global' });
    console.log('✅ [AUTH CLEANUP] Global sign out completed');
  } catch (error) {
    console.warn('⚠️ [AUTH CLEANUP] Global sign out failed:', error.message);
    // Continue - this is not critical
  }
  
  // Wait for cleanup to propagate
  await new Promise(resolve => setTimeout(resolve, 150));
  console.log('✅ [AUTH CLEANUP] Pre-auth cleanup complete');
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