
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import DashboardLoading from "./DashboardLoading";
import DashboardError from "./DashboardError";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";

/**
 * This component handles the redirection logic for users
 * based on their role and authentication status
 */
const DashboardRedirect = () => {
  const { user, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const redirectToDashboard = async () => {
      try {
        // Check if user is signed in
        if (!isSignedIn) {
          navigate("/sign-in");
          return;
        }
        
        if (!user?.id) {
          setError("Unable to retrieve user information. Please sign in again.");
          return;
        }
        
        // Fetch user role from the users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();
        
        if (userError) {
          console.error("Error fetching user role:", userError);
          setError("Error loading your profile. Please try again.");
          return;
        }
        
        // Extract role from user data
        const userRole = userData?.role;
        
        // Redirect based on role
        if (!userRole) {
          // No role found, show role selection modal
          setShowRoleModal(true);
          setIsLoading(false);
          toast.info("Please complete your profile to continue.");
          return;
        }
        
        // Map role to appropriate dashboard
        const normalizedRole = userRole.toLowerCase();
        
        if (normalizedRole.includes('artist') || normalizedRole === 'nail technician/artist' || normalizedRole === 'renter') {
          navigate("/dashboard/artist");
        } else if (normalizedRole === 'salon' || normalizedRole === 'owner') {
          navigate("/dashboard/salon");
        } else if (normalizedRole === 'customer') {
          navigate("/dashboard/customer");
        } else if (normalizedRole === 'freelancer') {
          navigate("/dashboard/freelancer");
        } else if (normalizedRole === 'supplier' || normalizedRole === 'vendor' || normalizedRole === 'beauty supplier') {
          navigate("/dashboard/supplier");
        } else if (normalizedRole === 'other') {
          navigate("/dashboard/other");
        } else {
          // Unknown role, redirect to select role
          setShowRoleModal(true);
          toast.info("Please select a role to continue.");
        }
      } catch (err) {
        console.error("Dashboard redirect error:", err);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    redirectToDashboard();
  }, [user, isSignedIn, navigate]);
  
  // Handle manual retry
  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    window.location.reload();
  };

  // Handle emergency logout 
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/sign-in");
      toast.success("Successfully signed out");
    } catch (err) {
      console.error("Logout error:", err);
      // Force reload as a last resort
      window.location.href = "/sign-in";
    }
  };
  
  // Show error state if we've encountered an error
  if (error) {
    return <DashboardError error={error} onRetry={handleRetry} onLogout={handleLogout} />;
  }
  
  return (
    <>
      <DashboardLoading onLogout={handleLogout} />
      
      {/* Role selection modal for users without role */}
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

export default DashboardRedirect;
