
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { navigateToRoleDashboard } from "@/utils/navigation";
import { Loader2, AlertTriangle, LogOut, ArrowLeft } from "lucide-react";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/context/auth/types";

/**
 * Dashboard component that handles redirecting users to role-specific dashboards
 * and shows role selection for new users
 */
const Dashboard = () => {
  const { userRole, loading: authLoading, user, isSignedIn, isNewUser, clearIsNewUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  const [redirectError, setRedirectError] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState(true);
  
  // Handle emergency logout for stuck states
  const handleEmergencyLogout = async () => {
    try {
      await signOut();
      navigate("/sign-in");
      toast.success("You've been logged out. Please sign in again.");
    } catch (error) {
      console.error("Emergency logout failed:", error);
      // Force clear local storage as last resort
      localStorage.clear();
      window.location.href = "/sign-in";
    }
  };

  // Redirect back to home
  const handleGoBack = () => {
    navigate("/");
    toast.info("Redirected to home page");
  };
  
  // Function to check user role and redirect
  const checkUserRoleAndRedirect = useCallback(async () => {
    if (!isSignedIn || !user) {
      console.log("User not signed in, redirecting to sign-in page");
      navigate("/sign-in");
      return;
    }

    try {
      console.log("Checking user role for redirecting:", { userRole, userId: user.id });
      
      // First, try to use the role from context if available
      if (userRole) {
        console.log("Using role from context:", userRole);
        navigateToRoleDashboard(navigate, userRole);
        return;
      }
      
      // If role is not in context, fetch it directly from the database
      const { data: profile, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();
        
      if (error) {
        console.error("Error fetching user profile:", error);
        throw new Error(`Failed to fetch user role: ${error.message}`);
      }
      
      if (!profile || !profile.role) {
        console.log("No role found, showing role selection modal");
        setShowRoleModal(true);
        if (isNewUser) {
          clearIsNewUser();
        }
        return;
      }
      
      // If we have a role, redirect to the appropriate dashboard
      // Type cast the role as UserRole to satisfy TypeScript
      console.log("Redirecting to dashboard for role:", profile.role);
      navigateToRoleDashboard(navigate, profile.role as UserRole);
      
    } catch (error) {
      console.error("Error in role check and redirect:", error);
      setRedirectError("Unable to determine your user role. Please try again or select a role.");
    } finally {
      setLocalLoading(false);
    }
  }, [user, userRole, isSignedIn, navigate, isNewUser, clearIsNewUser]);
  
  // Increment loading time counter
  useEffect(() => {
    if (localLoading || authLoading) {
      const timer = setInterval(() => {
        setLoadingTime(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
    
    return () => {}; // Empty cleanup for when not loading
  }, [localLoading, authLoading]);
  
  // Set timeout for checking role
  useEffect(() => {
    if (localLoading && loadingTime > 5) {
      setLocalLoading(false);
      setRedirectError("It's taking longer than expected to load your dashboard. Please check your connection and try again.");
    }
  }, [loadingTime, localLoading]);
  
  // Main redirect logic
  useEffect(() => {
    if (!authLoading) {
      console.log("Dashboard redirect - Auth state:", { isSignedIn, userRole, isNewUser });
      checkUserRoleAndRedirect();
    }
  }, [authLoading, checkUserRoleAndRedirect, isSignedIn, userRole, isNewUser]);
  
  // Show error state
  if (redirectError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <AlertTriangle size={48} />
          </div>
          <h2 className="text-xl font-semibold text-center mb-4">Dashboard Error</h2>
          <p className="text-gray-600 mb-6 text-center">{redirectError}</p>
          <div className="flex flex-col gap-2">
            <Button 
              variant="default" 
              onClick={() => {
                setRedirectError(null);
                setLocalLoading(true);
                setLoadingTime(0);
                checkUserRoleAndRedirect();
              }}
            >
              Try Again
            </Button>
            <Button 
              variant="outline" 
              onClick={handleGoBack} 
              className="mt-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <Button 
              variant="outline" 
              onClick={handleEmergencyLogout} 
              className="mt-2"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out and Restart
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Show loading state with progress indicator
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4 mb-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="flex flex-col items-center">
          <span className="text-lg font-medium">Loading your dashboard...</span>
          <span className="text-sm text-gray-500">{loadingTime > 3 ? `(${loadingTime}s)` : ''}</span>
        </div>
      </div>
      <p className="text-gray-500 text-sm max-w-md text-center">
        We're redirecting you to the appropriate dashboard
        {loadingTime > 3 && (
          <>
            <br />
            <br />
            <span className="text-amber-600">
              This is taking longer than expected. If you continue to see this message, try 
              <Button 
                variant="link" 
                className="p-0 h-auto font-medium text-primary" 
                onClick={() => window.location.reload()}
              >
                refreshing the page
              </Button> 
              or 
              <Button 
                variant="link" 
                className="p-0 h-auto font-medium text-red-500" 
                onClick={handleEmergencyLogout}
              >
                signing out
              </Button>.
            </span>
          </>
        )}
      </p>
      
      {/* Progress indicator */}
      <div className="w-64 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full animate-pulse" 
          style={{ width: `${Math.min(loadingTime * 10, 100)}%` }}
        ></div>
      </div>
      
      {/* Role selection modal for new users */}
      {user && showRoleModal && (
        <RoleSelectionModal
          open={showRoleModal}
          onOpenChange={setShowRoleModal}
          userId={user.id}
        />
      )}
    </div>
  );
};

export default Dashboard;
