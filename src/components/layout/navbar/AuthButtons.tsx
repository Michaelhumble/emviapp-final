/**
 * 🔐 AUTH BUTTONS - BULLETPROOF STATE SYNC
 * 
 * CRITICAL: This component uses ONLY the centralized auth context
 * NO local state - all auth state comes from AuthProvider
 * 
 * Features:
 * - Immediate button updates when auth state changes
 * - Hydration-safe rendering
 * - Real-time sync with auth context
 * - Debug utilities for testing
 */

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

/**
 * 🎯 SHARED AUTH UI LOGIC
 * DRY principle - identical logic for mobile and desktop
 */
const getAuthUIState = (authState: any) => {
  const { isSignedIn, loading, isInitialized, user, session } = authState;
  
  return {
    showAuth: isInitialized && !loading,
    isAuthenticated: isSignedIn && !!user && !!session,
    isLoading: loading || !isInitialized,
    debugInfo: {
      isSignedIn,
      hasUser: !!user,
      hasSession: !!session,
      loading,
      isInitialized
    }
  };
};

const AuthButtons = () => {
  const location = useLocation();
  const currentPath = encodeURIComponent(location.pathname + location.search);
  const authState = useAuth();
  const { signOut } = authState;
  
  const uiState = getAuthUIState(authState);
  
  // 🐛 DEBUG UTILITY: Expose auth UI state for testing
  if (typeof window !== 'undefined') {
    (window as any).emviTestCheckAuthUI = () => ({
      ...uiState.debugInfo,
      menuType: 'desktop-auth-buttons',
      currentPath: location.pathname,
      timestamp: new Date().toISOString()
    });
  }
  
  // 🚨 HYDRATION GUARD: Prevent SSR/CSR mismatch
  if (!uiState.showAuth) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-16 h-9 bg-gray-200 animate-pulse rounded-md" />
        <div className="w-20 h-9 bg-gray-200 animate-pulse rounded-md" />
      </div>
    );
  }

  // 🔐 BULLETPROOF AUTH UI: Use computed state for consistency
  return (
    <div className="flex items-center gap-2">
      {uiState.isAuthenticated ? (
        // ✅ AUTHENTICATED STATE: Show only Sign Out button
        <Button 
          onClick={signOut}
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50"
        >
          Sign Out
        </Button>
      ) : (
        // ❌ UNAUTHENTICATED STATE: Show Sign In and Sign Up buttons
        <>
          <Link to={`/sign-in?redirect=${currentPath}`}>
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to={`/auth/signup?redirect=${currentPath}`}>
            <Button>Sign Up</Button>
          </Link>
        </>
      )}
    </div>
  );
};

// Export the shared logic for use in other components
export { getAuthUIState };

export default AuthButtons;