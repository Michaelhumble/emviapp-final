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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth";
import { User, LogOut, Info, Phone, Settings } from "lucide-react";

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
  const { signOut, userProfile, userRole } = authState;
  
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
        // ✅ AUTHENTICATED STATE: Show profile dropdown with About/Contact
        <div className="relative group">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarImage 
                src={userProfile?.avatar_url || undefined} 
                alt={userProfile?.full_name || userProfile?.salon_name || 'Profile'} 
              />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold">
                {(userProfile?.full_name || userProfile?.salon_name || 'U').charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-xs font-medium text-gray-900 truncate max-w-24">
                {userProfile?.full_name || userProfile?.salon_name || 'User'}
              </p>
            </div>
          </div>
          
          {/* Profile Dropdown */}
          <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <Link to="/dashboard" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
              <User className="w-4 h-4 mr-3" />
              {userRole === 'artist' ? 'Artist Dashboard' : 'Dashboard'}
            </Link>
            <hr className="border-gray-100" />
            <Link to="/about" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
              <Info className="w-4 h-4 mr-3" />
              About Us
            </Link>
            <Link to="/contact" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
              <Phone className="w-4 h-4 mr-3" />
              Contact
            </Link>
            <hr className="border-gray-100" />
            <button 
              onClick={signOut}
              className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        // ❌ UNAUTHENTICATED STATE: Show Sign In and Sign Up buttons
        <>
          <Link to={`/sign-in?redirect=${currentPath}`}>
            <Button variant="ghost">Sign In</Button>
          </Link>
          <a href="http://emviapp-final.lovable.app/auth/signup?redirect=%2F">
            <Button>Sign Up</Button>
          </a>
        </>
      )}
    </div>
  );
};

// Export the shared logic for use in other components
export { getAuthUIState };

export default AuthButtons;