import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const ProfileRedirect = () => {
  const { userRole, isSignedIn, loading, userProfile, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [extendedTimeout, setExtendedTimeout] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let extendedTimeoutId: NodeJS.Timeout;
    
    const handleNavigation = async () => {
      if (loading) {
        timeoutId = setTimeout(() => {
          setLoadingTimeout(true);
          toast.info("Still loading your profile data. This may take a moment...");
        }, 5000);
        
        extendedTimeoutId = setTimeout(() => {
          setExtendedTimeout(true);
          toast.warning("Loading is taking longer than expected. You may want to try refreshing.");
        }, 15000);
        
        return () => {
          clearTimeout(timeoutId);
          clearTimeout(extendedTimeoutId);
        };
      }
      
      clearTimeout(timeoutId);
      clearTimeout(extendedTimeoutId);
      
      try {
        if (!isSignedIn) {
          console.log("User not signed in, redirecting to sign in page");
          navigate("/auth/signin");
          return;
        }
        
        console.log("Navigation check: User profile status:", !!userProfile);
        
        if (userProfile?.full_name) {
          console.log("Profile complete, redirecting to profile page");
          navigate("/profile");
          return;
        }
        
        console.log("Profile incomplete, redirecting to profile editor");
        navigate("/profile/edit");
      } catch (error) {
        console.error("Navigation error:", error);
        setLoadingError("Failed to determine redirect destination");
        toast.error("Something went wrong while loading your profile");
      }
    };
    
    handleNavigation();
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(extendedTimeoutId);
    };
  }, [userRole, isSignedIn, loading, navigate, userProfile]);
  
  const handleRefresh = () => {
    if (refreshUserProfile) {
      toast.info("Refreshing your profile data...");
      refreshUserProfile().then(() => {
        setTimeout(() => {
          if (loading) {
            toast.info("Still working on it. Please be patient or try reloading the page.");
          }
        }, 3000);
      }).catch(err => {
        console.error("Profile refresh error:", err);
        toast.error("Failed to refresh profile data");
        setLoadingError("Unable to load your profile data. Please try again later.");
      });
    } else {
      window.location.reload();
    }
  };
  
  if (loadingError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Profile Error</h2>
          <p className="text-gray-600 mb-6">{loadingError}</p>
          <div className="flex flex-col gap-3">
            <Button onClick={handleRefresh} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/dashboard")} 
              className="w-full"
            >
              Go to Dashboard
            </Button>
            <Button 
              variant="link" 
              onClick={() => navigate("/auth/signin")} 
              className="text-gray-500"
            >
              Sign Out and Sign In Again
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6 text-center">
        <Loader2 className="h-10 w-10 animate-spin mb-4 mx-auto text-primary" />
        <h2 className="text-xl font-semibold mb-2">Loading Your Profile</h2>
        <p className="text-gray-600 mb-6">
          We're getting everything ready for you...
        </p>
        
        {loadingTimeout && (
          <div className="mt-6 border border-amber-200 bg-amber-50 rounded-md p-4 text-left">
            <p className="text-amber-800 font-medium mb-2">This is taking longer than expected.</p>
            <ul className="text-amber-700 text-sm space-y-1 mb-4">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>This may happen if you have a slow connection</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Our service might be experiencing high traffic</span>
              </li>
              {extendedTimeout && (
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>There might be an issue with your account data</span>
                </li>
              )}
            </ul>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={handleRefresh} 
                className="flex-1"
                variant="default"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Profile
              </Button>
              <Button 
                onClick={() => navigate("/dashboard")} 
                className="flex-1"
                variant="outline"
              >
                Go to Dashboard
              </Button>
            </div>
            
            {extendedTimeout && (
              <div className="mt-4 pt-4 border-t border-amber-200">
                <p className="text-sm text-amber-800 mb-2">Still having trouble?</p>
                <Button 
                  variant="link" 
                  onClick={() => navigate("/auth/signin")} 
                  className="text-amber-900 p-0 h-auto underline text-sm"
                >
                  Sign out and sign back in
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileRedirect;
