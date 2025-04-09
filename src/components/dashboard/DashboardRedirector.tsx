
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
      
      // 1. First check auth metadata (most accurate source)
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error("[DashboardRedirector] Error fetching auth user:", authError);
      } else {
        // Get role from user metadata
        const metadataRole = authUser?.user_metadata?.role as UserRole | null;
        console.log("[DashboardRedirector] Role from auth metadata:", metadataRole);
        
        if (metadataRole) {
          console.log("[DashboardRedirector] Using role from auth metadata:", metadataRole);
          localStorage.setItem('emviapp_user_role', metadataRole);
          navigateToRoleDashboard(navigate, metadataRole);
          return;
        }
      }
      
      // 2. Then try the context if available
      if (userRole) {
        console.log("[DashboardRedirector] Using role from context:", userRole);
        navigateToRoleDashboard(navigate, userRole);
        return;
      }
      
      // 3. Check for cached role in localStorage
      const cachedRole = localStorage.getItem('emviapp_user_role');
      if (cachedRole) {
        console.log("[DashboardRedirector] Using cached role from localStorage:", cachedRole);
        
        // Update auth metadata to match localStorage (fix desync)
        try {
          await supabase.auth.updateUser({
            data: { role: cachedRole }
          });
          console.log("[DashboardRedirector] Updated auth metadata with localStorage role");
        } catch (updateErr) {
          console.error("[DashboardRedirector] Error updating auth metadata:", updateErr);
        }
        
        navigateToRoleDashboard(navigate, cachedRole as UserRole);
        return;
      }
      
      // 4. If all else fails, fetch it directly from the database
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
      
      // 5. If we have a role from the database, update auth metadata
      try {
        await supabase.auth.updateUser({
          data: { role: profile.role }
        });
        console.log("[DashboardRedirector] Updated auth metadata with database role");
      } catch (updateErr) {
        console.error("[DashboardRedirector] Error updating auth metadata:", updateErr);
      }
      
      // If we have a role, save it to localStorage and redirect
      localStorage.setItem('emviapp_user_role', profile.role);
      console.log("[DashboardRedirector] Redirecting with role from database:", profile.role);
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
