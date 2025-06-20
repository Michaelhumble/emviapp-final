
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { NotificationProvider } from '@/context/notification/NotificationProvider';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Artists from '@/pages/Artists';
import ArtistProfile from '@/pages/ArtistProfile';
import Jobs from '@/pages/Jobs';
import JobListing from '@/pages/JobListing';
import Salons from '@/pages/Salons';
import SalonProfile from '@/pages/SalonProfile';
import Community from '@/pages/Community';
import Analytics from '@/pages/Analytics';
import UserProfile from '@/components/profile/UserProfile';
import ProfileEditor from '@/pages/ProfileEditor';
import ProfileForm from '@/components/profile/ProfileForm';
import SupplierProfile from '@/pages/SupplierProfile';
import AuthGuard from '@/components/auth/AuthGuard';
import { AuthRedirect } from '@/components/auth/AuthRedirect';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Onboarding from '@/pages/Onboarding';
import RoleDashboardLayout from '@/components/dashboard/RoleDashboardLayout';
import DashboardRedirector from '@/components/dashboard/DashboardRedirector';
import NotFound from '@/pages/NotFound';
import ProfileNotFound from '@/components/profile/ProfileNotFound';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <NotificationProvider>
      <div className="App">
        <Routes>
          {/* Auth routes */}
          <Route path="/auth/signin" element={<AuthRedirect><SignIn /></AuthRedirect>} />
          <Route path="/auth/signup" element={<AuthRedirect><SignUp /></AuthRedirect>} />
          <Route path="/onboarding" element={<AuthGuard><Onboarding /></AuthGuard>} />

          {/* Public routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/artists" element={<Layout><Artists /></Layout>} />
          <Route path="/artist/:id" element={<Layout><ArtistProfile /></Layout>} />
          <Route path="/jobs" element={<Layout><Jobs /></Layout>} />
          <Route path="/job/:id" element={<Layout><JobListing /></Layout>} />
          <Route path="/salons" element={<Layout><Salons /></Layout>} />
          <Route path="/salon/:id" element={<Layout><SalonProfile /></Layout>} />
          <Route path="/community" element={<Layout><Community /></Layout>} />
          <Route path="/supplier/:id" element={<Layout><SupplierProfile /></Layout>} />

          {/* Protected routes */}
          <Route path="/analytics" element={<AuthGuard><Layout><Analytics /></Layout></AuthGuard>} />
          <Route path="/profile" element={<AuthGuard><Layout><UserProfile /></Layout></AuthGuard>} />
          <Route path="/profile/:id" element={<Layout><UserProfile /></Layout>} />
          <Route path="/profile-not-found" element={<Layout><ProfileNotFound /></Layout>} />
          <Route path="/profile/edit" element={<AuthGuard><Layout><ProfileEditor /></Layout></AuthGuard>} />
          <Route path="/profile/form" element={<AuthGuard><Layout><ProfileForm /></Layout></AuthGuard>} />

          {/* Dashboard routes */}
          <Route path="/dashboard" element={<AuthGuard><DashboardRedirector /></AuthGuard>} />
          <Route path="/dashboard/artist" element={<AuthGuard><RoleDashboardLayout role="artist"><div /></RoleDashboardLayout></AuthGuard>} />
          <Route path="/dashboard/salon" element={<AuthGuard><RoleDashboardLayout role="salon"><div /></RoleDashboardLayout></AuthGuard>} />
          <Route path="/dashboard/owner" element={<AuthGuard><RoleDashboardLayout role="salon"><div /></RoleDashboardLayout></AuthGuard>} />
          <Route path="/dashboard/customer" element={<AuthGuard><RoleDashboardLayout role="customer"><div /></RoleDashboardLayout></AuthGuard>} />
          <Route path="/dashboard/freelancer" element={<AuthGuard><RoleDashboardLayout role="freelancer"><div /></RoleDashboardLayout></AuthGuard>} />
          <Route path="/dashboard/supplier" element={<AuthGuard><RoleDashboardLayout role="supplier"><div /></RoleDashboardLayout></AuthGuard>} />
          <Route path="/dashboard/manager" element={<AuthGuard><RoleDashboardLayout role="manager"><div /></RoleDashboardLayout></AuthGuard>} />

          {/* Fallback routes */}
          <Route path="/404" element={<Layout><NotFound /></Layout>} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <Toaster />
      </div>
    </NotificationProvider>
  );
}

export default App;
