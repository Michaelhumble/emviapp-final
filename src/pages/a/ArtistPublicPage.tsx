
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ErrorBoundary from "@/components/error-handling/ErrorBoundary";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, AlertOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";

const ArtistPublicPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  // Mock data loading - replace with actual data loading
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      if (!username) {
        setError("Username not provided");
      }
      
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [username]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container max-w-5xl mx-auto py-12">
          <div className="flex flex-col items-center justify-center p-12">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading artist profile...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="container max-w-5xl mx-auto py-12">
          <Card className="border-red-100 shadow-sm">
            <CardContent className="p-12 text-center">
              <div className="mb-4 inline-flex items-center justify-center p-3 bg-red-50 rounded-full">
                <AlertOctagon className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-xl font-medium mb-2">Artist Not Found</h2>
              <p className="text-gray-600 mb-6">
                {error || "We couldn't find the artist profile you're looking for."}
              </p>
              <Button asChild>
                <a href="/explore/artists">Browse Artists</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
  
  // Dynamically import the actual profile page to avoid circular dependencies
  const ProfileComponent = React.lazy(() => import('./artist-profile/index'));
  
  return (
    <Layout>
      <ErrorBoundary
        fallback={
          <div className="container max-w-5xl mx-auto py-12">
            <Card className="border-red-100 shadow-sm">
              <CardContent className="p-12 text-center">
                <div className="mb-4 inline-flex items-center justify-center p-3 bg-red-50 rounded-full">
                  <AlertOctagon className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-xl font-medium mb-2">Error Loading Profile</h2>
                <p className="text-gray-600 mb-6">
                  We encountered an error while loading this artist profile.
                </p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="mr-2"
                >
                  Try Again
                </Button>
                <Button variant="outline" asChild>
                  <a href="/explore/artists">Browse Other Artists</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        }
      >
        <React.Suspense
          fallback={
            <div className="container max-w-5xl mx-auto py-12 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          }
        >
          <ProfileComponent />
        </React.Suspense>
      </ErrorBoundary>
    </Layout>
  );
};

export default ArtistPublicPage;
