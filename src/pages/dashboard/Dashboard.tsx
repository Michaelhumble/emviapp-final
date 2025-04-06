
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Loader2 } from "lucide-react";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { UserRole } from "@/context/auth/types";
import { useToast } from "@/hooks/use-toast";

/**
 * This component redirects users to their role-specific dashboard
 * or shows the role selection modal for new users
 */
const Dashboard = () => {
  const { userRole, loading, user, isSignedIn, isNewUser, clearIsNewUser, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const { toast } = useToast();
  
  const handleRoleSelected = async (role: UserRole) => {
    try {
      // Refresh the user profile to get the updated role
      await refreshUserProfile();
      
      // Show success toast
      toast({
        title: "Role updated successfully",
        description: `Your profile has been updated as ${role}`,
        duration: 3000,
      });
      
      // Clear the new user flag
      if (isNewUser) {
        clearIsNewUser();
      }
      
      // Redirect to the appropriate dashboard
      setTimeout(() => {
        redirectBasedOnRole(role);
      }, 500);
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        title: "Error updating role",
        description: "Please try again",
        variant: "destructive",
        duration: 3000,
      });
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
      <div className="flex items-center space-x-3 mb-5 bg-white p-5 rounded-xl shadow-lg">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
        <span className="text-xl font-serif font-medium text-gray-800">Loading your dashboard...</span>
      </div>
      <p className="text-gray-600 text-sm px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
        We're redirecting you to the appropriate dashboard
      </p>
      
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
