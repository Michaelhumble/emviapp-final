
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
        
        // COMPLETELY REWRITTEN: Direct routing based on normalized role with no fallbacks
        if (normalizedRole === 'artist') {
          console.log("[DashboardRedirector] DIRECT ROUTING: Artist to artist dashboard");
          navigate('/dashboard/artist');
          return;
        } else if (normalizedRole === 'salon') {
          console.log("[DashboardRedirector] DIRECT ROUTING: Salon to salon dashboard");
          navigate('/dashboard/salon');
          return;
        } else if (normalizedRole === 'customer') {
          console.log("[DashboardRedirector] DIRECT ROUTING: Customer to customer dashboard");
          navigate('/dashboard/customer');
          return;
        } else if (normalizedRole === 'supplier') {
          console.log("[DashboardRedirector] DIRECT ROUTING: Supplier to supplier dashboard");
          navigate('/dashboard/supplier');
          return;
        } else if (normalizedRole === 'freelancer') {
          console.log("[DashboardRedirector] DIRECT ROUTING: Freelancer to freelancer dashboard");
          navigate('/dashboard/freelancer');
          return;
        } else {
          console.log("[DashboardRedirector] DIRECT ROUTING: Other/unknown to profile edit");
          // For unknown roles, go to profile edit
          navigate('/profile/edit');
          toast.error("Your user role needs to be configured. Please update your profile.");
          return;
        }
      }
      
      // If role is not in context, fetch it directly from the database
      console.log("[DashboardRedirector] No role in context, fetching from database");
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
      
      // COMPLETELY REWRITTEN: Direct routing based on normalized database role
      if (normalizedDbRole === 'artist') {
        console.log("[DashboardRedirector] DIRECT ROUTING: Artist to artist dashboard");
        navigate('/dashboard/artist');
        // Refresh user profile to ensure we have the role in context for next time
        await refreshUserProfile();
        return;
      } else if (normalizedDbRole === 'salon') {
        console.log("[DashboardRedirector] DIRECT ROUTING: Salon to salon dashboard");
        navigate('/dashboard/salon');
        await refreshUserProfile();
        return;
      } else if (normalizedDbRole === 'customer') {
        console.log("[DashboardRedirector] DIRECT ROUTING: Customer to customer dashboard");
        navigate('/dashboard/customer');
        await refreshUserProfile();
        return;
      } else if (normalizedDbRole === 'supplier') {
        console.log("[DashboardRedirector] DIRECT ROUTING: Supplier to supplier dashboard");
        navigate('/dashboard/supplier');
        await refreshUserProfile();
        return;
      } else if (normalizedDbRole === 'freelancer') {
        console.log("[DashboardRedirector] DIRECT ROUTING: Freelancer to freelancer dashboard");
        navigate('/dashboard/freelancer');
        await refreshUserProfile();
        return;
      } else {
        console.log("[DashboardRedirector] DIRECT ROUTING: Other/unknown to profile edit");
        // For unknown roles, go to profile edit
        navigate('/profile/edit');
        toast.error("Your user role needs to be configured. Please update your profile.");
        await refreshUserProfile();
        return;
      }
      
    } catch (error) {
      console.error("[DashboardRedirector] Error in role check and redirect:", error);
      setRedirectError("Unable to determine your user role. Please try again or select a role.");
      navigate("/profile/edit");
    } finally {
      setLocalLoading(false);
    }
  }, [user, userRole, isSignedIn, navigate, isNewUser, clearIsNewUser, setRedirectError, setLocalLoading, refreshUserProfile]);

  useEffect(() => {
    console.log("[DashboardRedirector] Component mounted or dependencies changed");
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
