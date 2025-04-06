
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { navigateToRoleDashboard } from "@/utils/navigation";
import { Loader2, AlertTriangle } from "lucide-react";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

/**
 * This component redirects users to their role-specific dashboard
 * or shows the role selection modal for new users
 */
const Dashboard = () => {
  const { userRole, isLoading: authLoading, user, isSignedIn, isNewUser, clearIsNewUser, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  useEffect(() => {
    // Function to handle redirection logic
    const handleRedirect = async () => {
      console.log("Dashboard redirect - Auth loading:", authLoading, "Signed in:", isSignedIn, "User role:", userRole, "Is redirecting:", isRedirecting);
      
      if (isRedirecting) {
        return; // Prevent multiple redirects
      }
      
      // If still loading auth state, don't do anything yet
      if (authLoading) return;
      
      // If user is not signed in, redirect to sign in
      if (!isSignedIn) {
        navigate("/sign-in");
        return;
      }

      // Prevent additional redirects while processing
      setIsRedirecting(true);

      try {
        // If no role but user exists, try to fetch role directly
        if (user?.id && !userRole) {
          const { data: userData, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .maybeSingle();
          
          // If we found role directly, refresh and redirect
          if (!error && userData?.role) {
            console.log("Found role directly:", userData.role);
            await refreshUserProfile();
            navigateToRoleDashboard(navigate, userData.role);
            return;
          }
          
          // No role found, show selection modal
          console.log("No role found directly, showing modal");
          setShowRoleModal(true);
          if (isNewUser) clearIsNewUser();
          setIsRedirecting(false);
          return;
        }
        
        // If new user, show role selection
        if (isNewUser) {
          console.log("New user, showing role selection modal");
          setShowRoleModal(true);
          clearIsNewUser();
          setIsRedirecting(false);
          return;
        }
        
        // If we have a role, redirect appropriately
        if (userRole) {
          console.log("Redirecting based on role:", userRole);
          navigateToRoleDashboard(navigate, userRole);
        } else {
          // No role, show modal
          console.log("No user role found, showing selection modal");
          setShowRoleModal(true);
          setIsRedirecting(false);
        }
      } catch (err) {
        console.error("Error in dashboard redirect:", err);
        setError("Unable to load your dashboard. Please try again.");
        setIsRedirecting(false);
      }
    };
    
    handleRedirect();
  }, [userRole, authLoading, navigate, isSignedIn, user, isNewUser, clearIsNewUser, refreshUserProfile, isRedirecting]);
  
  // Handle manual retry
  const handleRetry = async () => {
    setError(null);
    setRetryCount(prev => prev + 1);
    setIsRedirecting(false);
    await refreshUserProfile();
  };

  // Handle emergency logout 
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Successfully logged out");
      navigate("/sign-in");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to log out. Reloading the page...");
      // Force reload as a last resort
      window.location.href = "/sign-in";
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
              onClick={handleLogout}
              className="w-full"
            >
              Log Out
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
      <p className="text-gray-500 text-sm mb-8">We're redirecting you to the appropriate dashboard</p>
      
      {/* Emergency logout button to break from loading state */}
      <Button variant="outline" onClick={handleLogout} className="mt-4">
        Log Out
      </Button>
      
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
