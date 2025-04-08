
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { navigateToRoleDashboard } from "@/utils/navigation";
import { Loader2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/**
 * This component serves as a backup for the main dashboard index
 * It provides role-based redirection with validation and debugging
 */
const Dashboard = () => {
  const { user, userRole, loading, refreshUserProfile } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [redirectError, setRedirectError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Function to force refresh user profile
  const handleRefreshRole = async () => {
    if (!user) return;
    
    setIsRefreshing(true);
    console.log("[Dashboard Router] Manually refreshing user profile...");
    
    try {
      await refreshUserProfile();
      setRedirectError(null);
      toast.success("Profile refreshed successfully");
      
      // Wait a bit and try navigation again
      setTimeout(() => {
        if (userRole) {
          navigateToRoleDashboard(navigate, userRole);
        }
      }, 500);
    } catch (error) {
      console.error("[Dashboard Router] Error refreshing profile:", error);
      setRedirectError("Failed to refresh your profile. Please try again.");
    } finally {
      setIsRefreshing(false);
    }
  };
  
  useEffect(() => {
    if (loading) {
      console.log("[Dashboard Router] Auth is still loading...");
      return;
    }
    
    if (!user) {
      console.log("[Dashboard Router] No user found, redirecting to sign-in");
      navigate("/sign-in");
      return;
    }
    
    // If we have a role, redirect to the appropriate dashboard
    if (userRole) {
      console.log("[Dashboard Router] Redirecting based on role:", userRole);
      navigateToRoleDashboard(navigate, userRole);
    } else {
      console.log("[Dashboard Router] No role found");
      setRedirectError("We couldn't determine your user role. Please refresh or update your profile.");
    }
  }, [user, userRole, loading, navigate]);
  
  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-4" />
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }
  
  // Error state - no role found but user is logged in
  if (user && !userRole) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-8 bg-white rounded-xl shadow-md max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4 text-center">Finding Your Dashboard</h2>
          
          {redirectError && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg mb-6 text-red-800 text-sm">
              {redirectError}
            </div>
          )}
          
          <p className="text-gray-600 mb-6 text-center">
            We need to know your role to direct you to the right dashboard.
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={handleRefreshRole}
              className="w-full flex items-center justify-center"
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Refresh Role Information
                </>
              )}
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate("/profile/edit")}
              className="w-full"
            >
              Update Your Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Fallback - shouldn't render normally as we redirect
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-4" />
      <p className="text-gray-600">Redirecting to your dashboard...</p>
    </div>
  );
};

export default Dashboard;
