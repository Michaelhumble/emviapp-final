
import React, { useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ReliableAuthProvider } from '@/context/auth';
import { SalonProvider } from '@/context/salon';
import { SubscriptionProvider } from '@/context/subscription';
import { NotificationProvider } from '@/context/notification';
import GlobalErrorBoundary from '@/components/error-handling/GlobalErrorBoundary';
import routes from './routes';
import BookingCalendar from "@/pages/dashboard/artist/BookingCalendar";
import ArtistInbox from "@/pages/dashboard/artist/Inbox";
import { toast } from 'sonner';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Detect if the app is recovering from a crash
  useEffect(() => {
    const hasRecovered = sessionStorage.getItem('app_recovered');
    if (hasRecovered) {
      toast.info("Application successfully recovered", {
        description: "We've restored the app after encountering an issue.",
        duration: 3000,
      });
      sessionStorage.removeItem('app_recovered');
    }

    // Set up global error handler for unexpected errors
    const originalOnError = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      console.error("Global error caught:", {message, error});
      // Let the original handler run
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error);
      }
      return false;
    };

    return () => {
      window.onerror = originalOnError;
    };
  }, []);

  return (
    <GlobalErrorBoundary>
      <ReliableAuthProvider>
        <SalonProvider>
          <SubscriptionProvider>
            <NotificationProvider>
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              }>
                <Routes>
                  {routes.map((route, index) => (
                    <Route 
                      key={index}
                      path={route.path}
                      element={
                        <ErrorBoundary>
                          {route.element}
                        </ErrorBoundary>
                      }
                    />
                  ))}
                  <Route path="/dashboard/artist/booking-calendar" element={
                    <ErrorBoundary>
                      <BookingCalendar />
                    </ErrorBoundary>
                  } />
                  <Route path="/dashboard/artist/inbox" element={
                    <ErrorBoundary>
                      <ArtistInbox />
                    </ErrorBoundary>
                  } />
                </Routes>
              </Suspense>
            </NotificationProvider>
          </SubscriptionProvider>
        </SalonProvider>
      </ReliableAuthProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
