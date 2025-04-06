
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

const DashboardIndex = () => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Set a timeout for the loading state
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setError("Dashboard is taking longer than expected to load. Please try refreshing the page.");
      }
    }, 10000); // 10 seconds timeout
    
    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  useEffect(() => {
    const redirectBasedOnRole = async () => {
      try {
        // First check: Use auth context to verify login state before proceeding
        if (!isSignedIn || !user) {
          console.log("No authenticated user found in context, redirecting to sign-in");
          navigate("/sign-in");
          return;
        }
        
        // Step 2: Query the users table to get the user's role
        console.log("Fetching user profile for ID:", user.id);
        const { data: userData, error: profileError } = await supabase
          .from('users')
          .select('id, email, role')
          .eq('id', user.id)
          .maybeSingle();
        
        if (profileError) {
          console.error("Error fetching user profile:", profileError);
          throw new Error("Could not retrieve your user profile");
        }
        
        // Step 3: Redirect based on role
        if (!userData || !userData.role) {
          console.log("User has no role, redirecting to role selection");
          toast.info("Please select your role to continue");
          navigate("/select-role");
          return;
        }
        
        // Step 4: Safe role-based redirection with normalized role
        const role = (userData.role || "").toLowerCase().trim();
        console.log("User role found:", role);
        
        if (role.includes('artist') || role === 'nail technician/artist' || role === 'renter') {
          navigate("/dashboard/artist");
        } else if (role === 'salon' || role === 'owner') {
          navigate("/dashboard/salon");
        } else if (role === 'customer') {
          navigate("/dashboard/customer");
        } else if (role === 'freelancer') {
          navigate("/dashboard/freelancer");
        } else if (
          role === 'supplier' || 
          role === 'vendor' || 
          role === 'beauty supplier'
        ) {
          navigate("/dashboard/supplier");
        } else {
          // Fallback for other roles with logging
          console.log(`Found unknown role: "${role}", redirecting to general dashboard`);
          navigate("/dashboard/other");
        }
        
      } catch (err) {
        console.error("Dashboard redirect error:", err);
        setError(err instanceof Error ? err.message : "Failed to load your dashboard. Please try refreshing the page.");
      } finally {
        setIsLoading(false);
      }
    };

    redirectBasedOnRole();
    
    // Dependency on user and isSignedIn ensures the effect reruns if auth state changes
  }, [navigate, user, isSignedIn]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/sign-in")}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Return to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex items-center space-x-2 mb-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="text-lg">Loading your dashboard...</span>
      </div>
      <p className="text-gray-500 text-sm">We're redirecting you to your personalized dashboard</p>
    </div>
  );
};

export default DashboardIndex;
