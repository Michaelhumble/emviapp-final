
import React, { useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/context/auth';
import { SalonProvider } from '@/context/salon';
import { SubscriptionProvider } from '@/context/subscription';
import { NotificationProvider } from '@/context/notification';
import routes from './routes';
import BookingCalendar from "@/pages/dashboard/artist/BookingCalendar";
import ArtistInbox from "@/pages/dashboard/artist/Inbox";
import { Toaster } from "@/components/ui/toaster";
import GeneralErrorBoundary from '@/components/error-handling/GeneralErrorBoundary';
import SimpleLoadingFallback from '@/components/error-handling/SimpleLoadingFallback';
import RouteLogger from '@/components/common/RouteLogger';
import StableSalonPage from "@/pages/salons/StableSalonPage";
import StableJobsPage from "@/pages/jobs/StableJobsPage";
import { logRouteAccess } from '@/utils/routeChecker';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Log route for debugging using consolidated logger
    logRouteAccess(location.pathname);
    
    // Log for asset path debugging in production
    if (!import.meta.env.DEV) {
      console.info(`📍 Route accessed: ${location.pathname}`);
    }
  }, [location.pathname]);

  return (
    <GeneralErrorBoundary>
      <AuthProvider>
        <SalonProvider>
          <SubscriptionProvider>
            <NotificationProvider>
              <RouteLogger />
              <Suspense fallback={<SimpleLoadingFallback message="Loading application..." />}>
                <Routes>
                  {/* Explicitly define stable page routes */}
                  <Route path="/salons" element={<StableSalonPage />} />
                  <Route path="/jobs" element={<StableJobsPage />} />
                  
                  {/* Keep existing routes */}
                  {routes.map((route, index) => (
                    (route.path !== "/salons" && route.path !== "/jobs") && (
                      <Route 
                        key={index}
                        path={route.path}
                        element={route.element}
                      />
                    )
                  ))}
                  <Route path="/dashboard/artist/booking-calendar" element={<BookingCalendar />} />
                  <Route path="/dashboard/artist/inbox" element={<ArtistInbox />} />
                </Routes>
              </Suspense>
              <Toaster />
            </NotificationProvider>
          </SubscriptionProvider>
        </SalonProvider>
      </AuthProvider>
    </GeneralErrorBoundary>
  );
}

export default App;
