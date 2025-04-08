
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { logRouteAccess } from "@/utils/routeChecker";
import { AuthProvider } from "./context/auth";
import { ProfileProvider } from "./context/profile";
import { SubscriptionProvider } from "./context/subscription";

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
    <AuthProvider>
      <SubscriptionProvider>
        <ProfileProvider>
          <div className="flex flex-col min-h-screen overflow-hidden">
            <Outlet />
            <RouteLogger />
            <LanguagePreference />
          </div>
        </ProfileProvider>
      </SubscriptionProvider>
    </AuthProvider>
  );
};

export default App;
