
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logRouteAccess } from "@/utils/routeChecker";

/**
 * RouteLogger - Component that logs route changes to the console
 * Must be used within a Router context
 */
const RouteLogger = () => {
  const location = useLocation();

  useEffect(() => {
    // Log the route change
    logRouteAccess(location.pathname);
    console.log(`Route changed to: ${location.pathname}`);
  }, [location]);

  // This component doesn't render anything
  return null;
};

export default RouteLogger;
