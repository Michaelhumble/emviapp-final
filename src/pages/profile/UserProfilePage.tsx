
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import UserProfile from "@/components/profile/UserProfile";
import { useAuth } from "@/context/auth";
import { Navigate } from "react-router-dom";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ErrorBoundary from "@/components/error-handling/ErrorBoundary";

const UserProfilePage = () => {
  const { user, loading, userProfile, isError } = useAuth();
  const [localLoading, setLocalLoading] = useState(true);
  const [loadTimeout, setLoadTimeout] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  
  useEffect(() => {
    document.title = "Your Profile | EmviApp";
    
    // Set timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (loading || localLoading) {
        console.log("UserProfilePage - Loading timeout triggered");
        setLoadTimeout(true);
      }
    }, 8000); // 8 second timeout (was 15, now reduced)
    
    // Update local loading state when auth loading changes
    if (!loading) {
      console.log("UserProfilePage - Auth loading complete");
      setLocalLoading(false);
    }
    
    // Track loading attempts to break out of infinite loops
    setLoadAttempts(prev => prev + 1);
    
    return () => clearTimeout(timeoutId);
  }, [loading]);

  // Stop infinite loading cycles after 3 attempts
  useEffect(() => {
    if (loadAttempts > 3 && (loading || localLoading)) {
      console.log("UserProfilePage - Too many loading attempts, forcing timeout");
      setLoadTimeout(true);
      setLocalLoading(false);
    }
  }, [loadAttempts, loading, localLoading]);

  // Handle auth errors
  if (isError) {
    return (
      <Layout>
        <div className="container mx-auto p-6 text-center">
          <AlertTriangle size={40} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-4">Authentication Error</h2>
          <p className="mb-6">There was a problem loading your profile data. Please try signing in again.</p>
          <Button onClick={() => window.location.href = '/auth/signin'}>Sign In Again</Button>
        </div>
      </Layout>
    );
  }

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
            <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">⚠️ Unable to load profile data</h2>
            <p className="text-gray-600 mb-4">
              Your profile is taking longer than expected to load. 
              This could be due to network issues or high traffic.
            </p>
            <Button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Page
            </Button>
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
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
            <p className="text-sm text-gray-500">Loading your profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // When there's a user but no profile data available
  if (user && !userProfile) {
    return (
      <Layout>
        <div className="container mx-auto p-6 text-center">
          <AlertTriangle size={40} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-xl font-semibold mb-4">Profile Data Unavailable</h2>
          <p className="mb-6">We couldn't load your profile information. Please refresh or try again later.</p>
          <Button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Page
          </Button>
        </div>
      </Layout>
    );
  }

  // Normal profile display
  return (
    <Layout>
      <ErrorBoundary>
        <UserProfile />
      </ErrorBoundary>
    </Layout>
  );
};

export default UserProfilePage;
