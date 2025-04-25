
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/context/auth/types";
import { navigateToRoleDashboard } from "@/utils/navigation";
import { useAuth } from "@/context/auth";
import { normalizeRole } from "@/utils/roles";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardRedirectorProps {
  setRedirectError: (error: string | null) => void;
  setLocalLoading: (loading: boolean) => void;
}

const DashboardRedirector = ({ setRedirectError, setLocalLoading }: DashboardRedirectorProps) => {
  const { user, userRole, isSignedIn, isNewUser, clearIsNewUser } = useAuth();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [loadTimeout, setLoadTimeout] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Set loading timeout to prevent infinite loops
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (retryCount > 0) {
        setLoadTimeout(true);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeoutId);
  }, [retryCount]);

  const checkUserRoleAndRedirect = useCallback(async () => {
    if (!isSignedIn || !user) {
      navigate("/sign-in");
      return;
    }

    try {
      setRetryCount(prev => prev + 1);
      
      // 1. First check auth metadata (most accurate source)
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (!authError) {
        // Get role from user metadata
        const metadataRole = authUser?.user_metadata?.role as UserRole | null;
        
        if (metadataRole) {
          const normalizedRole = normalizeRole(metadataRole);
          localStorage.setItem('emviapp_user_role', normalizedRole || '');
          
          // Before navigating, check if user is a manager
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('manager_for_salon_id')
            .eq('id', user.id)
            .maybeSingle();
            
          if (!userError && userData && userData.manager_for_salon_id) {
            navigate('/dashboard/manager');
            return;
          }
          
          navigateToRoleDashboard(navigate, normalizedRole);
          return;
        }
      }
      
      // 2. Then try the context if available
      if (userRole) {
        // Before navigating, check if user is a manager
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('manager_for_salon_id')
          .eq('id', user.id)
          .maybeSingle();
          
        if (!userError && userData && userData.manager_for_salon_id) {
          navigate('/dashboard/manager');
          return;
        }
        
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
          console.warn("Failed to update auth metadata with cached role");
        }
        
        // Before navigating, check if user is a manager
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('manager_for_salon_id')
          .eq('id', user.id)
          .maybeSingle();
          
        if (!userError && userData && userData.manager_for_salon_id) {
          navigate('/dashboard/manager');
          return;
        }
        
        navigateToRoleDashboard(navigate, normalizedRole);
        return;
      }
      
      // 4. If all else fails, fetch it directly from the database
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
      
      // Check if user is a manager
      if (profile.manager_for_salon_id) {
        navigate('/dashboard/manager');
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
        console.warn("Failed to update auth metadata with database role");
      }
      
      // If we have a role, save it to localStorage and redirect
      const normalizedRole = normalizeRole(profile.role as UserRole);
      localStorage.setItem('emviapp_user_role', normalizedRole || '');
      navigateToRoleDashboard(navigate, normalizedRole);
      
    } catch (error) {
      setRedirectError("Unable to determine your user role. Please try again or select a role.");
      console.error("Dashboard redirection error:", error);
    } finally {
      setLocalLoading(false);
    }
  }, [user, userRole, isSignedIn, navigate, isNewUser, clearIsNewUser, setRedirectError, setLocalLoading]);

  useEffect(() => {
    if (!loadTimeout) {
      checkUserRoleAndRedirect();
    }
  }, [checkUserRoleAndRedirect, loadTimeout]);

  if (loadTimeout) {
    return (
      <div className="container mx-auto p-6 text-center">
        <AlertTriangle size={40} className="mx-auto text-amber-500 mb-4" />
        <h2 className="text-xl font-semibold mb-4">⚠️ Unable to load your dashboard</h2>
        <p className="mb-6">We're having trouble determining your user role. Please try again.</p>
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => {
              setLoadTimeout(false);
              setRetryCount(0);
              checkUserRoleAndRedirect();
            }}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/profile/edit')}
          >
            Update Profile
          </Button>
        </div>
      </div>
    );
  }

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
