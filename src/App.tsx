import React, { useEffect, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import SalonsPageRedesigned from "@/pages/salons/SalonsPageRedesigned";
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
import NewSignUp from "@/pages/auth/NewSignUp";
import EnhancedPostJob from "@/pages/enhanced-post-job";
import SellSalonPage from "@/pages/sell-salon";
import PostSalon from "@/pages/PostSalon";
import SalonListingSuccessPage from "@/pages/salon-listing-success";
import CustomerProfilePage from "@/pages/customer/ProfilePage";
import JobPostingSuccessPage from "@/pages/JobPostingSuccessPage";
import InviteAcceptance from "@/pages/InviteAcceptance";

import NailJobSuccessPage from "@/pages/nails-job-success";

// Industry Pages
import NailsPage from "@/pages/nails";
import HairPage from "@/pages/hair";
import BarberPage from "@/pages/barber";
import MassagePage from "@/pages/massage";
import SkincarePage from "@/pages/skincare";
import MakeupPage from "@/pages/makeup";
import BrowsLashesPage from "@/pages/brows-lashes";
import TattooPage from "@/pages/tattoo";

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
                    
                    {/* Auth routes - USE NEW SIGN UP */}
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<NewSignUp />} />
                    <Route path="/register" element={<NewSignUp />} />
                    
                    {/* Customer Profile route */}
                    <Route path="/profile" element={<CustomerProfilePage />} />
                    
                    {/* Job posting routes - USE ENHANCED VERSION */}
                    <Route path="/post-job" element={<EnhancedPostJob />} />
                    <Route path="/post-job/nails" element={<EnhancedPostJob />} />
                    <Route path="/post-job-billion" element={<PostJobBillion />} />
                    <Route path="/post-job-experimental" element={<PostJobExperimental />} />
                    
                     {/* Salon selling routes */}
                     <Route path="/sell-salon" element={<SellSalonPage />} />
                     <Route path="/posting/salon" element={<Layout><PostSalon /></Layout>} />
                     
                     {/* Salon listing success routes */}
                     <Route path="/salon-listing-success" element={<Layout><SalonListingSuccessPage /></Layout>} />
                     <Route path="/salon-success" element={<Layout><SalonListingSuccessPage /></Layout>} />
                    
                    {/* Payment routes */}
                    <Route path="/checkout" element={<CheckoutFallback />} />
                    <Route path="/post-success" element={<PostSuccess />} />
                    <Route path="/post-canceled" element={<PostCanceled />} />
                    
                    {/* Job posting success route */}
                    <Route path="/job-posted-success" element={<JobPostingSuccessPage />} />
                    <Route path="/nails-job-success" element={<NailJobSuccessPage />} />
                    
                    {/* Other pages */}
                    <Route path="/salons" element={<Layout><SalonsPageRedesigned /></Layout>} />
                    <Route path="/jobs" element={<Layout><Jobs /></Layout>} />
                    
                    {/* Industry Pages */}
                    <Route path="/nails" element={<Layout><NailsPage /></Layout>} />
                    <Route path="/hair" element={<Layout><HairPage /></Layout>} />
                    <Route path="/barber" element={<Layout><BarberPage /></Layout>} />
                    <Route path="/massage" element={<Layout><MassagePage /></Layout>} />
                    <Route path="/skincare" element={<Layout><SkincarePage /></Layout>} />
                    <Route path="/makeup" element={<Layout><MakeupPage /></Layout>} />
                    <Route path="/brows-lashes" element={<Layout><BrowsLashesPage /></Layout>} />
                    <Route path="/tattoo" element={<Layout><TattooPage /></Layout>} />
                    
                    <Route path="/about" element={<Layout><About /></Layout>} />
                    <Route path="/contact" element={<Layout><Contact /></Layout>} />
                    <Route path="/terms" element={<Layout><Terms /></Layout>} />
                    <Route path="/refund" element={<Layout><Refund /></Layout>} />
                    <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
                    <Route path="/cookies" element={<Layout><Cookies /></Layout>} />
                    
                    {/* ... keep existing code (other routes) the same */}
                    {routes.map((route, index) => (
                      (route.path !== "/salons" && route.path !== "/jobs" && route.path !== "/about" && 
                       route.path !== "/contact" && route.path !== "/terms" && route.path !== "/refund" &&
                       route.path !== "/privacy" && route.path !== "/cookies" && route.path !== "/post-job" &&
                       route.path !== "/sell-salon" && route.path !== "/salon-listing-success" && route.path !== "/profile") && (
                        <Route 
                          key={index}
                          path={route.path}
                          element={<Layout>{route.element}</Layout>}
                        />
                      )
                    ))}
                    <Route path="/dashboard/artist/booking-calendar" element={<Layout><BookingCalendar /></Layout>} />
                    <Route path="/dashboard/artist/inbox" element={<Layout><ArtistInbox /></Layout>} />
                    
                    {/* Team Invite Routes */}
                    <Route path="/invite/:inviteCode" element={<InviteAcceptance />} />
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
