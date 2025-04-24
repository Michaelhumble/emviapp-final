
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
  const [redirectAttempts, setRedirectAttempts] = useState(0);

  const checkUserRoleAndRedirect = useCallback(async () => {
    // If redirect has been attempted too many times, show error to prevent infinite loops
    if (redirectAttempts > 3) {
      setRedirectError("Too many redirect attempts. Please try signing out and signing in again.");
      setLocalLoading(false);
      return;
    }
    
    setRedirectAttempts(prev => prev + 1);
    
    if (!isSignedIn || !user) {
      navigate("/sign-in", { replace: true });
      setLocalLoading(false);
      return;
    }

    try {
      console.log("Starting role and redirection check");
      
      // 1. First check auth metadata (most accurate source)
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (!authError && authUser) {
        // Get role from user metadata
        const metadataRole = authUser?.user_metadata?.role as UserRole | null;
        
        if (metadataRole) {
          const normalizedRole = normalizeRole(metadataRole);
          console.log("Found role in auth metadata:", normalizedRole);
          localStorage.setItem('emviapp_user_role', normalizedRole || '');
          
          // Before navigating, check if user is a manager
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('manager_for_salon_id')
            .eq('id', user.id)
            .single();
            
          if (!userError && userData && userData.manager_for_salon_id) {
            navigate('/dashboard/manager', { replace: true });
            setLocalLoading(false);
            return;
          }
          
          navigateToRoleDashboard(navigate, normalizedRole);
          setLocalLoading(false);
          return;
        } else {
          console.log("No role found in auth metadata");
        }
      } else if (authError) {
        console.error("Error fetching auth user:", authError);
      }
      
      // 2. Then try the context if available
      if (userRole) {
        console.log("Using role from context:", userRole);
        // Before navigating, check if user is a manager
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('manager_for_salon_id')
          .eq('id', user.id)
          .single();
          
        if (!userError && userData && userData.manager_for_salon_id) {
          navigate('/dashboard/manager', { replace: true });
          setLocalLoading(false);
          return;
        }
        
        navigateToRoleDashboard(navigate, userRole);
        setLocalLoading(false);
        return;
      } else {
        console.log("No role found in context");
      }
      
      // 3. Check for cached role in localStorage
      const cachedRole = localStorage.getItem('emviapp_user_role');
      if (cachedRole) {
        console.log("Using cached role from localStorage:", cachedRole);
        const normalizedRole = normalizeRole(cachedRole as UserRole);
        
        // Update auth metadata to match localStorage (fix desync)
        try {
          await supabase.auth.updateUser({
            data: { role: normalizedRole }
          });
        } catch (updateErr) {
          console.warn("Failed to update auth metadata with role:", updateErr);
        }
        
        // Before navigating, check if user is a manager
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('manager_for_salon_id')
          .eq('id', user.id)
          .single();
          
        if (!userError && userData && userData.manager_for_salon_id) {
          navigate('/dashboard/manager', { replace: true });
          setLocalLoading(false);
          return;
        }
        
        navigateToRoleDashboard(navigate, normalizedRole);
        setLocalLoading(false);
        return;
      } else {
        console.log("No cached role in localStorage");
      }
      
      // 4. If all else fails, fetch it directly from the database
      const { data: profile, error } = await supabase
        .from('users')
        .select('role, manager_for_salon_id')
        .eq('id', user.id)
        .maybeSingle();
        
      if (error) {
        console.error("Failed to fetch user role from database:", error);
        throw new Error(`Failed to fetch user role: ${error.message}`);
      }
      
      if (!profile || !profile.role) {
        console.log("No profile or role found in database, showing role selection modal");
        setShowRoleModal(true);
        if (isNewUser) {
          clearIsNewUser();
        }
        setLocalLoading(false);
        return;
      }
      
      // Check if user is a manager
      if (profile.manager_for_salon_id) {
        navigate('/dashboard/manager', { replace: true });
        setLocalLoading(false);
        return;
      }
      
      // 5. If we have a role from the database, update auth metadata
      try {
        const normalizedRole = normalizeRole(profile.role as UserRole);
        console.log("Found role in database, updating auth metadata:", normalizedRole);
        await supabase.auth.updateUser({
          data: { role: normalizedRole }
        });
      } catch (updateErr) {
        console.warn("Failed to update auth metadata with role:", updateErr);
      }
      
      // If we have a role, save it to localStorage and redirect
      const normalizedRole = normalizeRole(profile.role as UserRole);
      localStorage.setItem('emviapp_user_role', normalizedRole || '');
      navigateToRoleDashboard(navigate, normalizedRole);
      
    } catch (error) {
      console.error("Error in redirect process:", error);
      setRedirectError("Unable to determine your user role. Please try again or select a role.");
      navigate("/profile/edit", { replace: true });
    } finally {
      setLocalLoading(false);
    }
  }, [user, userRole, isSignedIn, navigate, isNewUser, clearIsNewUser, setRedirectError, setLocalLoading, redirectAttempts]);

  useEffect(() => {
    if (isSignedIn === false) {
      // User is definitely not signed in, redirect to sign-in
      navigate("/sign-in", { replace: true });
      setLocalLoading(false);
      return;
    }
    
    // Only try to check role and redirect if signed in or loading state not yet determined
    if (isSignedIn || isSignedIn === undefined) {
      checkUserRoleAndRedirect();
    }
  }, [checkUserRoleAndRedirect, isSignedIn, navigate, setLocalLoading]);

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
