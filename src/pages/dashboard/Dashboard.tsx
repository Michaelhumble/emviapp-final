
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import DashboardLoadingState from "@/components/dashboard/DashboardLoadingState";
import DashboardErrorState from "@/components/dashboard/DashboardErrorState";
import DashboardRedirector from "@/components/dashboard/DashboardRedirector";

/**
 * Dashboard component that handles redirecting users to role-specific dashboards
 * and shows role selection for new users
 */
const Dashboard = () => {
  const { loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [loadingTime, setLoadingTime] = useState(0);
  const [redirectError, setRedirectError] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState(true);
  
  // Handle emergency logout for stuck states
  const handleEmergencyLogout = async () => {
    try {
      await signOut();
      navigate("/sign-in");
      toast.success("You've been logged out. Please sign in again.");
    } catch (error) {
      console.error("Emergency logout failed:", error);
      // Force clear local storage as last resort
      localStorage.clear();
      window.location.href = "/sign-in";
    }
  };

  // Redirect back to home
  const handleGoBack = () => {
    navigate("/");
    toast.info("Redirected to home page");
  };
  
  // Increment loading time counter
  useState(() => {
    if (localLoading || authLoading) {
      const timer = setInterval(() => {
        setLoadingTime(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
    
    return () => {}; // Empty cleanup for when not loading
  });
  
  // Set timeout for checking role
  useState(() => {
    if (localLoading && loadingTime > 5) {
      setLocalLoading(false);
      setRedirectError("It's taking longer than expected to load your dashboard. Please check your connection and try again.");
    }
  });
  
  // Show error state
  if (redirectError) {
    return (
      <DashboardErrorState
        error={redirectError}
        onRetry={() => {
          setRedirectError(null);
          setLocalLoading(true);
          setLoadingTime(0);
        }}
        onGoBack={handleGoBack}
        onEmergencyLogout={handleEmergencyLogout}
      />
    );
  }
  
  // Show loading state with progress indicator
  if (localLoading || authLoading) {
    return (
      <DashboardLoadingState 
        loadingTime={loadingTime} 
        handleEmergencyLogout={handleEmergencyLogout} 
      />
    );
  }
  
  // Redirector component handles the actual redirection logic
  return <DashboardRedirector setRedirectError={setRedirectError} setLocalLoading={setLocalLoading} />;
};

export default Dashboard;
