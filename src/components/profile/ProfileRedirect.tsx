
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const ProfileRedirect = () => {
  const { userRole, isSignedIn, loading, userProfile } = useAuth();
  const navigate = useNavigate();
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  
  useEffect(() => {
    if (loading) {
      // Set a timeout to show a helpful message if loading takes too long
      const timeoutId = setTimeout(() => {
        setLoadingTimeout(true);
        toast.info("Still loading your profile data. This may take a moment...");
      }, 5000);
      
      return () => clearTimeout(timeoutId);
    }
    
    if (!isSignedIn) {
      navigate("/auth/signin");
      return;
    }
    
    // If the user has completed their profile, redirect to the profile page
    if (userProfile?.full_name) {
      navigate("/profile");
      return;
    }
    
    // Otherwise, redirect to the appropriate profile editor
    navigate("/profile/edit");
  }, [userRole, isSignedIn, loading, navigate, userProfile]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin mb-4" />
      <span className="ml-2">Loading profile...</span>
      
      {loadingTimeout && (
        <div className="mt-6 max-w-md text-center text-amber-600 text-sm p-4 bg-amber-50 rounded-md">
          <p>This is taking longer than expected. You can:</p>
          <ul className="mt-2 space-y-1">
            <li>Wait a bit longer</li>
            <li>Refresh the page</li>
            <li>Try logging out and back in</li>
          </ul>
          <div className="mt-4 flex justify-center gap-3">
            <button 
              onClick={() => window.location.reload()} 
              className="text-primary hover:underline"
            >
              Refresh
            </button>
            <button 
              onClick={() => navigate('/dashboard')} 
              className="text-primary hover:underline"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileRedirect;
