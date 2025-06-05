
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

/**
 * REFACTOR: Simplified to use ONLY auth metadata as source of truth
 * Removed localStorage fallbacks and complex role detection strategies
 */
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
      // REFACTOR: Single source of truth - auth metadata
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (!authError && authUser?.user_metadata?.role) {
        const metadataRole = authUser.user_metadata.role as UserRole | null;
        const normalizedRole = normalizeRole(metadataRole);
        
        console.log("REFACTOR: Using role from auth metadata (single source):", normalizedRole);
        
        if (normalizedRole === 'artist' || normalizedRole === 'nail technician/artist') {
          navigate('/dashboard/artist');
          return;
        }
        
        navigateToRoleDashboard(navigate, normalizedRole);
        return;
      }
      
      // If role exists in context (from auth metadata), use it
      if (userRole) {
        if (userRole === 'artist' || userRole === 'nail technician/artist') {
          navigate('/dashboard/artist');
          return;
        }

        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('manager_for_salon_id')
          .eq('id', user.id)
          .single();
          
        if (!userError && userData && userData.manager_for_salon_id) {
          navigate('/dashboard/manager');
          return;
        }
        
        navigateToRoleDashboard(navigate, userRole);
        return;
      }
      
      // REFACTOR: Removed localStorage fallback - check database only as last resort
      const { data: profile, error } = await supabase
        .from('users')
        .select('role, manager_for_salon_id')
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
      
      if (profile.manager_for_salon_id) {
        navigate('/dashboard/manager');
        return;
      }
      
      // Sync database role to auth metadata for consistency
      try {
        const normalizedRole = normalizeRole(profile.role as UserRole);
        await supabase.auth.updateUser({
          data: { role: normalizedRole }
        });
        console.log("REFACTOR: Synced database role to auth metadata:", normalizedRole);
      } catch (updateErr) {
        console.warn("Failed to sync role to auth metadata:", updateErr);
      }
      
      const normalizedRole = normalizeRole(profile.role as UserRole);
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
