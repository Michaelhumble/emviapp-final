
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

/**
 * Component that redirects users to home page if they visit a route 
 * they shouldn't have access to based on their role
 */
const NotFoundRedirect = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Give a brief delay before redirecting
    const timer = setTimeout(() => {
      navigate('/');
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
      <h1 className="text-2xl font-bold mb-4">Page not found</h1>
      <p className="text-gray-500">Redirecting you to the home page...</p>
    </div>
  );
};

export default NotFoundRedirect;
