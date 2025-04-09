
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { navigateToRoleDashboard } from "@/utils/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { UserRole } from "@/context/auth/types";

/**
 * This component serves as the main dashboard entry point
 * It provides role-based redirection with strict validation
 */
const Dashboard = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const redirectToDashboard = async () => {
      if (loading) return;
      
      if (!user) {
        console.log("[Dashboard] No user found, redirecting to sign-in");
        navigate("/sign-in");
        return;
      }
      
      try {
        console.log("[Dashboard] Current role from context:", userRole);
        
        // Force check role directly from the database to avoid any state issues
        const { data: profile, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();
        
        if (error) {
          throw new Error(`Failed to fetch user role: ${error.message}`);
        }
        
        // Use role from database to ensure accuracy
        const databaseRole = profile?.role as UserRole | null;
        console.log("[Dashboard] Role from database:", databaseRole);
        
        if (databaseRole) {
          // Also save to localStorage for redundancy
          localStorage.setItem('emviapp_user_role', databaseRole);
          
          // Use the role from database for redirection
          navigateToRoleDashboard(navigate, databaseRole);
        } else {
          console.log("[Dashboard] No role found, redirecting to profile edit");
          toast.error("Please complete your profile to access your dashboard");
          navigate("/profile/edit");
        }
      } catch (error) {
        console.error("[Dashboard] Error in role validation:", error);
        setError("Unable to load your dashboard. Please try again.");
        setLocalLoading(false);
      }
    };
    
    redirectToDashboard();
  }, [user, userRole, loading, navigate]);
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          className="px-4 py-2 bg-primary text-white rounded-md"
          onClick={() => navigate("/profile/edit")}
        >
          Go to Profile
        </button>
      </div>
    );
  }
  
  if (loading || localLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Loading your dashboard...</span>
      </div>
    );
  }
  
  // This component doesn't render anything of its own, it just redirects
  return null;
};

export default Dashboard;
