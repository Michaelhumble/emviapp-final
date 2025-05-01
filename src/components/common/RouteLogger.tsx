
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { logRouteAccess } from '@/utils/routeChecker';

const RouteLogger = () => {
  // This will now safely be used within the BrowserRouter context
  const location = useLocation();
  const { user } = useAuth();
  
  useEffect(() => {
    try {
      // Log route access for analytics
      if (typeof logRouteAccess === 'function') {
        logRouteAccess(location.pathname);
      } else {
        console.info(`📍 Route accessed: ${location.pathname}`);
      }
      
      // Add additional info for logged in users
      if (user) {
        console.info(`User ${user.id} accessing route: ${location.pathname}`);
      } else {
        console.info(`Anonymous user accessing route: ${location.pathname}`);
      }
      
      // Debug asset path issues by logging the current route
      console.info(`Current route: ${location.pathname}`);
    } catch (error) {
      console.error("Error in RouteLogger:", error);
    }
  }, [location.pathname, user]);
  
  // This is a utility component that doesn't render anything
  return null;
};

export default RouteLogger;
