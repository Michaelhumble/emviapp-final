
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Artists from '@/pages/Artists';
import Salons from '@/pages/Salons';
import Jobs from '@/pages/Jobs';
import Community from '@/pages/Community';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import EditProfile from '@/pages/EditProfile';
import ArtistProfilePage from '@/pages/ArtistProfile';
import SalonProfilePage from '@/pages/SalonProfile';
import PostJob from '@/pages/PostJob';
import JobDetails from '@/pages/JobDetails';
import SalonDetails from '@/pages/SalonDetails';
import AuthGuard from '@/components/auth/AuthGuard';
import { useAuth } from '@/context/auth';
import ArtistDashboard from '@/components/dashboard/artist/ArtistDashboard';
import CustomerDashboard from '@/components/dashboard/customer/CustomerDashboard';
import SalonOwnerDashboard from '@/components/dashboard/salon/SalonOwnerDashboard';

const AppRoutes = () => {
  const { isSignedIn } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/artists" element={<Artists />} />
      <Route path="/salons" element={<Salons />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/community" element={<Community />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Auth Routes */}
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      
      {/* Profile Routes */}
      <Route path="/artist/:id" element={<ArtistProfilePage />} />
      <Route path="/salon/:id" element={<SalonProfilePage />} />
      <Route path="/job/:id" element={<JobDetails />} />
      <Route path="/salon-details/:id" element={<SalonDetails />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <AuthGuard>
          <Dashboard />
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
          <Layout>
            <SalonOwnerDashboard />
          </Layout>
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
          <EditProfile />
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
