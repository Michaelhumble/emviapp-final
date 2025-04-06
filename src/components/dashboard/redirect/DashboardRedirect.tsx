
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
        // Step 1: Check if user is signed in
        if (!isSignedIn || !user) {
          console.log("User not signed in, redirecting to sign-in page");
          navigate("/sign-in");
          return;
        }
        
        // Step 2: Query user profile to get role
        console.log("Fetching user profile for ID:", user.id);
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, email, role')
          .eq('id', user.id)
          .maybeSingle();
        
        if (userError) {
          console.error("Error fetching user profile:", userError);
          setError("Error loading your profile. Please try again.");
          return;
        }
        
        // Step 3: Handle missing role
        if (!userData || !userData.role) {
          console.log("No role found, showing role selection modal");
          setShowRoleModal(true);
          setIsLoading(false);
          toast.info("Please complete your profile to continue.");
          return;
        }
        
        // Step 4: Redirect based on role
        console.log("User role found:", userData.role);
        const role = userData.role.toLowerCase();
        
        if (role.includes('artist') || role === 'nail technician/artist' || role === 'renter') {
          navigate("/dashboard/artist");
        } else if (role === 'salon' || role === 'owner') {
          navigate("/dashboard/salon");
        } else if (role === 'customer') {
          navigate("/dashboard/customer");
        } else if (role === 'freelancer') {
          navigate("/dashboard/freelancer");
        } else if (role === 'supplier' || role === 'vendor' || role === 'beauty supplier') {
          navigate("/dashboard/supplier");
        } else if (role === 'other') {
          navigate("/dashboard/other");
        } else {
          // Fallback for unknown roles
          console.log("Unknown role, redirecting to general dashboard");
          navigate("/dashboard/other");
        }
      } catch (err) {
        console.error("Dashboard redirect error:", err);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    // Execute the redirect logic
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
