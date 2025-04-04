
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { isKnownRoute, logRouteAccess } from '@/utils/routeChecker';

interface RouteLoggerProps {
  routes?: string[];
}

/**
 * A component that logs route information to help with debugging
 * and provides real-time feedback about route availability
 */
const RouteLogger = ({ routes }: RouteLoggerProps) => {
  const location = useLocation();
  
  useEffect(() => {
    // Log current route navigation for debugging
    console.log(`🧭 Navigation: User accessed route "${location.pathname}"`);
    logRouteAccess(location.pathname);
    
    // If routes array is provided, check if current path is in the known routes
    if (routes && routes.length > 0) {
      const normalizedPath = location.pathname.endsWith('/') 
        ? location.pathname.slice(0, -1) 
        : location.pathname;
        
      const isRouteKnown = isKnownRoute(normalizedPath, routes);
      
      if (!isRouteKnown) {
        console.warn(`⚠️ Warning: "${location.pathname}" might be an undefined route!`);
        
        // Only show toast for non-production environments
        if (process.env.NODE_ENV !== 'production') {
          toast.warning(`Route warning: "${location.pathname}" is not defined in the routes list`, {
            description: "This won't affect users, but you might want to update your route definitions.",
            duration: 5000,
          });
        }
      }
    }
  }, [location.pathname, routes]);
  
  // This component doesn't render anything
  return null;
};

export default RouteLogger;
