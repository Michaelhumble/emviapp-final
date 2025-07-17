/**
 * 🧹 COMPREHENSIVE AUTH STATE CLEANUP UTILITY
 * 
 * This utility handles complete cleanup of authentication state
 * to prevent auth limbo states and token conflicts.
 */

export const cleanupAuthState = () => {
  console.log('🧹 Starting comprehensive auth state cleanup...');
  
  // Remove standard auth tokens
  const standardKeys = [
    'supabase.auth.token',
    'sb-wwhqbjrhbajpabfdwnip-auth-token',
    'emviapp_new_user',
    'emviapp_user_role'
  ];
  
  standardKeys.forEach(key => {
    localStorage.removeItem(key);
    console.log('🗑️ Removed standard key:', key);
  });
  
  // Remove ALL Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
      console.log('🗑️ Removed localStorage key:', key);
    }
  });
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
      console.log('🗑️ Removed sessionStorage key:', key);
    }
  });
  
  console.log('✅ Auth state cleanup complete');
};

/**
 * Cleanup before authentication operations
 */
export const cleanupBeforeAuth = async () => {
  cleanupAuthState();
  // Wait for cleanup to complete
  await new Promise(resolve => setTimeout(resolve, 100));
};