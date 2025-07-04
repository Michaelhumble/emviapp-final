
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import AuthGuard from '@/components/auth/AuthGuard';

// Lazy load pages
const Home = lazy(() => import('./pages/Index'));
const Jobs = lazy(() => import('./pages/Jobs'));
const Artists = lazy(() => import('./pages/Artists'));
const Salons = lazy(() => import('./pages/salons/StableSalonPage'));
const About = lazy(() => import('./pages/About.routes'));
const Contact = lazy(() => import('./pages/Contact'));
const PostJob = lazy(() => import('./pages/PostJob'));
const SellSalon = lazy(() => import('./pages/sell-salon/index'));
const Auth = lazy(() => import('./pages/auth/SignIn'));
const Dashboard = lazy(() => import('./pages/dashboard/index'));
const Profile = lazy(() => import('./pages/Profile'));
const Freelancers = lazy(() => import('./pages/dashboard/Freelancer'));
const Pricing = lazy(() => import('./pages/pricing/index'));

// Dashboard pages
const ArtistDashboard = lazy(() => import('./pages/dashboard/Artist'));
const CustomerDashboard = lazy(() => import('./pages/dashboard/Customer'));
const OwnerDashboard = lazy(() => import('./pages/dashboard/owner'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout><div /></Layout>}>
          <Route index element={<Home />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="artists" element={<Artists />} />
          <Route path="salons" element={<Salons />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="sell-salon" element={<SellSalon />} />
          <Route path="auth/:mode" element={<Auth />} />
          <Route path="freelancers" element={<Freelancers />} />
          <Route path="pricing" element={<Pricing />} />
          
          {/* Protected routes */}
          <Route path="dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
          <Route path="dashboard/artist" element={<AuthGuard><ArtistDashboard /></AuthGuard>} />
          <Route path="dashboard/customer" element={<AuthGuard><CustomerDashboard /></AuthGuard>} />
          <Route path="dashboard/owner" element={<AuthGuard><OwnerDashboard /></AuthGuard>} />
          <Route path="profile" element={<AuthGuard><Profile /></AuthGuard>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
