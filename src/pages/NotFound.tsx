
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Home } from "lucide-react";
import { logRouteAccess } from "@/utils/routeChecker";

const NotFound = () => {
  const location = useLocation();
  const [attemptedPath, setAttemptedPath] = useState<string>("");

  useEffect(() => {
    // Capture the path that was attempted
    const currentPath = location.pathname;
    setAttemptedPath(currentPath);
    
    // Log the 404 error
    console.error(
      "404 Error: User attempted to access non-existent route:",
      currentPath
    );
    logRouteAccess(currentPath);
    
    document.title = "Page Not Found | EmviApp";
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="bg-red-50 p-6 rounded-full inline-flex mb-6">
            <AlertTriangle className="h-16 w-16 text-red-500" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          
          <p className="text-xl text-gray-600 mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          {attemptedPath && (
            <p className="text-sm text-red-500 mb-8">
              Attempted path: {attemptedPath}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/">
              <Button size="lg" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
