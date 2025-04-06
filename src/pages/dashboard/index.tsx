
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const DashboardIndex = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const redirectBasedOnRole = async () => {
      try {
        // Step 1: Get the current authenticated user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) throw userError;
        
        if (!user) {
          console.log("No authenticated user found, redirecting to sign-in");
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
        
        if (profileError) throw profileError;
        
        // Step 3: Redirect based on role
        if (!userData || !userData.role) {
          console.log("User has no role, redirecting to role selection");
          navigate("/select-role");
          return;
        }
        
        // Step 4: Role-based redirection
        const role = userData.role.toLowerCase();
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
          // Fallback for other roles
          navigate("/dashboard/other");
        }
        
      } catch (err) {
        console.error("Dashboard redirect error:", err);
        setError("Failed to load your dashboard. Please try refreshing the page.");
      } finally {
        setIsLoading(false);
      }
    };

    redirectBasedOnRole();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
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
