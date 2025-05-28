import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/auth';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Salons from './pages/Salons';
import Jobs from './pages/Jobs';
import Artists from './pages/Artists';
import Opportunities from './pages/Opportunities';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import SalonDetails from './pages/SalonDetails';
import JobDetails from './pages/JobDetails';
import ArtistDetails from './pages/ArtistDetails';
import Profile from './pages/Profile';
import PostJob from './pages/PostJob';
import PostSalon from './pages/PostSalon';
import Messages from './pages/Messages';
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
              <Route path="/salons" element={<Salons />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/salon/:id" element={<SalonDetails />} />
              <Route path="/job/:id" element={<JobDetails />} />
              <Route path="/artist/:id" element={<ArtistDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/post-salon" element={<PostSalon />} />
              <Route path="/messages" element={<Messages />} />
              
              {/* Add salon listing success route */}
              <Route path="/salon-listing-success" element={<SalonListingSuccess />} />
              
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
