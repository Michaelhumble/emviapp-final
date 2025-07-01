import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/auth';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LanguageProvider } from '@/context/LanguageContext';
import { TooltipProvider } from '@/components/ui/tooltip';

// Pages
import Home from '@/pages/Home';
import Community from '@/pages/Community';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import Dashboard from '@/pages/Dashboard';
import PostJob from '@/pages/PostJob';
import Jobs from '@/pages/Jobs';
import JobDetails from '@/pages/JobDetails';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Artists from '@/pages/Artists';
import ArtistProfile from '@/pages/ArtistProfile';
import Salons from '@/pages/Salons';
import SalonProfile from '@/pages/SalonProfile';
import SellSalon from '@/pages/SellSalon';
import FreelancerDashboard from '@/pages/dashboard/Freelancer';

// Protected Route Component
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <AuthProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/jobs/:id" element={<JobDetails />} />
                  <Route path="/artists" element={<Artists />} />
                  <Route path="/artists/:id" element={<ArtistProfile />} />
                  <Route path="/salons" element={<Salons />} />
                  <Route path="/salons/:id" element={<SalonProfile />} />
                  <Route path="/sell-salon" element={<SellSalon />} />
                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/freelancer-dashboard" element={
                    <ProtectedRoute>
                      <FreelancerDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/post-job" element={
                    <ProtectedRoute>
                      <PostJob />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                </Routes>
              </div>
            </Router>
            <Toaster />
          </AuthProvider>
        </TooltipProvider>
      </LanguageProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
