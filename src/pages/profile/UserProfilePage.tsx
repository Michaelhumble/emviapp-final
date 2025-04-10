
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import UserProfile from "@/components/profile/UserProfile";
import { useAuth } from "@/context/auth";
import { Navigate } from "react-router-dom";
import { Loader2, RefreshCw } from "lucide-react";

const UserProfilePage = () => {
  const { user, loading, userProfile } = useAuth();
  const [localLoading, setLocalLoading] = useState(true);
  const [loadTimeout, setLoadTimeout] = useState(false);
  
  useEffect(() => {
    document.title = "Your Profile | EmviApp";
    
    // Set timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (loading || localLoading) {
        console.log("UserProfilePage - Loading timeout triggered");
        setLoadTimeout(true);
      }
    }, 8000); // 8 second timeout
    
    // Update local loading state when auth loading changes
    if (!loading) {
      console.log("UserProfilePage - Auth loading complete");
      setLocalLoading(false);
    }
    
    return () => clearTimeout(timeoutId);
  }, [loading]);

  // Not logged in, redirect to sign in
  if (!user && !loading) {
    console.log("UserProfilePage - No user, redirecting to sign in");
    return <Navigate to="/auth/signin" replace />;
  }

  // Still loading with timeout exceeded, show retry option
  if ((loading || localLoading) && loadTimeout) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-md w-full text-center">
            <Loader2 className="h-10 w-10 text-primary/40 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Still Loading...</h2>
            <p className="text-gray-600 mb-4">
              Your profile is taking longer than expected to load. 
              This could be due to network issues or high traffic.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Page
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Normal loading state
  if (loading || localLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
        </div>
      </Layout>
    );
  }

  // Normal profile display
  return (
    <Layout>
      <UserProfile />
    </Layout>
  );
};

export default UserProfilePage;
