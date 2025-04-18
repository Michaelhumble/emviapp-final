
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import DashboardLoadingState from "@/components/dashboard/DashboardLoadingState";
import DashboardContent from "@/components/dashboard/DashboardContent";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();
  const [loadingTime, setLoadingTime] = useState(0);

  // Increment loading time counter
  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setLoadingTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [loading]);

  // Handle emergency logout if needed
  const handleEmergencyLogout = async () => {
    try {
      navigate("/sign-in");
    } catch (error) {
      console.error("Emergency navigation failed:", error);
      window.location.href = "/sign-in";
    }
  };

  // Show loading state while auth is being checked
  if (loading || !user) {
    return (
      <DashboardLoadingState 
        loadingTime={loadingTime}
        handleEmergencyLogout={handleEmergencyLogout}
      />
    );
  }

  // Render dashboard content once user is loaded
  return <DashboardContent />;
};

export default DashboardPage;
