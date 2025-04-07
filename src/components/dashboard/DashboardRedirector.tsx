
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/context/auth/types";
import { navigateToRoleDashboard } from "@/utils/navigation";
import { useAuth } from "@/context/auth";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";

interface DashboardRedirectorProps {
  setRedirectError: (error: string | null) => void;
  setLocalLoading: (loading: boolean) => void;
}

const DashboardRedirector = ({ setRedirectError, setLocalLoading }: DashboardRedirectorProps) => {
  const { user, userRole, isSignedIn, isNewUser, clearIsNewUser } = useAuth();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);

  const checkUserRoleAndRedirect = useCallback(async () => {
    if (!isSignedIn || !user) {
      console.log("User not signed in, redirecting to sign-in page");
      navigate("/sign-in");
      return;
    }

    try {
      console.log("Checking user role for redirecting:", { userRole, userId: user.id });
      
      // First, try to use the role from context if available
      if (userRole) {
        console.log("Using role from context:", userRole);
        
        // Check if role is 'owner', redirect to salon dashboard
        if (userRole === 'owner') {
          console.log("Owner role detected, redirecting to salon dashboard");
          navigate('/dashboard/salon');
          return;
        }
        
        navigateToRoleDashboard(navigate, userRole);
        return;
      }
      
      // If role is not in context, fetch it directly from the database
      const { data: profile, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();
        
      if (error) {
        console.error("Error fetching user profile:", error);
        throw new Error(`Failed to fetch user role: ${error.message}`);
      }
      
      if (!profile || !profile.role) {
        console.log("No role found, showing role selection modal");
        setShowRoleModal(true);
        if (isNewUser) {
          clearIsNewUser();
        }
        return;
      }
      
      // If we have a role, redirect to the appropriate dashboard
      console.log("Redirecting to dashboard for role:", profile.role);
      
      // Check if role is 'owner', redirect to salon dashboard
      if (profile.role === 'owner') {
        console.log("Owner role detected, redirecting to salon dashboard");
        navigate('/dashboard/salon');
        return;
      }
      
      navigateToRoleDashboard(navigate, profile.role as UserRole);
      
    } catch (error) {
      console.error("Error in role check and redirect:", error);
      setRedirectError("Unable to determine your user role. Please try again or select a role.");
    } finally {
      setLocalLoading(false);
    }
  }, [user, userRole, isSignedIn, navigate, isNewUser, clearIsNewUser, setRedirectError, setLocalLoading]);

  useEffect(() => {
    checkUserRoleAndRedirect();
  }, [checkUserRoleAndRedirect]);

  return (
    <>
      {/* Role selection modal for new users */}
      {user && showRoleModal && (
        <RoleSelectionModal
          open={showRoleModal}
          onOpenChange={setShowRoleModal}
          userId={user.id}
        />
      )}
    </>
  );
};

export default DashboardRedirector;
