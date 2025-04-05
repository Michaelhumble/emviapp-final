
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface RouteLoggerProps {
  availableRoutes: string[];
}

const RouteLogger = ({ availableRoutes }: RouteLoggerProps) => {
  const location = useLocation();

  useEffect(() => {
    console.log(`Route changed to: ${location.pathname}`);
    console.log(`Available routes: ${availableRoutes.join(', ')}`);
  }, [location, availableRoutes]);

  return null;
};

export default RouteLogger;
