
import { Outlet } from "react-router-dom";
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
  // Note: Removing useLocation hook that was causing the issue
  // The RouteLogger component will handle route logging internally
  
  useEffect(() => {
    // Log initial app load
    console.info("App initialized");
    
    // Scroll to top on initial load
    window.scrollTo(0, 0);
  }, []);
  
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
