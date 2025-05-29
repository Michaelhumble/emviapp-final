
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/auth';
import BookingNotificationProvider from '@/components/BookingNotificationProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import PostJob from './pages/PostJob';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Salons from './pages/Salons';
import SalonDetail from './pages/SalonDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import PostSuccess from './pages/PostSuccess';
import PostCanceled from './pages/PostCanceled';
import EnhancedPostJob from './pages/enhanced-post-job';
import SellSalonPage from './pages/sell-salon';
import SalonListingSuccessPage from '@/pages/salon-listing-success';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BookingNotificationProvider>
            <Router>
              <Helmet>
                <title>EmviApp - Beauty Professional Network</title>
                <meta name="description" content="Connect with beauty professionals, find jobs, and grow your career in the beauty industry." />
              </Helmet>
              
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/post-job" element={<PostJob />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/salons" element={<Salons />} />
                <Route path="/salons/:id" element={<SalonDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/post-success" element={<PostSuccess />} />
                <Route path="/post-canceled" element={<PostCanceled />} />
                <Route path="/enhanced-post-job" element={<EnhancedPostJob />} />
                <Route path="/sell-salon" element={<SellSalonPage />} />
                <Route path="/salon-listing-success" element={<SalonListingSuccessPage />} />
              </Routes>
              
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'white',
                    color: 'black',
                    border: '1px solid #e5e7eb',
                  },
                }}
              />
            </Router>
          </BookingNotificationProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
