
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { navigateToRoleDashboard } from "@/utils/navigation";

/**
 * This component serves as a backup for the main dashboard index
 * It provides role-based redirection with validation
 */
const Dashboard = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) return;
    
    if (!user) {
      console.log("[Dashboard] No user found, redirecting to sign-in");
      navigate("/sign-in");
      return;
    }
    
    // If we have a role, redirect to the appropriate dashboard
    if (userRole) {
      console.log("[Dashboard] Redirecting based on role:", userRole);
      navigateToRoleDashboard(navigate, userRole);
    } else {
      console.log("[Dashboard] No role found, redirecting to profile edit");
      navigate("/profile/edit");
    }
  }, [user, userRole, loading, navigate]);
  
  // This component doesn't render anything of its own, it just redirects
  return null;
};

export default Dashboard;
