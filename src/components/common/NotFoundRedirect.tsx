
import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Loader2, ArrowLeft, AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { logRouteAccess } from "@/utils/routeChecker";

/**
 * Component that redirects users to home page if they visit a route 
 * they shouldn't have access to based on their role or that doesn't exist
 */
const NotFoundRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);
  const [attemptedPath, setAttemptedPath] = useState<string>("");
  
  // Log all 404 redirects for monitoring
  useEffect(() => {
    const currentPath = window.location.pathname;
    setAttemptedPath(currentPath);
    console.error(`404 redirect triggered for path: ${currentPath}`);
    logRouteAccess(currentPath);
    
    // Show toast notification
    toast.error(`Page not found: ${currentPath}`, {
      description: "You'll be redirected to the home page in 5 seconds.",
    });
    
    document.title = "Page Not Found | EmviApp";
    
    // Count down timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/', { state: { from: currentPath } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate, location.pathname]);
  
  return (
    <Layout hideNavbar={false}>
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <div className="text-center max-w-md">
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
          
          <p className="text-gray-500 mb-8">
            Redirecting you to the home page in {countdown} seconds...
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundRedirect;
