
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
  const { user, userRole, isSignedIn, isNewUser, clearIsNewUser } = useAuth();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);

  const checkUserRoleAndRedirect = useCallback(async () => {
    if (!isSignedIn || !user) {
      navigate("/sign-in");
      return;
    }

    try {
      // 1. First check auth metadata (most accurate source)
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (!authError) {
        // Get role from user metadata
        const metadataRole = authUser?.user_metadata?.role as UserRole | null;
        
        if (metadataRole) {
          const normalizedRole = normalizeRole(metadataRole);
          localStorage.setItem('emviapp_user_role', normalizedRole || '');
          navigateToRoleDashboard(navigate, normalizedRole);
          return;
        }
      }
      
      // 2. Then try the context if available
      if (userRole) {
        navigateToRoleDashboard(navigate, userRole);
        return;
      }
      
      // 3. Check for cached role in localStorage
      const cachedRole = localStorage.getItem('emviapp_user_role');
      if (cachedRole) {
        const normalizedRole = normalizeRole(cachedRole as UserRole);
        
        // Update auth metadata to match localStorage (fix desync)
        try {
          await supabase.auth.updateUser({
            data: { role: normalizedRole }
          });
        } catch (updateErr) {
          // Silent error - continue anyway
        }
        
        navigateToRoleDashboard(navigate, normalizedRole);
        return;
      }
      
      // 4. If all else fails, fetch it directly from the database
      const { data: profile, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();
        
      if (error) {
        throw new Error(`Failed to fetch user role: ${error.message}`);
      }
      
      if (!profile || !profile.role) {
        setShowRoleModal(true);
        if (isNewUser) {
          clearIsNewUser();
        }
        return;
      }
      
      // 5. If we have a role from the database, update auth metadata
      try {
        const normalizedRole = normalizeRole(profile.role as UserRole);
        await supabase.auth.updateUser({
          data: { role: normalizedRole }
        });
      } catch (updateErr) {
        // Silent error - continue anyway
      }
      
      // If we have a role, save it to localStorage and redirect
      const normalizedRole = normalizeRole(profile.role as UserRole);
      localStorage.setItem('emviapp_user_role', normalizedRole || '');
      navigateToRoleDashboard(navigate, normalizedRole);
      
    } catch (error) {
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
