
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
import Layout from "@/components/layout/Layout";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Log route for debugging
    console.log('Current route:', location.pathname);
  }, [location.pathname]);

  return (
    <GeneralErrorBoundary>
      {/* Single, root-level AuthProvider that wraps the entire app */}
      <AuthProvider>
        <SalonProvider>
          <SubscriptionProvider>
            <NotificationProvider>
              <RouteLogger />
              <Suspense fallback={<SimpleLoadingFallback message="Loading application..." />}>
                <Routes>
                  {/* Explicitly define the /salons route to use StableSalonPage */}
                  <Route path="/salons" element={<StableSalonPage />} />
                  
                  {/* Keep existing routes */}
                  {routes.map((route, index) => (
                    route.path !== "/salons" && (
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
