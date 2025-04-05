
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, UserX } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { logRouteAccess } from "@/utils/routeChecker";

const ProfileNotFound = () => {
  const location = useLocation();
  
  useEffect(() => {
    const currentPath = location.pathname;
    console.error(`Profile not found: ${currentPath}`);
    logRouteAccess(currentPath);
    document.title = "Profile Not Found | EmviApp";
  }, [location.pathname]);
  
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <div className="max-w-md text-center">
          <div className="bg-gray-50 p-6 rounded-full inline-flex mb-6">
            <UserX className="h-16 w-16 text-gray-400" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Profile Not Found</h1>
          
          <p className="text-xl text-gray-600 mb-8">
            The user profile you're looking for doesn't exist or has been removed.
          </p>
          
          <Link to="/">
            <Button size="lg" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileNotFound;
