import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from "./context/auth";
import { SubscriptionProvider } from "./context/subscription";
import { PricingProvider } from "./context/pricing/PricingProvider";
import { ToastContainer } from 'sonner';
import { GoogleAnalytics } from "./integrations/analytics/google-analytics";
import { ScrollToTop } from "./components/utils/ScrollToTop";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { SiteLayout } from "./layouts/SiteLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import PricingPage from "./pages/PricingPage";
import SignUpPage from "./pages/SignUpPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import PostJob from "./pages/PostJob";
import JobsPage from "./pages/JobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import SalonsPage from "./pages/SalonsPage";
import SalonDetailsPage from "./pages/SalonDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import ArtistProfilePage from "./pages/ArtistProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import PostSuccessPage from "./pages/post-success";
import PostWaitlistPage from "./pages/post-waitlist";

function AppRouter() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <Router>
          <GoogleAnalytics />
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<SiteLayout><HomePage /></SiteLayout>} />
            <Route path="/login" element={<SiteLayout><LoginPage /></SiteLayout>} />
            <Route path="/logout" element={<SiteLayout><LogoutPage /></SiteLayout>} />
            <Route path="/pricing" element={<SiteLayout><PricingPage /></SiteLayout>} />
            <Route path="/signup" element={<SiteLayout><SignUpPage /></SiteLayout>} />
            <Route path="/contact" element={<SiteLayout><ContactPage /></SiteLayout>} />
            <Route path="/about" element={<SiteLayout><AboutPage /></SiteLayout>} />
            <Route path="/terms" element={<SiteLayout><TermsPage /></SiteLayout>} />
            <Route path="/privacy" element={<SiteLayout><PrivacyPage /></SiteLayout>} />
            <Route path="/jobs" element={<SiteLayout><JobsPage /></SiteLayout>} />
            <Route path="/jobs/:jobId" element={<SiteLayout><JobDetailsPage /></SiteLayout>} />
            <Route path="/salons" element={<SiteLayout><SalonsPage /></SiteLayout>} />
            <Route path="/salons/:salonId" element={<SiteLayout><SalonDetailsPage /></SiteLayout>} />
            
            {/* Artist Profile (Public) */}
            <Route path="/artists/:artistId" element={<SiteLayout><ArtistProfilePage /></SiteLayout>} />
            
            {/* Protected Routes (Require Authentication) */}
            <Route path="/dashboard" element={<DashboardLayout><ProtectedRoute><DashboardPage /></ProtectedRoute></DashboardLayout>} />
            <Route path="/profile" element={<DashboardLayout><ProtectedRoute><ProfilePage /></ProtectedRoute></DashboardLayout>} />
            <Route path="/profile/edit" element={<DashboardLayout><ProtectedRoute><EditProfilePage /></ProtectedRoute></DashboardLayout>} />
            
            {/* Protected Routes (Require Authentication + Subscription) */}
            <Route path="/checkout" element={<DashboardLayout><ProtectedRoute><CheckoutPage /></ProtectedRoute></DashboardLayout>} />
            <Route path="/post-job" element={<DashboardLayout><ProtectedRoute><PostJob /></ProtectedRoute></DashboardLayout>} />
            
            {/* Add these new routes for post success and waitlist */}
            <Route path="/post-success" element={<PostSuccessPage />} />
            <Route path="/post-waitlist" element={<PostWaitlistPage />} />

            {/* Not Found Route */}
            <Route path="*" element={<SiteLayout><NotFoundPage /></SiteLayout>} />
          </Routes>
          <ToastContainer />
        </Router>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default AppRouter;
