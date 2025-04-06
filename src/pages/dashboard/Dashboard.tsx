
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { navigateToRoleDashboard } from "@/utils/navigation";
import { Loader2 } from "lucide-react";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";

/**
 * This component redirects users to their role-specific dashboard
 * or shows the role selection modal for new users
 */
const Dashboard = () => {
  const { userRole, loading, user, isSignedIn, isNewUser, clearIsNewUser } = useAuth();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);
  
  useEffect(() => {
    if (!loading) {
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
        // Redirect based on existing role
        navigateToRoleDashboard(navigate, userRole);
      }
    }
  }, [userRole, loading, navigate, isSignedIn, user, isNewUser, clearIsNewUser]);
  
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
