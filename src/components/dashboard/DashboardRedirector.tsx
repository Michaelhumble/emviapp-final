
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/context/auth/types";
import { navigateToRoleDashboard, normalizeUserRole } from "@/utils/navigation";
import { useAuth } from "@/context/auth";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";

interface DashboardRedirectorProps {
  setRedirectError: (error: string | null) => void;
  setLocalLoading: (loading: boolean) => void;
}

const DashboardRedirector = ({ setRedirectError, setLocalLoading }: DashboardRedirectorProps) => {
  const { user, userRole, isSignedIn, isNewUser, clearIsNewUser, refreshUserProfile } = useAuth();
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
        
        // Normalize the role to ensure consistent routing
        const normalizedRole = normalizeUserRole(userRole);
        console.log("[DashboardRedirector] Normalized role:", normalizedRole);
        
        // FIXED: Direct routing based on normalized role
        if (normalizedRole === 'artist') {
          console.log("[DashboardRedirector] Routing artist to artist dashboard");
          navigate('/dashboard/artist');
          return;
        } else if (normalizedRole === 'salon') {
          console.log("[DashboardRedirector] Routing salon to salon dashboard");
          navigate('/dashboard/salon');
          return;
        } else if (normalizedRole === 'customer') {
          console.log("[DashboardRedirector] Routing customer to customer dashboard");
          navigate('/dashboard/customer');
          return;
        }
        
        // For other roles, use the standard navigation
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
      
      // If we have a role, redirect to the appropriate dashboard
      console.log("[DashboardRedirector] Database role:", profile.role);
      
      // Normalize the role from database
      const normalizedDbRole = normalizeUserRole(profile.role);
      console.log("[DashboardRedirector] Normalized database role:", normalizedDbRole);
      
      // FIXED: Direct routing based on normalized database role
      if (normalizedDbRole === 'artist') {
        console.log("[DashboardRedirector] Routing artist to artist dashboard");
        navigate('/dashboard/artist');
        
        // Refresh user profile to ensure we have the role in context for next time
        await refreshUserProfile();
        return;
      } else if (normalizedDbRole === 'salon') {
        console.log("[DashboardRedirector] Routing salon to salon dashboard");
        navigate('/dashboard/salon');
        await refreshUserProfile();
        return;
      } else if (normalizedDbRole === 'customer') {
        console.log("[DashboardRedirector] Routing customer to customer dashboard");
        navigate('/dashboard/customer');
        await refreshUserProfile();
        return;
      }
      
      // For other roles, use the standard navigation
      navigateToRoleDashboard(navigate, profile.role as UserRole);
      
    } catch (error) {
      console.error("[DashboardRedirector] Error in role check and redirect:", error);
      setRedirectError("Unable to determine your user role. Please try again or select a role.");
      navigate("/profile/edit");
    } finally {
      setLocalLoading(false);
    }
  }, [user, userRole, isSignedIn, navigate, isNewUser, clearIsNewUser, setRedirectError, setLocalLoading, refreshUserProfile]);

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
