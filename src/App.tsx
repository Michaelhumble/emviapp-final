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
import AppErrorBoundary from '@/components/error-handling/AppErrorBoundary';
import SimpleLoadingFallback from '@/components/error-handling/SimpleLoadingFallback';
import RouteLogger from '@/components/common/RouteLogger';
import StableSalonPage from "@/pages/salons/StableSalonPage";
import Layout from "@/components/layout/Layout";
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
import PostJobBillion from "@/pages/PostJobBillion";
import PostJobExperimental from "@/pages/PostJobExperimental";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import EnhancedPostJob from "@/pages/enhanced-post-job";
import SellSalonPage from "@/pages/sell-salon";
import PostSalon from "@/pages/PostSalon";
import SalonListingSuccessPage from "@/pages/salon-listing-success";
import CustomerProfilePage from "@/pages/customer/ProfilePage";

function App() {
  const location = useLocation();

  useEffect(() => {
    try {
      console.log('App component mounted');
      // Scroll to top on route change
      window.scrollTo(0, 0);
      
      // Log route for debugging
      console.log('Current route:', location.pathname);
    } catch (error) {
      console.error('Error in App useEffect:', error);
    }
  }, [location.pathname]);

  try {
    console.log('App component rendering');
    
    return (
      <AppErrorBoundary>
        <HelmetProvider>
          <GeneralErrorBoundary>
            <AuthProvider>
              <SalonProvider>
                <SubscriptionProvider>
                  <NotificationProvider>
                    <RouteLogger />
                    <Suspense fallback={<SimpleLoadingFallback message="Loading application..." />}>
                      <Routes>
                        {/* Auth routes */}
                        <Route path="/login" element={<SignIn />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/register" element={<SignUp />} />
                        
                        {/* Customer Profile route */}
                        <Route path="/profile" element={<CustomerProfilePage />} />
                        
                        {/* Job posting routes - USE ENHANCED VERSION */}
                        <Route path="/post-job" element={<EnhancedPostJob />} />
                        <Route path="/post-job-billion" element={<PostJobBillion />} />
                        <Route path="/post-job-experimental" element={<PostJobExperimental />} />
                        
                        {/* Salon selling routes */}
                        <Route path="/sell-salon" element={<SellSalonPage />} />
                        <Route path="/posting/salon" element={<Layout><PostSalon /></Layout>} />
                        
                        {/* Salon listing success route */}
                        <Route path="/salon-listing-success" element={<Layout><SalonListingSuccessPage /></Layout>} />
                        
                        {/* Payment routes */}
                        <Route path="/checkout" element={<CheckoutFallback />} />
                        <Route path="/post-success" element={<PostSuccess />} />
                        <Route path="/post-canceled" element={<PostCanceled />} />
                        
                        {/* Other pages */}
                        <Route path="/salons" element={<Layout><StableSalonPage /></Layout>} />
                        <Route path="/jobs" element={<Layout><Jobs /></Layout>} />
                        <Route path="/about" element={<Layout><About /></Layout>} />
                        <Route path="/contact" element={<Layout><Contact /></Layout>} />
                        <Route path="/terms" element={<Layout><Terms /></Layout>} />
                        <Route path="/refund" element={<Layout><Refund /></Layout>} />
                        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
                        <Route path="/cookies" element={<Layout><Cookies /></Layout>} />
                        
                        {routes.map((route, index) => {
                          // Skip routes that are already defined above
                          const skipRoutes = ["/salons", "/jobs", "/about", "/contact", "/terms", "/refund", "/privacy", "/cookies", "/post-job", "/sell-salon", "/salon-listing-success", "/profile"];
                          if (skipRoutes.includes(route.path)) {
                            return null;
                          }
                          
                          return (
                            <Route 
                              key={index}
                              path={route.path}
                              element={<Layout>{route.element}</Layout>}
                            />
                          );
                        })}
                        <Route path="/dashboard/artist/booking-calendar" element={<Layout><BookingCalendar /></Layout>} />
                        <Route path="/dashboard/artist/inbox" element={<Layout><ArtistInbox /></Layout>} />
                      </Routes>
                    </Suspense>
                    <Toaster />
                  </NotificationProvider>
                </SubscriptionProvider>
              </SalonProvider>
            </AuthProvider>
          </GeneralErrorBoundary>
        </HelmetProvider>
      </AppErrorBoundary>
    );
  } catch (error) {
    console.error('Critical error in App component:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-6">
          <h1 className="text-2xl font-bold text-red-800 mb-4">Critical Application Error</h1>
          <p className="text-red-600 mb-4">The application failed to initialize.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}

export default App;
