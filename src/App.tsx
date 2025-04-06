import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';
import { useAuth } from './context/auth';
import { AuthProvider } from './context/auth/AuthProvider';
import { LandingPage } from './pages/LandingPage';
import Pricing from './pages/Pricing';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import FAQs from './pages/FAQs';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Jobs from './pages/Jobs';
import PostJob from './pages/PostJob';
import Salons from './pages/Salons';
import Resources from './pages/Resources';
import Dashboard from './pages/Dashboard';
import ArtistDashboardPage from './pages/dashboard/Artist';
import OwnerDashboardPage from './pages/dashboard/Owner';
import AdminDashboardPage from './pages/dashboard/Admin';
import JobPost from './pages/posting/JobPost';
import SalonPost from './pages/posting/SalonPost';
import Portfolio from './pages/Portfolio';
import CreateJobPage from './pages/jobs/create';

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="emvi-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Static Pages */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />

            {/* Authentication */}
            <Route path="/auth">
              <Route index element={<Auth />} />
              <Route path=":type" element={<Auth />} />
            </Route>

            {/* User Profile and Editing */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />

            {/* Jobs */}
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/post/job" element={<JobPost />} />

            {/* Salons */}
            <Route path="/salons" element={<Salons />} />
            <Route path="/post/salon" element={<SalonPost />} />

            {/* Portfolio */}
            <Route path="/portfolio" element={<Portfolio />} />

            {/* Resources */}
            <Route path="/resources" element={<Resources />} />

            {/* Dashboard */}
            <Route path="/dashboard">
              <Route index element={<Dashboard />} />
              <Route path="artist" element={<ArtistDashboardPage />} />
              <Route path="owner" element={<OwnerDashboardPage />} />
              <Route path="admin" element={<AdminDashboardPage />} />
            </Route>

            {/* Jobs Routes */}
            <Route path="/jobs">
              <Route index element={<Jobs />} />
              <Route path="create" element={<CreateJobPage />} />
            </Route>

            {/* Catch-all route for 404 Not Found */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
