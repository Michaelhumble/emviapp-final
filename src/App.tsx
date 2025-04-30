import React, { useEffect, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/auth';
import { SalonProvider } from '@/context/salon';
import { SubscriptionProvider } from '@/context/subscription';
import { NotificationProvider } from '@/context/notification';
import routes from './routes';
import { Toaster } from "@/components/ui/toaster";
import GeneralErrorBoundary from '@/components/error-handling/GeneralErrorBoundary';
import SimpleLoadingFallback from '@/components/error-handling/SimpleLoadingFallback';
import RouteLogger from '@/components/common/RouteLogger';
import { getRedirectPath } from '@/utils/routeRedirector';
import StableSalonPage from "@/pages/salons/StableSalonPage";
import BookingCalendar from "@/pages/dashboard/artist/BookingCalendar";
import ArtistInbox from "@/pages/dashboard/artist/Inbox";
import SalonDetailPage from "@/pages/salons/SalonDetailPage";
import OpportunityDetailPage from "@/pages/opportunities/OpportunityDetailPage";

// Simple component to handle route redirects
const RouteRedirector = () => {
  const location = useLocation();
  const redirectPath = getRedirectPath(location.pathname);
  
  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }
  
  return null;
};

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
      <AuthProvider>
        <SalonProvider>
          <SubscriptionProvider>
            <NotificationProvider>
              <RouteLogger />
              <RouteRedirector />
              <Suspense fallback={<SimpleLoadingFallback message="Loading application..." />}>
                <Routes>
                  {/* Explicitly define the /salons route to use StableSalonPage which includes SalonsFinal */}
                  <Route path="/salons" element={<StableSalonPage />} />
                  
                  {/* Add explicit route for salon details */}
                  <Route path="/salons/:id" element={<SalonDetailPage />} />
                  
                  {/* Add explicit route for opportunity details */}
                  <Route path="/opportunities/:id" element={<OpportunityDetailPage />} />
                  
                  {/* Redirect old routes to new ones */}
                  <Route path="/posting/*" element={<Navigate to="/create-listing" replace />} />
                  <Route path="/post/job" element={<Navigate to="/create-listing" replace />} />
                  <Route path="/post/salon" element={<Navigate to="/create-listing" replace />} />
                  
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
