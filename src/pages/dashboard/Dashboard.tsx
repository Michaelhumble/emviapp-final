
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { navigateToRoleDashboard } from "@/utils/navigation";
import { Loader2 } from "lucide-react";

/**
 * This component redirects users to their role-specific dashboard
 */
const Dashboard = () => {
  const { userRole, loading, user, isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading) {
      // If user is not signed in, redirect to sign in
      if (!isSignedIn) {
        navigate("/sign-in");
        return;
      }
      
      // Redirect based on role
      navigateToRoleDashboard(navigate, userRole);
    }
  }, [userRole, loading, navigate, isSignedIn, user]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex items-center space-x-2 mb-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="text-lg">Loading your dashboard...</span>
      </div>
      <p className="text-gray-500 text-sm">We're redirecting you to the appropriate dashboard</p>
    </div>
  );
};

export default Dashboard;
