
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A component that logs route changes for debugging purposes
 */
const RouteLogger = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Log the current route for debugging
    console.log(`Route changed: ${location.pathname}`);
    
    // Check for query parameters
    if (location.search) {
      console.log(`Query params: ${location.search}`);
    }
    
    // Check for hash
    if (location.hash) {
      console.log(`Hash: ${location.hash}`);
    }
  }, [location]);
  
  // This component doesn't render anything
  return null;
};

export default RouteLogger;
