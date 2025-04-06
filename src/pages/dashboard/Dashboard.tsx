
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { navigateToRoleDashboard } from "@/utils/navigation";
import { Loader2, AlertTriangle, LogOut } from "lucide-react";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/**
 * Dashboard component that handles redirecting users to role-specific dashboards
 * and shows role selection for new users
 */
const Dashboard = () => {
  const { userRole, loading, user, isSignedIn, isNewUser, clearIsNewUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [redirectTimeout, setRedirectTimeout] = useState<NodeJS.Timeout | null>(null);
  const [loadingTime, setLoadingTime] = useState(0);
  const [redirectError, setRedirectError] = useState<string | null>(null);
  
  // Increment loading time counter
  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setLoadingTime(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
    
    return () => {}; // Empty cleanup for when not loading
  }, [loading]);
  
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
  
  // Main redirect logic
  useEffect(() => {
    if (!loading) {
      console.log("Dashboard redirect - Auth state:", { isSignedIn, userRole, isNewUser });
      
      // Clear any existing timeout
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
      
      // If user is not signed in, redirect to sign in
      if (!isSignedIn) {
        navigate("/sign-in");
        return;
      }

      // If user is new or doesn't have a role, show role selection modal
      if (isNewUser || !userRole) {
        setShowRoleModal(true);
        if (isNewUser) {
          // Clear the new user flag once we've handled it
          clearIsNewUser();
        }
      } else {
        try {
          // Set a timeout to prevent infinite redirects
          const timeout = setTimeout(() => {
            navigateToRoleDashboard(navigate, userRole);
          }, 100);
          
          setRedirectTimeout(timeout);
        } catch (error) {
          console.error("Navigation error:", error);
          setRedirectError("Unable to navigate to your dashboard. Please try again.");
        }
      }
    }
    
    // Cleanup timeout on unmount
    return () => {
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
    };
  }, [userRole, loading, navigate, isSignedIn, user, isNewUser, clearIsNewUser, redirectTimeout]);
  
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
                navigateToRoleDashboard(navigate, userRole);
              }}
            >
              Try Again
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
        {loadingTime > 10 && (
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
