
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/auth';
import { SubscriptionProvider } from '@/context/subscription';
import { Toaster } from '@/components/ui/sonner';
import AuthGuard from '@/components/auth/AuthGuard';
import ErrorBoundary from '@/components/ErrorBoundary';
import Layout from '@/components/layout/Layout';

// Page imports
import Index from '@/pages/Index';
import Jobs from '@/pages/Jobs';
import JobDetails from '@/pages/JobDetails';
import Artists from '@/pages/Artists';
import ArtistProfile from '@/pages/ArtistProfile';
import Contact from '@/pages/Contact';
import About from '@/pages/About';
import Pricing from '@/pages/Pricing';
import Community from '@/pages/Community';
import Auth from '@/pages/Auth';
import AuthCallback from '@/pages/AuthCallback';
import UserProfile from '@/components/profile/UserProfile';
import ProfileEditor from '@/pages/ProfileEditor';
import Bookings from '@/pages/Bookings';
import BookingDetails from '@/pages/BookingDetails';
import Success from '@/pages/Success';
import ProfileNotFound from '@/components/profile/ProfileNotFound';
import TermsOfService from '@/pages/TermsOfService';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Affiliate from '@/pages/Affiliate';
import PublicArtistProfile from '@/pages/PublicArtistProfile';

// Dashboard imports
import Artist from '@/pages/dashboard/Artist';
import Customer from '@/pages/dashboard/Customer';
import RoleDashboardLayout from '@/components/dashboard/RoleDashboardLayout';
import Supplier from '@/pages/dashboard/Supplier';
import Other from '@/pages/dashboard/Other';

// Artist dashboard sub-pages
import ArtistDashboard from '@/pages/dashboard/artist/ArtistDashboard';
import ArtistBookings from '@/pages/dashboard/artist/ArtistBookings';
import ArtistPortfolio from '@/pages/dashboard/artist/ArtistPortfolio';
import ArtistServices from '@/pages/dashboard/artist/ArtistServices';
import ArtistCredits from '@/pages/dashboard/artist/ArtistCredits';
import ArtistProfile from '@/pages/dashboard/artist/ArtistProfile';
import ArtistSettings from '@/pages/dashboard/artist/ArtistSettings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SubscriptionProvider>
          <ErrorBoundary>
            <Router>
              <div className="min-h-screen bg-background">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Layout><Index /></Layout>} />
                  <Route path="/jobs" element={<Layout><Jobs /></Layout>} />
                  <Route path="/jobs/:id" element={<Layout><JobDetails /></Layout>} />
                  <Route path="/artists" element={<Layout><Artists /></Layout>} />
                  <Route path="/artists/:id" element={<Layout><ArtistProfile /></Layout>} />
                  <Route path="/contact" element={<Layout><Contact /></Layout>} />
                  <Route path="/about" element={<Layout><About /></Layout>} />
                  <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
                  <Route path="/community" element={<Layout><Community /></Layout>} />
                  <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
                  <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
                  <Route path="/affiliate" element={<Layout><Affiliate /></Layout>} />

                  {/* Auth routes */}
                  <Route path="/auth/*" element={<Auth />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />

                  {/* Protected routes */}
                  <Route path="/profile" element={<AuthGuard><Layout><UserProfile /></Layout></AuthGuard>} />
                  <Route path="/profile/edit" element={<AuthGuard><Layout><ProfileEditor /></Layout></AuthGuard>} />
                  <Route path="/profile/:id" element={<Layout><PublicArtistProfile /></Layout>} />
                  <Route path="/bookings" element={<AuthGuard><Layout><Bookings /></Layout></AuthGuard>} />
                  <Route path="/bookings/:id" element={<AuthGuard><Layout><BookingDetails /></Layout></AuthGuard>} />
                  <Route path="/success" element={<AuthGuard><Layout><Success /></Layout></AuthGuard>} />

                  {/* Dashboard routes */}
                  <Route path="/dashboard/artist" element={<AuthGuard><Artist /></AuthGuard>} />
                  <Route path="/dashboard/customer" element={<AuthGuard><Customer /></AuthGuard>} />
                  <Route path="/dashboard/owner" element={<AuthGuard><RoleDashboardLayout /></AuthGuard>} />
                  <Route path="/dashboard/supplier" element={<AuthGuard><Supplier /></AuthGuard>} />
                  <Route path="/dashboard/other" element={<AuthGuard><Other /></AuthGuard>} />

                  {/* Artist dashboard sub-routes */}
                  <Route path="/dashboard/artist/overview" element={<AuthGuard><ArtistDashboard /></AuthGuard>} />
                  <Route path="/dashboard/artist/bookings" element={<AuthGuard><ArtistBookings /></AuthGuard>} />
                  <Route path="/dashboard/artist/portfolio" element={<AuthGuard><ArtistPortfolio /></AuthGuard>} />
                  <Route path="/dashboard/artist/services" element={<AuthGuard><ArtistServices /></AuthGuard>} />
                  <Route path="/dashboard/artist/credits" element={<AuthGuard><ArtistCredits /></AuthGuard>} />
                  <Route path="/dashboard/artist/profile" element={<AuthGuard><ArtistProfile /></AuthGuard>} />
                  <Route path="/dashboard/artist/settings" element={<AuthGuard><ArtistSettings /></AuthGuard>} />

                  {/* Fallback routes */}
                  <Route path="/dashboard" element={<Navigate to="/dashboard/artist" replace />} />
                  <Route path="/profile-not-found" element={<Layout><ProfileNotFound /></Layout>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Toaster />
              </div>
            </Router>
          </ErrorBoundary>
        </SubscriptionProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
