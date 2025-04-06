
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserRole } from "@/context/auth/types";

/**
 * Dashboard page that handles loading user profile and redirecting to role-specific dashboards
 */
const DashboardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingTime, setLoadingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // Function to handle going back to home
  const handleGoBack = () => {
    navigate("/");
    toast.info("Redirected to home page");
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
    if (loading && loadingTime > 5) {
      setLoading(false);
      setError("It's taking longer than expected to load your dashboard. Please try again.");
    }
  }, [loadingTime, loading]);
  
  // Main effect to fetch user data and redirect
  useEffect(() => {
    async function fetchUserAndRedirect() {
      try {
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw new Error(`Session error: ${sessionError.message}`);
        
        // Check if user is signed in
        if (!session || !session.user) {
          console.log("No active session, redirecting to sign-in");
          navigate("/sign-in");
          return;
        }
        
        // Fetch user profile from database
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle();
          
        if (profileError) throw new Error(`Profile error: ${profileError.message}`);
        
        // If profile or role is missing, redirect to role selection
        if (!profile || !profile.role) {
          console.log("User has no role, redirecting to role selection");
          navigate("/select-role");
          return;
        }
        
        // Process role and redirect to appropriate dashboard
        const role = profile.role as UserRole;
        console.log("User role found:", role);
        
        switch (role) {
          case "artist":
          case "nail technician/artist":
            navigate("/dashboard/artist");
            break;
          case "salon":
          case "owner":
            navigate("/dashboard/salon");
            break;
          case "freelancer":
            navigate("/dashboard/freelancer");
            break;
          case "vendor":
          case "supplier":
          case "beauty supplier":
            navigate("/dashboard/supplier");
            break;
          case "customer":
            navigate("/dashboard/customer");
            break;
          case "renter":
            navigate("/dashboard/artist"); // Renters go to artist dashboard
            break;
          case "other":
          default:
            navigate("/dashboard/other");
        }
      } catch (error) {
        console.error("Error in dashboard redirect:", error);
        setError(`Unable to load your dashboard: ${error.message}`);
        setLoading(false);
      } finally {
        // Ensure loading state is set to false in all cases
        setLoading(false);
      }
    }
    
    fetchUserAndRedirect();
  }, [navigate]);
  
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
                setLoading(true);
                setLoadingTime(0);
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
              This is taking longer than expected. 
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
