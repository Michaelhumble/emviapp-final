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
  const { userRole, loading, user, isSignedIn, isNewUser, clearIsNewUser, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isFetchingRole, setIsFetchingRole] = useState(false);
  
  // Direct role fetch function to avoid potential context issues
  const fetchUserRoleDirectly = async (userId: string) => {
    try {
      setIsFetchingRole(true);
      
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        throw error;
      }
      
      return data?.role || null;
    } catch (err) {
      console.error("Error in direct role fetch:", err);
      return null;
    } finally {
      setIsFetchingRole(false);
    }
  };
  
  useEffect(() => {
    // Function to handle redirection logic
    const handleRedirect = async () => {
      console.log("Dashboard redirect - Loading:", loading, "Signed in:", isSignedIn, "User role:", userRole);
      
      // If still loading auth state, don't do anything yet
      if (loading) return;
      
      // If user is not signed in, redirect to sign in
      if (!isSignedIn) {
        navigate("/sign-in");
        return;
      }

      try {
        // If user exists but role is missing, try to fetch it directly from database
        if (user?.id && !userRole) {
          const directRole = await fetchUserRoleDirectly(user.id);
          
          // If we found a role directly, refresh the profile and redirect
          if (directRole) {
            await refreshUserProfile();
            navigateToRoleDashboard(navigate, directRole);
            return;
          }
          
          // If no role found directly, show the selection modal
          setShowRoleModal(true);
          if (isNewUser) {
            clearIsNewUser();
          }
          return;
        }
        
        // If user is new, show role selection modal
        if (isNewUser) {
          setShowRoleModal(true);
          clearIsNewUser();
          return;
        }
        
        // If we have a role, redirect to the appropriate dashboard
        if (userRole) {
          navigateToRoleDashboard(navigate, userRole);
          
          // Safety timeout - if redirect doesn't happen in 2 seconds, log an error
          setTimeout(() => {
            console.log("Safety timeout triggered. Current role:", userRole);
          }, 2000);
        } else {
          // No role, show modal
          setShowRoleModal(true);
        }
      } catch (err) {
        console.error("Error in dashboard redirect:", err);
        setError("Unable to load your dashboard. Please try again.");
        toast.error("Dashboard redirect error. Please try again.");
      }
    };
    
    handleRedirect();
  }, [userRole, loading, navigate, isSignedIn, user, isNewUser, clearIsNewUser, refreshUserProfile]);
  
  // Handle manual retry
  const handleRetry = async () => {
    setError(null);
    setRetryCount(prev => prev + 1);
    
    try {
      // If we have a user but no role, try direct fetch
      if (user?.id) {
        const directRole = await fetchUserRoleDirectly(user.id);
        
        if (directRole) {
          // Refresh profile to update context
          await refreshUserProfile();
          navigateToRoleDashboard(navigate, directRole);
          return;
        }
      }
      
      // Otherwise refresh user profile and try again
      await refreshUserProfile();
      
      // Check if we now have a role after refresh
      if (userRole) {
        navigateToRoleDashboard(navigate, userRole);
      } else {
        // Still no role, show modal
        setShowRoleModal(true);
      }
    } catch (err) {
      console.error("Retry error:", err);
      setError("Still having trouble. Please try selecting your role or logging out and back in.");
      setShowRoleModal(true);
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
