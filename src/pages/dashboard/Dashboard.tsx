
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
  const { userRole, loading: authLoading, user, isSignedIn, isNewUser, clearIsNewUser, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
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
        console.error("Error fetching role:", error);
        return null;
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
        // If user exists but role is missing, try to fetch it directly from database
        if (user?.id && !userRole) {
          const directRole = await fetchUserRoleDirectly(user.id);
          
          // If we found a role directly, refresh the profile and redirect
          if (directRole) {
            console.log("Found role directly:", directRole);
            await refreshUserProfile();
            navigateToRoleDashboard(navigate, directRole);
            return;
          }
          
          // If no role found directly, show the selection modal
          console.log("No role found, showing selection modal");
          setShowRoleModal(true);
          if (isNewUser) {
            clearIsNewUser();
          }
          setIsRedirecting(false);
          return;
        }
        
        // If user is new, show role selection modal
        if (isNewUser) {
          console.log("New user, showing role selection modal");
          setShowRoleModal(true);
          clearIsNewUser();
          setIsRedirecting(false);
          return;
        }
        
        // If we have a role, redirect to the appropriate dashboard
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
        toast.error("Dashboard redirect error. Please try again.");
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

  // Handle logout 
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Successfully logged out");
      navigate("/sign-in");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to log out. Please try again.");
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
      
      {/* Emergency logout button if stuck in loading state */}
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
