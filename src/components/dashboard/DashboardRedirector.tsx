
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { navigateToRoleDashboard } from "@/utils/navigation";
import { useAuth } from "@/context/auth";
import { normalizeRole } from "@/utils/roles";
import { UserRole } from "@/context/auth/types";
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
      // If we have a role from centralized auth state, use it
      if (userRole) {
        if (userRole === 'artist' || userRole === 'nail technician/artist') {
          navigate('/dashboard/artist');
          return;
        }

        // Check for salon manager status
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
      
      // If no role in auth state, check database
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
      
      // Normalize the role before using it
      const normalizedRole = normalizeRole(profile.role);
      if (normalizedRole) {
        navigateToRoleDashboard(navigate, normalizedRole);
      } else {
        setShowRoleModal(true);
      }
      
    } catch (error) {
      setRedirectError("Unable to determine your user role. Please try again or select a role.");
      navigate("/profile/edit");
    } finally {
      setLocalLoading(false);
    }
  }, [user, userRole, isSignedIn, navigate, isNewUser, clearIsNewUser, setRedirectError, setLocalLoading]);

  useEffect(() => {
    // Only run redirect logic if user is authenticated
    if (isSignedIn && user) {
      checkUserRoleAndRedirect();
    }
  }, [checkUserRoleAndRedirect, isSignedIn, user]);

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
