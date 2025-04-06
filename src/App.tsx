import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './context/auth/AuthProvider';
import { ProfileProvider } from './context/profile';
import { SubscriptionProvider } from './context/subscription';
import Index from './pages/Index';
import Jobs from './pages/Jobs';
import Salons from './pages/Salons';
import JobPost from './pages/posting/JobPost';
import SalonPost from './pages/posting/SalonPost';
import CreateJobPage from './pages/jobs/create';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Profile from './pages/Profile';
import ProfileEdit from './pages/profile/edit';
import UserProfileByUsername from './pages/profile/[username]';
import UserProfilePage from './pages/profile/UserProfilePage';
import Dashboard from './pages/dashboard/Dashboard';
import CustomerDashboard from './pages/dashboard/Customer';
import SalonDashboard from './pages/dashboard/Salon';
import ArtistDashboard from './pages/dashboard/Artist';
import SupplierDashboard from './pages/dashboard/Supplier';
import FreelancerDashboard from './pages/dashboard/Freelancer';
import OwnerDashboard from './pages/dashboard/Owner';
import OtherDashboard from './pages/dashboard/Other';
import NotFound from './pages/NotFound';
import SalonMarketplace from './pages/SalonMarketplace';
import Analysis from './pages/Analysis';
import Checkout from './pages/Checkout';
import Messaging from './pages/Messaging';
import ProfileNotFound from './components/profile/ProfileNotFound';
import SalonNotFound from './components/salon/SalonNotFound';
import MessageNotFound from './components/messaging/MessageNotFound';
import ProfileRedirect from './components/profile/ProfileRedirect';

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="emvi-theme">
      <AuthProvider>
        <SubscriptionProvider>
          <ProfileProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />

                {/* Jobs */}
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/post/job" element={<JobPost />} />
                <Route path="/post/salon" element={<SalonPost />} />

                {/* Jobs Routes */}
                <Route path="/jobs">
                  <Route index element={<Jobs />} />
                  <Route path="create" element={<CreateJobPage />} />
                </Route>

                {/* Salons */}
                <Route path="/salons" element={<Salons />} />
                <Route 
                  path="/salon/:id" 
                  element={<SalonMarketplace />} 
                  errorElement={<SalonNotFound />} 
                />

                {/* Auth */}
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />

                {/* Profile */}
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/profile/edit" element={<ProfileEdit />} />
                <Route 
                  path="/profile/:username" 
                  element={<UserProfileByUsername />} 
                  errorElement={<ProfileNotFound />} 
                />
                <Route path="/redirect/profile" element={<ProfileRedirect />} />

                {/* Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/customer" element={<CustomerDashboard />} />
                <Route path="/dashboard/salon" element={<SalonDashboard />} />
                <Route path="/dashboard/artist" element={<ArtistDashboard />} />
                <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
                <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
                <Route path="/dashboard/owner" element={<OwnerDashboard />} />
                <Route path="/dashboard/other" element={<OtherDashboard />} />

                {/* Other pages */}
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route 
                  path="/messages" 
                  element={<Messaging />} 
                  errorElement={<MessageNotFound />} 
                />
                <Route 
                  path="/messages/:id" 
                  element={<Messaging />} 
                  errorElement={<MessageNotFound />} 
                />

                {/* Catch-all route for 404 Not Found */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
            <Toaster />
          </ProfileProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
