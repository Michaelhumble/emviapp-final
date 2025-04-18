import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AuthProvider } from '@/context/auth';
import { PostProvider } from '@/context/post';
import { LayoutProvider } from '@/context/layout';
import { DashboardProvider } from '@/context/dashboard';
import { SalonProvider } from '@/context/salon';
import { SubscriptionProvider } from '@/context/subscription';
import Home from '@/pages/Home';
import Salons from '@/pages/Salons';
import SalonDetails from '@/pages/SalonDetails';
import Jobs from '@/pages/Jobs';
import JobDetails from '@/pages/JobDetails';
import Profile from '@/pages/Profile';
import EditProfile from '@/pages/EditProfile';
import Dashboard from '@/pages/dashboard';
import CustomerDashboard from '@/pages/dashboard/CustomerDashboard';
import SalonDashboard from '@/pages/dashboard/SalonDashboard';
import ArtistDashboard from '@/pages/dashboard/ArtistDashboard';
import Auth from '@/pages/Auth';
import Pricing from '@/pages/Pricing';
import Checkout from '@/pages/Checkout';
import Post from '@/pages/Post';
import Explore from '@/pages/Explore';
import { VisibilityUpgrade, VisibilityStats } from '@/pages/visibility';
import PricingPage from './pages/pricing/PricingPage';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/salons" element={<Salons />} />
      <Route path="/salons/:id" element={<SalonDetails />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/customer" element={<CustomerDashboard />} />
      <Route path="/dashboard/salon" element={<SalonDashboard />} />
      <Route path="/dashboard/artist" element={<ArtistDashboard />} />
      <Route path="/auth/:type" element={<Auth />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/post/:type" element={<Post />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/visibility/upgrade" element={<VisibilityUpgrade />} />
      <Route path="/visibility/stats" element={<VisibilityStats />} />
      <Route path="/pricing" element={<PricingPage />} />
    </Routes>
  );
}

export default App;
