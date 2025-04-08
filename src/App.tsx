
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { logRouteAccess } from "@/utils/routeChecker";
import { AuthProvider } from "./context/auth";
import { ProfileProvider } from "./context/profile";
import { SubscriptionProvider } from "./context/subscription";
import { NotificationProvider } from "./context/notification";
import { BookingNotificationProvider } from "@/components/BookingNotificationProvider";

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
          <NotificationProvider>
            <BookingNotificationProvider />
            <Outlet />
            <RouteLogger />
            <LanguagePreference />
            <Toaster position="top-right" />
          </NotificationProvider>
        </ProfileProvider>
      </SubscriptionProvider>
    </AuthProvider>
  );
};

export default App;
