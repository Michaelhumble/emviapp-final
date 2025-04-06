
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Loader2 } from "lucide-react";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { UserRole } from "@/context/auth/types";

/**
 * This component redirects users to their role-specific dashboard
 * or shows the role selection modal for new users
 */
const Dashboard = () => {
  const { userRole, loading, user, isSignedIn, isNewUser, clearIsNewUser, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);
  
  const handleRoleSelected = async (role: UserRole) => {
    // Refresh the user profile to get the updated role
    await refreshUserProfile();
    // Clear the new user flag
    if (isNewUser) {
      clearIsNewUser();
    }
  };
  
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
        if (isNewUser && clearIsNewUser) {
          // Clear the new user flag once we've handled it
          clearIsNewUser();
        }
      } else {
        // Redirect based on existing role
        redirectBasedOnRole(userRole);
      }
    }
  }, [userRole, loading, navigate, isSignedIn, user, isNewUser, clearIsNewUser]);
  
  const redirectBasedOnRole = (role: UserRole) => {
    switch (role) {
      case 'artist':
      case 'nail technician/artist':
        navigate('/dashboard/artist');
        break;
      case 'salon':
      case 'owner':
        navigate('/dashboard/salon');
        break;
      case 'customer':
        navigate('/dashboard/customer');
        break;
      case 'supplier':
      case 'beauty supplier':
      case 'vendor':
        navigate('/dashboard/supplier');
        break;
      case 'freelancer':
        navigate('/dashboard/freelancer');
        break;
      case 'renter':
        navigate('/dashboard/artist'); // Renters see artist dashboard
        break;
      case 'other':
      default:
        navigate('/dashboard/other');
    }
  };
  
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
          onRoleSelected={handleRoleSelected}
        />
      )}
    </div>
  );
};

export default Dashboard;
