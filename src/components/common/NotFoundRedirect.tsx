
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

/**
 * Component that redirects users to home page if they visit a route 
 * they shouldn't have access to based on their role or that doesn't exist
 */
const NotFoundRedirect = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  
  // Log all 404 redirects for monitoring
  useEffect(() => {
    const currentPath = window.location.pathname;
    console.log(`404 redirect triggered for path: ${currentPath}`);
    
    document.title = "Page Not Found | EmviApp";
    
    // Count down timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);
  
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <div className="text-center max-w-md">
          <div className="bg-amber-50 p-3 rounded-full inline-flex mb-6">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Page not found or access restricted</h1>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or you don't have permission to access it.
            Redirecting you to the home page in {countdown} seconds...
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go to Home Page Now
              </Button>
            </Link>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundRedirect;
