
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Map from "@/components/Map";
import { migrateSingleToMultiSalon } from "@/utils/migration/migrateSingleToMultiSalon";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ErrorBoundary from "@/components/error-handling/ErrorBoundary";
import DashboardRedirector from "@/components/dashboard/DashboardRedirector";

const DashboardPage = () => {
  const { user, userRole, userProfile, loading, isError } = useAuth();
  const [redirectError, setRedirectError] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState(true);
  const [loadTimeout, setLoadTimeout] = useState(false);

  useEffect(() => {
    // Set loading timeout to prevent infinite loading
    if (loading || localLoading) {
      const timeoutId = setTimeout(() => {
        setLoadTimeout(true);
      }, 10000); // 10 second timeout
      
      return () => clearTimeout(timeoutId);
    }
  }, [loading, localLoading]);

  useEffect(() => {
    // If user exists and is a salon owner, check if we need to migrate
    if (user && userRole === "owner") {
      migrateSingleToMultiSalon(user.id)
        .then((salonId) => {
          if (salonId) {
            console.log("Salon migrated successfully, ID:", salonId);
          }
        })
        .catch((error) => {
          console.error("Error during migration:", error);
        });
    }
  }, [user, userRole]);

  // Handle auth error state
  if (isError) {
    return (
      <Layout>
        <ErrorBoundary>
          <div className="container mx-auto p-6 text-center">
            <AlertTriangle size={40} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-4">Authentication Error</h2>
            <p className="mb-6">There was a problem loading your account data. Please try signing in again.</p>
            <Button onClick={() => window.location.href = '/auth/signin'}>Sign In Again</Button>
          </div>
        </ErrorBoundary>
      </Layout>
    );
  }

  // If still loading, show loading state but with timeout protection
  if ((loading || localLoading) && !loadTimeout) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-pulse space-y-6 w-full max-w-lg">
              <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto"></div>
              <div className="h-64 bg-gray-200 rounded w-full"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // If loading times out, show timeout error
  if (loadTimeout) {
    return (
      <Layout>
        <div className="container mx-auto p-6 text-center">
          <AlertTriangle size={40} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-xl font-semibold mb-4">⚠️ Unable to load dashboard. Please refresh or try again later.</h2>
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

  // If redirect error occurs, show the error
  if (redirectError) {
    return (
      <Layout>
        <div className="container mx-auto p-6 text-center">
          <AlertTriangle size={40} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-xl font-semibold mb-4">{redirectError}</h2>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => window.location.reload()}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Page
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/profile/edit'}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Redirect based on user role
  if (user) {
    return <DashboardRedirector setRedirectError={setRedirectError} setLocalLoading={setLocalLoading} />;
  }

  // Return default dashboard for non-authenticated users
  return (
    <Layout>
      <ErrorBoundary>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Welcome to EmviApp</h1>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Discover Beauty Professionals in Los Angeles</CardTitle>
              </CardHeader>
              <CardContent>
                <Map 
                  height="500px" 
                  className="rounded-lg shadow-lg" 
                  zoom={12}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </ErrorBoundary>
    </Layout>
  );
};

export default DashboardPage;
