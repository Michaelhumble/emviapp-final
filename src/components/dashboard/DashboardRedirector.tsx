
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/context/auth/types";
import { navigateToRoleDashboard } from "@/utils/navigation";
import { useAuth } from "@/context/auth";
import { normalizeRole } from "@/utils/roles";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";

interface DashboardRedirectorProps {
  setRedirectError: (error: string | null) => void;
  setLocalLoading: (loading: boolean) => void;
}

const DashboardRedirector = ({ setRedirectError, setLocalLoading }: DashboardRedirectorProps) => {
  const { user, userRole, userProfile, isSignedIn, isNewUser, clearIsNewUser } = useAuth();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);

  const checkUserRoleAndRedirect = useCallback(async () => {
    if (!isSignedIn || !user) {
      navigate("/sign-in");
      return;
    }

    try {
      // First check for role in user profile (highest priority)
      if (userProfile?.role) {
        const normalizedRole = normalizeRole(userProfile.role);
        localStorage.setItem('emviapp_user_role', normalizedRole);
        navigateToRoleDashboard(navigate, normalizedRole);
        return;
      }

      // If we have userRole from context, use it
      if (userRole) {
        navigateToRoleDashboard(navigate, userRole);
        return;
      }

      // Try to get role from auth metadata
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (!authError && authUser?.user_metadata?.role) {
        const metadataRole = authUser.user_metadata.role as UserRole;
        const normalizedRole = normalizeRole(metadataRole);
        localStorage.setItem('emviapp_user_role', normalizedRole);
        
        // Special check for managers
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('manager_for_salon_id')
          .eq('id', user.id)
          .single();
          
        if (!userError && userData && userData.manager_for_salon_id) {
          navigate('/dashboard/manager');
          return;
        }
        
        navigateToRoleDashboard(navigate, normalizedRole);
        return;
      }
      
      // Last resort: check localStorage
      const cachedRole = localStorage.getItem('emviapp_user_role');
      if (cachedRole) {
        const normalizedRole = normalizeRole(cachedRole as UserRole);
        navigateToRoleDashboard(navigate, normalizedRole);
        return;
      }
      
      // If no role found, show role selection modal
      setShowRoleModal(true);
      if (isNewUser) {
        clearIsNewUser();
      }
    } catch (error) {
      setRedirectError("Unable to determine your user role. Please try again or select a role.");
      navigate("/profile/edit");
    } finally {
      setLocalLoading(false);
    }
  }, [user, userRole, userProfile, isSignedIn, navigate, isNewUser, clearIsNewUser, setRedirectError, setLocalLoading]);

  useEffect(() => {
    checkUserRoleAndRedirect();
  }, [checkUserRoleAndRedirect]);

  return (
    <>
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
