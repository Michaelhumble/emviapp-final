
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { navigateToRoleDashboard } from "@/utils/navigation";
import { Loader2, AlertTriangle } from "lucide-react";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/**
 * This component redirects users to their role-specific dashboard
 * or shows the role selection modal for new users
 */
const Dashboard = () => {
  const { userRole, loading, user, isSignedIn, isNewUser, clearIsNewUser, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  useEffect(() => {
    // Function to handle redirection logic
    const handleRedirect = async () => {
      console.log("Dashboard redirect - Loading:", loading, "Signed in:", isSignedIn, "User role:", userRole);
      
      // If still loading, don't do anything yet
      if (loading) return;
      
      // If user is not signed in, redirect to sign in
      if (!isSignedIn) {
        navigate("/sign-in");
        return;
      }

      try {
        // If user is new or doesn't have a role, show role selection modal
        if (isNewUser || !userRole) {
          setShowRoleModal(true);
          if (isNewUser) {
            // Clear the new user flag once we've handled it
            clearIsNewUser();
          }
        } else {
          // Redirect based on existing role
          navigateToRoleDashboard(navigate, userRole);
        }
      } catch (err) {
        console.error("Error in dashboard redirect:", err);
        setError("Unable to load your dashboard. Please try again.");
        toast.error("Dashboard redirect error. Please try again.");
      }
    };
    
    handleRedirect();
  }, [userRole, loading, navigate, isSignedIn, user, isNewUser, clearIsNewUser]);
  
  // Handle manual retry
  const handleRetry = async () => {
    setError(null);
    setRetryCount(prev => prev + 1);
    
    try {
      // Attempt to refresh user profile data
      await refreshUserProfile();
      // Then redirect based on potentially updated role
      navigateToRoleDashboard(navigate, userRole);
    } catch (err) {
      console.error("Retry error:", err);
      setError("Still having trouble. Please try logging out and back in.");
    }
  };
  
  // Show error state if we've encountered an error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex items-center text-amber-600 mb-4">
            <AlertTriangle className="h-6 w-6 mr-2" />
            <h2 className="text-lg font-medium">Dashboard Error</h2>
          </div>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3">
            <Button onClick={handleRetry} className="w-full">
              Try Again
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="w-full"
            >
              Go to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex items-center space-x-2 mb-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="text-lg">Loading your dashboard...</span>
      </div>
      <p className="text-gray-500 text-sm">We're redirecting you to the appropriate dashboard</p>
      
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
