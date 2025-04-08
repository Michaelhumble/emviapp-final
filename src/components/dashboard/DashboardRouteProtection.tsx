
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { UserRole } from "@/context/auth/types";
import { hasRoleAccess } from "@/utils/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw } from "lucide-react";

interface DashboardRouteProtectionProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  dashboardType: string;
}

/**
 * Component to protect dashboard routes from unauthorized access
 * and ensure role information is available
 */
const DashboardRouteProtection = ({ 
  allowedRoles, 
  children,
  dashboardType
}: DashboardRouteProtectionProps) => {
  const { userRole, user, loading, refreshUserProfile, validateUserRole } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();
  
  // Function to force refresh user profile
  const handleRefreshRole = async () => {
    setIsRefreshing(true);
    console.log(`[${dashboardType}] Manually refreshing user profile...`);
    
    try {
      // Check if we have validateUserRole (force validation function)
      if (validateUserRole) {
        await validateUserRole();
      } else {
        await refreshUserProfile();
      }
      toast.success("Profile refreshed successfully");
    } catch (error) {
      console.error(`[${dashboardType}] Error refreshing profile:`, error);
      toast.error("Failed to refresh profile data");
    } finally {
      setIsRefreshing(false);
    }
  };
  
  useEffect(() => {
    // If auth is still loading, wait
    if (loading) {
      console.log(`[${dashboardType}] Authentication still loading...`);
      return;
    }
    
    // If user is not authenticated, redirect to sign-in
    if (!user) {
      console.log(`[${dashboardType}] No authenticated user, redirecting to sign-in`);
      navigate("/sign-in");
      return;
    }
    
    // If role hasn't loaded yet or is null
    if (!userRole) {
      console.log(`[${dashboardType}] User role not available yet, waiting...`);
      // Don't redirect immediately, wait for role to load
      return;
    }
    
    // Check if user has access to this dashboard
    if (!hasRoleAccess(userRole, allowedRoles)) {
      console.warn(`[${dashboardType}] User with role ${userRole} attempted unauthorized access`);
      toast.error(`You don't have access to the ${dashboardType} dashboard`);
      navigate("/dashboard");
    } else {
      console.log(`[${dashboardType}] Access granted to ${dashboardType} dashboard for role: ${userRole}`);
    }
  }, [user, userRole, loading, navigate, allowedRoles, dashboardType]);
  
  // Show loading state while authentication is in progress
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-4" />
        <p className="text-gray-600">Loading your {dashboardType} dashboard...</p>
      </div>
    );
  }
  
  // Show "role not found" state with refresh option
  if (user && !userRole) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-8 bg-white rounded-xl shadow-md max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4 text-center">Role Information Unavailable</h2>
          <p className="text-gray-600 mb-6 text-center">
            We couldn't determine your user role. This might be due to a temporary issue.
          </p>
          
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
        </div>
      </div>
    );
  }
  
  // If not authorized or not logged in, return nothing (redirect happens in useEffect)
  if (!user || (userRole && !hasRoleAccess(userRole, allowedRoles))) {
    return null;
  }
  
  // User is authenticated and authorized, show dashboard content
  return <>{children}</>;
};

export default DashboardRouteProtection;
