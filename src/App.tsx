import React, { useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/context/auth';
import { SalonProvider } from '@/context/salon';
import { SubscriptionProvider } from '@/context/subscription';
import { NotificationProvider } from '@/context/notification';
import { HelmetProvider } from 'react-helmet-async';
import routes from './routes';
import BookingCalendar from "@/pages/dashboard/artist/BookingCalendar";
import ArtistInbox from "@/pages/dashboard/artist/Inbox";
import { Toaster } from "@/components/ui/toaster";
import GeneralErrorBoundary from '@/components/error-handling/GeneralErrorBoundary';
import SimpleLoadingFallback from '@/components/error-handling/SimpleLoadingFallback';
import RouteLogger from '@/components/common/RouteLogger';
import StableSalonPage from "@/pages/salons/StableSalonPage";
import Layout from "@/components/layout/Layout";
import JobPost from "@/pages/posting/JobPost";
import Jobs from "@/pages/Jobs";
import About from "@/pages/About"; 
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import Refund from "@/pages/Refund";
import Privacy from "@/pages/Privacy";
import Cookies from "@/pages/Cookies";
import CheckoutFallback from "@/pages/CheckoutFallback";
import PostSuccess from "@/pages/post-success";
import PostCanceled from "@/pages/post-canceled";
import MobileBottomNavBar from '@/components/layout/MobileBottomNavBar';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Log route for debugging
    console.log('Current route:', location.pathname);
  }, [location.pathname]);

  return (
    <HelmetProvider>
      <GeneralErrorBoundary>
        <AuthProvider>
          <SalonProvider>
            <SubscriptionProvider>
              <NotificationProvider>
                <RouteLogger />
                <Suspense fallback={<SimpleLoadingFallback message="Loading application..." />}>
                  <Routes>
                    {/* Add our custom fallback for the checkout route */}
                    <Route path="/checkout" element={<CheckoutFallback />} />
                    
                    {/* Add post success and canceled page routes */}
                    <Route path="/post-success" element={<PostSuccess />} />
                    <Route path="/post-canceled" element={<PostCanceled />} />
                    
                    {/* Explicitly define the /salons route to use StableSalonPage */}
                    <Route path="/salons" element={<StableSalonPage />} />
                    
                    {/* Add our new job post route */}
                    <Route path="/post-job" element={
                      <Layout>
                        <JobPost />
                        <MobileBottomNavBar />
                      </Layout>
                    } />
                    
                    {/* Explicitly add the /jobs route to ensure it uses the correct component */}
                    <Route path="/jobs" element={<Jobs />} />
                    
                    {/* Add the new About page route */}
                    <Route path="/about" element={<About />} />
                    
                    {/* Add the new Contact page route */}
                    <Route path="/contact" element={<Contact />} />
                    
                    {/* Add the new Terms page route */}
                    <Route path="/terms" element={<Terms />} />
                    
                    {/* Add the new Refund page route */}
                    <Route path="/refund" element={<Refund />} />
                    
                    {/* Add the Privacy and Cookies page routes */}
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/cookies" element={<Cookies />} />
                    
                    {/* Keep existing routes */}
                    {routes.map((route, index) => (
                      (route.path !== "/salons" && route.path !== "/jobs" && route.path !== "/about" && 
                       route.path !== "/contact" && route.path !== "/terms" && route.path !== "/refund" &&
                       route.path !== "/privacy" && route.path !== "/cookies") && (
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
    </HelmetProvider>
  );
}

export default App;
