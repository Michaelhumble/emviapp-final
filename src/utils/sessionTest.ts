/**
 * 🧪 SESSION PERSISTENCE TEST UTILITY
 * 
 * Quick test to verify session persistence after page refresh
 */

import { supabase } from "@/integrations/supabase/client";

export const testSessionPersistence = async () => {
  console.log('🧪 [SESSION TEST] Testing session persistence...');
  
  // Check current session
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('❌ [SESSION TEST] Session check failed:', error.message);
    return { success: false, error: error.message };
  }
  
  if (!session) {
    console.log('📭 [SESSION TEST] No session found');
    return { success: true, sessionExists: false };
  }
  
  // Check storage for session tokens
  const storageKeys = Object.keys(localStorage).filter(key => 
    key.includes('supabase') || key.includes('sb-')
  );
  
  console.log('🔍 [SESSION TEST] Session found:', {
    userId: session.user.id,
    email: session.user.email,
    expiresAt: new Date(session.expires_at! * 1000).toLocaleString(),
    storageKeys: storageKeys
  });
  
  return {
    success: true,
    sessionExists: true,
    session: {
      userId: session.user.id,
      email: session.user.email,
      expiresAt: session.expires_at
    },
    storageKeys
  };
};

export const checkSessionAfterRefresh = () => {
  // This function should be called after page refresh to verify persistence
  console.log('🔄 [SESSION TEST] Checking session after refresh...');
  return testSessionPersistence();
};