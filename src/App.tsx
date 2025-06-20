
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from *.tsx';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/auth';
import { NotificationProvider } from '@/context/notification';
import { GoogleMapsProvider } from '@/context/maps/GoogleMapsContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProfileProvider } from '@/context/profile';
import { SubscriptionProvider } from '@/context/subscription';
import { SalonProvider } from '@/context/salon';
import { PricingProvider } from '@/context/pricing/PricingProvider';

// Import all pages
import Home from '@/pages/Home';
import Artists from '@/pages/Artists';
import Jobs from '@/pages/Jobs';
import Salons from '@/pages/Salons';
import Profile from '@/pages/Profile';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import PostJob from '@/pages/PostJob';
import PostSalon from '@/pages/PostSalon';
import Dashboard from '@/pages/Dashboard';
import UserProfile from '@/pages/UserProfile';
import ArtistProfile from '@/pages/ArtistProfile';
import SalonDetail from '@/pages/SalonDetail';
import SimpleSalonDetailPage from '@/pages/salons/SimpleSalonDetailPage';
import SellSalon from '@/pages/SellSalon';
import Pricing from '@/pages/Pricing';
import Community from '@/pages/Community';
import Explore from '@/pages/Explore';
import Messages from '@/pages/Messages';
import Notifications from '@/pages/Notifications';
import Marketplace from '@/pages/Marketplace';
import Layout from '@/components/layout/Layout';
import AuthGuard from '@/components/auth/AuthGuard';
import DashboardRedirector from '@/components/dashboard/DashboardRedirector';
import RoleDashboardLayout from '@/components/dashboard/RoleDashboardLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Router>
            <AuthProvider>
              <NotificationProvider>
                <ProfileProvider>
                  <SubscriptionProvider>
                    <SalonProvider>
                      <PricingProvider>
                        <GoogleMapsProvider>
                          <Routes>
                            <Route path="/" element={<Layout />}>
                              <Route index element={<Home />} />
                              <Route path="artists" element={<Artists />} />
                              <Route path="artists/:artistId" element={<ArtistProfile />} />
                              <Route path="jobs" element={<Jobs />} />
                              <Route path="salons" element={<Salons />} />
                              <Route path="salons/:salonId" element={<SalonDetail />} />
                              <Route path="salon/:salonId" element={<SimpleSalonDetailPage />} />
                              <Route path="sell-salon" element={<SellSalon />} />
                              <Route path="pricing" element={<Pricing />} />
                              <Route path="community" element={<Community />} />
                              <Route path="explore" element={<Explore />} />
                              <Route path="marketplace" element={<Marketplace />} />
                              <Route path="signin" element={<SignIn />} />
                              <Route path="signup" element={<SignUp />} />
                              <Route 
                                path="profile" 
                                element={
                                  <AuthGuard>
                                    <Profile />
                                  </AuthGuard>
                                } 
                              />
                              <Route 
                                path="post-job" 
                                element={
                                  <AuthGuard>
                                    <PostJob />
                                  </AuthGuard>
                                } 
                              />
                              <Route 
                                path="post-salon" 
                                element={
                                  <AuthGuard>
                                    <PostSalon />
                                  </AuthGuard>
                                } 
                              />
                              <Route 
                                path="messages" 
                                element={
                                  <AuthGuard>
                                    <Messages />
                                  </AuthGuard>
                                } 
                              />
                              <Route 
                                path="notifications" 
                                element={
                                  <AuthGuard>
                                    <Notifications />
                                  </AuthGuard>
                                } 
                              />
                              <Route path="user/:userId" element={<UserProfile />} />
                              
                              {/* Dashboard Routes */}
                              <Route 
                                path="dashboard" 
                                element={
                                  <AuthGuard>
                                    <DashboardRedirector />
                                  </AuthGuard>
                                } 
                              />
                              <Route 
                                path="dashboard/artist" 
                                element={
                                  <AuthGuard>
                                    <Dashboard />
                                  </AuthGuard>
                                } 
                              />
                              <Route 
                                path="dashboard/customer" 
                                element={
                                  <AuthGuard>
                                    <Dashboard />
                                  </AuthGuard>
                                } 
                              />
                              <Route 
                                path="dashboard/freelancer" 
                                element={
                                  <AuthGuard>
                                    <Dashboard />
                                  </AuthGuard>
                                } 
                              />
                              <Route 
                                path="dashboard/supplier" 
                                element={
                                  <AuthGuard>
                                    <Dashboard />
                                  </AuthGuard>
                                } 
                              />
                              <Route 
                                path="dashboard/manager" 
                                element={
                                  <AuthGuard>
                                    <Dashboard />
                                  </AuthGuard>
                                } 
                              />
                              <Route 
                                path="dashboard/owner" 
                                element={
                                  <AuthGuard>
                                    <RoleDashboardLayout role="salon" />
                                  </AuthGuard>
                                } 
                              />
                            </Route>
                          </Routes>
                          <Toaster />
                        </GoogleMapsProvider>
                      </PricingProvider>
                    </SalonProvider>
                  </SubscriptionProvider>
                </ProfileProvider>
              </NotificationProvider>
            </AuthProvider>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
