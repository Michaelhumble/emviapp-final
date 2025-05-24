import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '@/context/auth';
import { BookingNotificationProvider } from '@/context/bookingNotification';
import AppModifier from '@/App-Modifier';
import Home from '@/pages/Home';
import Pricing from '@/pages/Pricing';
import Salons from '@/pages/Salons';
import Artists from '@/pages/Artists';
import Jobs from '@/pages/Jobs';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import EditProfile from '@/pages/EditProfile';
import JobPost from '@/pages/posting/JobPost';
import SalonPost from '@/pages/posting/SalonPost';
import JobDetails from '@/pages/JobDetails';
import SalonDetails from '@/pages/SalonDetails';
import ArtistDetails from '@/pages/ArtistDetails';
import Messages from '@/pages/Messages';
import Settings from '@/pages/Settings';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import TermsOfService from '@/pages/TermsOfService';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Contact from '@/pages/Contact';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';
import PostSuccess from '@/pages/PostSuccess';

function App() {
  const queryClient = new QueryClient();
  
  return (
    <BrowserRouter>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppModifier />
            <BookingNotificationProvider>
              <div className="min-h-screen bg-background">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/salons" element={<Salons />} />
                  <Route path="/artists" element={<Artists />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/post-job" element={<JobPost />} />
                  <Route path="/post-salon" element={<SalonPost />} />
                  <Route path="/job/:id" element={<JobDetails />} />
                  <Route path="/salon/:id" element={<SalonDetails />} />
                  <Route path="/artist/:id" element={<ArtistDetails />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/post-success" element={<PostSuccess />} />
                </Routes>
              </div>
            </BookingNotificationProvider>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
