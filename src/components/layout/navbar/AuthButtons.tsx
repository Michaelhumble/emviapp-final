/**
 * 🔐 AUTH BUTTONS - IMMEDIATE STATE PROPAGATION
 * 
 * CRITICAL: This component uses ONLY the centralized auth context
 * NO local state - all auth state comes from AuthProvider
 * 
 * Features:
 * - Immediate button updates when auth state changes
 * - Loading state prevents button flickering
 * - Real-time sync with auth context
 */

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

const AuthButtons = () => {
  const location = useLocation();
  const currentPath = encodeURIComponent(location.pathname + location.search);
  const { isSignedIn, signOut, loading } = useAuth();
  
  // 🚨 CRITICAL: Show loading skeleton during auth transitions
  // This prevents flickering between Sign In/Sign Out buttons
  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-16 h-9 bg-gray-200 animate-pulse rounded-md" />
        <div className="w-20 h-9 bg-gray-200 animate-pulse rounded-md" />
      </div>
    );
  }

  // 🔐 SINGLE SOURCE OF TRUTH: Use ONLY centralized isSignedIn
  // This ensures immediate button updates when auth state changes
  return (
    <div className="flex items-center gap-2">
      {isSignedIn ? (
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

export default AuthButtons;