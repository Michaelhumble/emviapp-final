
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
// import Home from '@/pages/Home';
import Artists from '@/pages/Artists';
// import Salons from '@/pages/Salons';
import Jobs from '@/pages/Jobs';
// import Community from '@/pages/Community';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
// import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
// import EditProfile from '@/pages/EditProfile';
// import ArtistProfilePage from '@/pages/ArtistProfile';
// import SalonProfilePage from '@/pages/SalonProfile';
import PostJob from '@/pages/PostJob';
// import JobDetails from '@/pages/JobDetails';
// import SalonDetails from '@/pages/SalonDetails';
import AuthGuard from '@/components/auth/AuthGuard';
import { useAuth } from '@/context/auth';
import ArtistDashboard from '@/components/dashboard/artist/ArtistDashboard';
import CustomerDashboard from '@/components/dashboard/customer/CustomerDashboard';
import SalonOwnerDashboard from '@/components/dashboard/salon/SalonOwnerDashboard';
import SalonDashboardPage from '@/pages/dashboard/Salon';

const AppRoutes = () => {
  const { isSignedIn } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<div className="p-8 text-center"><h1 className="text-4xl font-bold">Welcome to EmviApp</h1><p className="mt-4">Home page under construction</p></div>} />
      <Route path="/artists" element={<Artists />} />
      <Route path="/salons" element={<div className="p-8 text-center"><h1 className="text-4xl font-bold">Salons</h1><p className="mt-4">Salons page under construction</p></div>} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/community" element={<div className="p-8 text-center"><h1 className="text-4xl font-bold">Community</h1><p className="mt-4">Community page under construction</p></div>} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Auth Routes */}
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      
      {/* Profile Routes */}
      <Route path="/artist/:id" element={<div className="p-8 text-center"><h1 className="text-4xl font-bold">Artist Profile</h1><p className="mt-4">Artist profile page under construction</p></div>} />
      <Route path="/salon/:id" element={<div className="p-8 text-center"><h1 className="text-4xl font-bold">Salon Profile</h1><p className="mt-4">Salon profile page under construction</p></div>} />
      <Route path="/job/:id" element={<div className="p-8 text-center"><h1 className="text-4xl font-bold">Job Details</h1><p className="mt-4">Job details page under construction</p></div>} />
      <Route path="/salon-details/:id" element={<div className="p-8 text-center"><h1 className="text-4xl font-bold">Salon Details</h1><p className="mt-4">Salon details page under construction</p></div>} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <AuthGuard>
          <div className="p-8 text-center"><h1 className="text-4xl font-bold">Dashboard</h1><p className="mt-4">Main dashboard under construction</p></div>
        </AuthGuard>
      } />
      
      {/* Specific Dashboard Routes */}
      <Route path="/dashboard/artist" element={
        <AuthGuard>
          <Layout>
            <ArtistDashboard />
          </Layout>
        </AuthGuard>
      } />
      
      <Route path="/dashboard/customer" element={
        <AuthGuard>
          <Layout>
            <CustomerDashboard />
          </Layout>
        </AuthGuard>
      } />
      
      <Route path="/dashboard/salon" element={
        <AuthGuard>
          <SalonDashboardPage />
        </AuthGuard>
      } />
      
      <Route path="/dashboard/owner" element={
        <AuthGuard>
          <Layout>
            <SalonOwnerDashboard />
          </Layout>
        </AuthGuard>
      } />
      
      <Route path="/profile" element={
        <AuthGuard>
          <Profile />
        </AuthGuard>
      } />
      
      <Route path="/profile/edit" element={
        <AuthGuard>
          <div className="p-8 text-center"><h1 className="text-4xl font-bold">Edit Profile</h1><p className="mt-4">Edit profile page under construction</p></div>
        </AuthGuard>
      } />
      
      <Route path="/post-job" element={
        <AuthGuard>
          <PostJob />
        </AuthGuard>
      } />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
