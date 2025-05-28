
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/auth';
import Home from './pages/Home';
import Dashboard from './pages/dashboard';
import Jobs from './pages/Jobs';
import Artists from './pages/Artists';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Profile from './pages/Profile';
import PostJob from './pages/PostJob';
import PostSalon from './pages/PostSalon';
import SalonListingSuccess from './pages/SalonListingSuccess';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <Toaster />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/post-salon" element={<PostSalon />} />
              <Route path="/salon-listing-success" element={<SalonListingSuccess />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
