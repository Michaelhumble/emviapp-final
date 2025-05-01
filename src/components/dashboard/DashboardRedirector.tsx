
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
  const { user, userRole, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);

  const checkUserRoleAndRedirect = useCallback(async () => {
    if (!isSignedIn || !user) {
      navigate("/sign-in");
      return;
    }

    try {
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (!authError) {
        const metadataRole = authUser?.user_metadata?.role as UserRole | null;
        
        if (metadataRole) {
          const normalizedRole = normalizeRole(metadataRole);
          localStorage.setItem('emviapp_user_role', normalizedRole || '');
          
          if (normalizedRole === 'artist' || normalizedRole === 'nail technician/artist') {
            navigate('/dashboard/artist');
            return;
          }
          
          navigateToRoleDashboard(navigate, normalizedRole);
          return;
        }
      }
      
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
      
      const cachedRole = localStorage.getItem('emviapp_user_role');
      if (cachedRole) {
        const normalizedRole = normalizeRole(cachedRole as UserRole);
        
        try {
          await supabase.auth.updateUser({
            data: { role: normalizedRole }
          });
        } catch (updateErr) {
          // Silent error - continue anyway
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
        
        navigateToRoleDashboard(navigate, normalizedRole);
        return;
      }
      
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
        return;
      }
      
      if (profile.manager_for_salon_id) {
        navigate('/dashboard/manager');
        return;
      }
      
      try {
        const normalizedRole = normalizeRole(profile.role as UserRole);
        await supabase.auth.updateUser({
          data: { role: normalizedRole }
        });
      } catch (updateErr) {
        // Silent error - continue anyway
      }
      
      const normalizedRole = normalizeRole(profile.role as UserRole);
      localStorage.setItem('emviapp_user_role', normalizedRole || '');
      navigateToRoleDashboard(navigate, normalizedRole);
      
    } catch (error) {
      setRedirectError("Unable to determine your user role. Please try again or select a role.");
      navigate("/profile/edit");
    } finally {
      setLocalLoading(false);
    }
  }, [user, userRole, isSignedIn, navigate, setRedirectError, setLocalLoading]);

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
