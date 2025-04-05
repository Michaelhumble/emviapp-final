
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { logRouteAccess } from "@/utils/routeChecker";

// Import our components
import LanguagePreference from "@/components/common/LanguagePreference";
import RouteLogger from "@/components/common/RouteLogger";

const App = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Log route changes
    console.info("Route changed to:", location.pathname);
    logRouteAccess(location.pathname);
    
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <>
      <Outlet />
      <RouteLogger />
      <Toaster />
      <LanguagePreference />
    </>
  );
};

export default App;
