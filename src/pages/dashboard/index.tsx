
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

/**
 * Dashboard page that handles loading user profile and redirecting to role-specific dashboards
 */
const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, userRole, loading, signOut } = useAuth();
  const [loadingTime, setLoadingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // Function to handle going back to home
  const handleGoBack = () => {
    navigate("/");
    toast.info("Redirected to home page");
  };
  
  // Function to handle emergency logout
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
  
  // Increment loading time counter
  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setLoadingTime(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
    
    return () => {}; // Empty cleanup for when not loading
  }, [loading]);
  
  // Set timeout for loading
  useEffect(() => {
    if (loading && loadingTime > 8) {
      setError("It's taking longer than expected to load your dashboard. Please try again or sign out.");
    }
  }, [loadingTime, loading]);
  
  // Main effect to handle redirection based on role
  useEffect(() => {
    if (loading) return;
    
    if (!user) {
      navigate("/sign-in");
      return;
    }
    
    // If we have a role, redirect to the appropriate dashboard
    if (userRole) {
      console.log("Redirecting to dashboard for role:", userRole);
      
      switch (userRole) {
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
    } else if (!loading && user) {
      // If no role but user is logged in, redirect to role selection
      navigate("/select-role");
    }
  }, [user, userRole, loading, navigate]);
  
  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <AlertTriangle size={48} />
          </div>
          <h2 className="text-xl font-semibold text-center mb-4">Dashboard Error</h2>
          <p className="text-gray-600 mb-6 text-center">{error}</p>
          <div className="flex flex-col gap-2">
            <Button 
              variant="default" 
              onClick={() => {
                setError(null);
                window.location.reload();
              }}
            >
              Try Again
            </Button>
            <Button 
              variant="outline" 
              onClick={handleGoBack} 
              className="mt-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleEmergencyLogout} 
              className="mt-4"
            >
              Emergency Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Show loading state with progress indicator
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4 mb-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="flex flex-col items-center">
          <span className="text-lg font-medium">Loading your dashboard...</span>
          <span className="text-sm text-gray-500">{loadingTime > 3 ? `(${loadingTime}s)` : ''}</span>
        </div>
      </div>
      <p className="text-gray-500 text-sm max-w-md text-center">
        We're redirecting you to the appropriate dashboard
        {loadingTime > 3 && (
          <>
            <br />
            <br />
            <span className="text-amber-600">
              This is taking longer than expected. If you continue to see this message, try 
              <Button 
                variant="link" 
                className="p-0 h-auto font-medium text-primary mx-1" 
                onClick={() => window.location.reload()}
              >
                refreshing the page
              </Button> 
              or 
              <Button 
                variant="link" 
                className="p-0 h-auto mx-1 font-medium text-red-500" 
                onClick={handleEmergencyLogout}
              >
                signing out
              </Button>.
            </span>
          </>
        )}
      </p>
      
      {/* Progress indicator */}
      <div className="w-64 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full animate-pulse" 
          style={{ width: `${Math.min(loadingTime * 10, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DashboardPage;
