
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { navigateToRoleDashboard } from "@/utils/navigation";

/**
 * This component redirects users to their role-specific dashboard
 */
const Dashboard = () => {
  const { userRole, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading) {
      navigateToRoleDashboard(navigate, userRole);
    }
  }, [userRole, loading, navigate]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
    </div>
  );
};

export default Dashboard;
