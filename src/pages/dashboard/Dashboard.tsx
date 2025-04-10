
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
    // Debug log to track component rendering
    console.log("[Dashboard] Component mounted/updated", { 
      user: !!user, 
      userRole, 
      loading 
    });
    
    const redirectToDashboard = async () => {
      if (loading) return;
      
      if (!user) {
        console.log("[Dashboard] No user found, redirecting to sign-in");
        navigate("/sign-in");
        return;
      }
      
      try {
        console.log("[Dashboard] Current role from context:", userRole);
        
        // IMPORTANT: Force check role from both auth metadata and database
        // 1. First check user metadata (most current)
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          console.error("[Dashboard] Error getting auth user:", authError);
        }
        
        // Get role from user metadata if available
        const metadataRole = authUser?.user_metadata?.role as UserRole | undefined;
        console.log("[Dashboard] Role from auth metadata:", metadataRole);
        
        // 2. Then check the database (fallback)
        const { data: profile, error: dbError } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();
        
        if (dbError) {
          console.error("[Dashboard] Error fetching user role from DB:", dbError);
        }
        
        // Use role from database as fallback
        const databaseRole = profile?.role as UserRole | undefined;
        console.log("[Dashboard] Role from database:", databaseRole);
        
        // 3. Determine the final role to use (prioritize metadata over database)
        const finalRole = metadataRole || databaseRole || userRole;
        console.log("[Dashboard] Final determined role:", finalRole);
        
        if (finalRole) {
          // Save to localStorage for redundancy
          localStorage.setItem('emviapp_user_role', finalRole);
          
          // CRITICAL FIX: Direct navigation to specific dashboard route
          // Ensure that each role has a specific route mapped
          switch (finalRole) {
            case 'salon':
              navigate("/dashboard/salon", { replace: true });
              break;
            case 'owner':
              navigate("/dashboard/owner", { replace: true });
              break;
            case 'artist':
            case 'nail technician/artist':
              navigate("/dashboard/artist", { replace: true });
              break;
            case 'customer':
              navigate("/dashboard/customer", { replace: true });
              break;
            case 'freelancer':
              navigate("/dashboard/freelancer", { replace: true });
              break;
            case 'supplier':
              navigate("/dashboard/supplier", { replace: true });
              break;
            default:
              navigate("/dashboard/other", { replace: true });
          }
        } else {
          console.log("[Dashboard] No role found, redirecting to profile edit");
          toast.error("Please complete your profile to access your dashboard");
          navigate("/profile/edit");
        }
      } catch (error) {
        console.error("[Dashboard] Error in role validation:", error);
        setError("Unable to load your dashboard. Please try again.");
        setLocalLoading(false);
      } finally {
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
