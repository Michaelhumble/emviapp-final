
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
      console.log("[DashboardRedirector] User not signed in, redirecting to sign-in page");
      navigate("/sign-in");
      return;
    }

    try {
      console.log("[DashboardRedirector] Checking role for user:", { userRole, userId: user.id });
      
      // First, try to use the role from context if available
      if (userRole) {
        console.log("[DashboardRedirector] Using role from context:", userRole);
        navigateToRoleDashboard(navigate, userRole);
        return;
      }
      
      // Check for cached role in localStorage
      const cachedRole = localStorage.getItem('emviapp_user_role');
      if (cachedRole) {
        console.log("[DashboardRedirector] Using cached role from localStorage:", cachedRole);
        navigateToRoleDashboard(navigate, cachedRole as UserRole);
        return;
      }
      
      // If role is not in context or localStorage, fetch it directly from the database
      const { data: profile, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();
        
      if (error) {
        console.error("[DashboardRedirector] Error fetching user profile:", error);
        throw new Error(`Failed to fetch user role: ${error.message}`);
      }
      
      if (!profile || !profile.role) {
        console.log("[DashboardRedirector] No role found, showing role selection modal");
        setShowRoleModal(true);
        if (isNewUser) {
          clearIsNewUser();
        }
        return;
      }
      
      // If we have a role, save it to localStorage and redirect
      localStorage.setItem('emviapp_user_role', profile.role);
      console.log("[DashboardRedirector] Redirecting with role:", profile.role);
      navigateToRoleDashboard(navigate, profile.role as UserRole);
      
    } catch (error) {
      console.error("[DashboardRedirector] Error in role check and redirect:", error);
      setRedirectError("Unable to determine your user role. Please try again or select a role.");
      navigate("/profile/edit");
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
