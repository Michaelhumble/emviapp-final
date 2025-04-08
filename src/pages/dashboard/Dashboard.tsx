
import { useAuth } from "@/context/auth";
import { UserRole } from "@/context/auth/types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/**
 * This component serves as a backup for the main dashboard index
 * It provides role-based redirection
 */
const Dashboard = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) return;
    
    if (!user) {
      navigate("/sign-in");
      return;
    }
    
    // If we have a role, redirect to the appropriate dashboard
    if (userRole) {
      console.log("Dashboard.tsx redirecting based on role:", userRole);
      redirectBasedOnRole(userRole, navigate);
    }
  }, [user, userRole, loading, navigate]);
  
  // This component doesn't render anything of its own, it just redirects
  return null;
};

// Helper function to redirect based on role
const redirectBasedOnRole = (role: UserRole, navigate: any) => {
  switch (role) {
    case 'artist':
    case 'nail technician/artist':
      navigate('/dashboard/artist');
      break;
    case 'salon':
    case 'owner':
      navigate('/dashboard/salon');
      break;
    case 'customer':
      navigate('/dashboard/customer');
      break;
    case 'supplier':
    case 'vendor':
    case 'beauty supplier':
      navigate('/dashboard/supplier');
      break;
    case 'freelancer':
      navigate('/dashboard/freelancer');
      break;
    case 'renter':
      navigate('/dashboard/artist'); // Renters see artist dashboard
      break;
    case 'other':
    default:
      navigate('/dashboard/other');
  }
};

export default Dashboard;
