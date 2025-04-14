import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/auth';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage';
import ErrorPage from './pages/ErrorPage';
import ArtistDashboard from './pages/dashboard/Artist';
import OwnerDashboard from './pages/dashboard/Owner';
import CustomerDashboard from './pages/dashboard/Customer';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ServicesPage from './pages/ServicesPage';
import ArtistsPage from './pages/ArtistsPage';
import CheckoutPage from './pages/CheckoutPage';
import SupportPage from './pages/SupportPage';
import { BookingProvider } from '@/context/booking/BookingProvider';
import { NotificationProvider } from '@/context/notification';
import { BookingNotificationProvider } from '@/components/BookingNotificationProvider';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <BookingProvider>
          <Router>
            <AuthProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
                <Route path="/auth/signin" element={<PublicLayout><SignInPage /></PublicLayout>} />
                <Route path="/auth/signup" element={<PublicLayout><SignUpPage /></PublicLayout>} />
                <Route path="/pricing" element={<PublicLayout><PricingPage /></PublicLayout>} />
                <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
                <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
                <Route path="/terms" element={<PublicLayout><TermsPage /></PublicLayout>} />
                <Route path="/privacy" element={<PublicLayout><PrivacyPage /></PublicLayout>} />
                <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
                <Route path="/artists" element={<PublicLayout><ArtistsPage /></PublicLayout>} />
                <Route path="/support" element={<PublicLayout><SupportPage /></PublicLayout>} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedLayout><DashboardPage /></ProtectedLayout>} />
                <Route path="/profile" element={<ProtectedLayout><ProfilePage /></ProtectedLayout>} />
                <Route path="/booking" element={<ProtectedLayout><BookingPage /></ProtectedLayout>} />
                <Route path="/checkout" element={<ProtectedLayout><CheckoutPage /></ProtectedLayout>} />
                
                {/* Role-based Dashboards */}
                <Route path="/dashboard/artist" element={<ProtectedLayout><ArtistDashboard /></ProtectedLayout>} />
                <Route path="/dashboard/owner" element={<ProtectedLayout><OwnerDashboard /></ProtectedLayout>} />
                <Route path="/dashboard/customer" element={<ProtectedLayout><CustomerDashboard /></CustomerDashboard>} />
                
                {/* Error Route */}
                <Route path="*" element={<PublicLayout><ErrorPage /></PublicLayout>} />
              </Routes>
            </AuthProvider>
          </Router>
          <BookingNotificationProvider />
        </BookingProvider>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

export default App;
