
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

function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <GlobalErrorBoundary>
      <ReliableAuthProvider>
        <SalonProvider>
          <SubscriptionProvider>
            <NotificationProvider>
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <Routes>
                  {routes.map((route, index) => (
                    <Route 
                      key={index}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                  <Route path="/dashboard/artist/booking-calendar" element={<BookingCalendar />} />
                  <Route path="/dashboard/artist/inbox" element={<ArtistInbox />} />
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
