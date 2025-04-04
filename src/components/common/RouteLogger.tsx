
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteLoggerProps {
  routes?: string[];
}

/**
 * A component that logs route information to help with debugging
 */
const RouteLogger = ({ routes }: RouteLoggerProps) => {
  const location = useLocation();
  
  useEffect(() => {
    // Log current route navigation for debugging
    console.log(`🧭 Navigation: User accessed route "${location.pathname}"`);
    
    // If routes array is provided, check if current path is in the known routes
    if (routes && routes.length > 0) {
      const normalizedPath = location.pathname.endsWith('/') 
        ? location.pathname.slice(0, -1) 
        : location.pathname;
        
      const isKnownRoute = routes.some(route => {
        const normalizedRoute = route.endsWith('/') ? route.slice(0, -1) : route;
        return normalizedRoute === normalizedPath || normalizedRoute === '*';
      });
      
      if (!isKnownRoute) {
        console.warn(`⚠️ Warning: "${location.pathname}" might be an undefined route!`);
      }
    }
  }, [location.pathname, routes]);
  
  // This component doesn't render anything
  return null;
};

export default RouteLogger;
