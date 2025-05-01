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

// Opportunity pages
import OpportunityDetailPage from "@/pages/opportunity/OpportunityDetailPage";
import OpportunityNotFound from "@/pages/opportunity/OpportunityNotFound";
import SalonNotFound from '@/components/salon/SalonNotFound';
import NotFound from '@/pages/NotFound';
import ListingRouteGuard from '@/components/common/ListingRouteGuard';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Log route for debugging using consolidated logger
    logRouteAccess(location.pathname);
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
                  
                  {/* Explicitly define error pages */}
                  <Route path="/not-found" element={<NotFound />} />
                  <Route path="/salon-not-found" element={<SalonNotFound />} />
                  <Route path="/opportunity-not-found" element={<OpportunityNotFound />} />
                  
                  {/* Define opportunity routes with proper guards */}
                  <Route 
                    path="/opportunities/:id" 
                    element={
                      <ListingRouteGuard
                        listingType="opportunity"
                        loadingComponent={<SimpleLoadingFallback message="Loading opportunity..." />}
                      >
                        <OpportunityDetailPage />
                      </ListingRouteGuard>
                    }
                  />
                  
                  <Route 
                    path="/jobs/:id" 
                    element={
                      <ListingRouteGuard
                        listingType="job"
                        loadingComponent={<SimpleLoadingFallback message="Loading job..." />}
                      >
                        <OpportunityDetailPage />
                      </ListingRouteGuard>
                    }
                  />
                  
                  <Route 
                    path="/salon/:id" 
                    element={
                      <ListingRouteGuard
                        listingType="salon"
                        loadingComponent={<SimpleLoadingFallback message="Loading salon..." />}
                      >
                        <OpportunityDetailPage />
                      </ListingRouteGuard>
                    }
                  />
                  
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
                  
                  {/* Catch-all route for 404 errors */}
                  <Route path="*" element={<NotFound />} />
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
