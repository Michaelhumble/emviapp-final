import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductionRouteGuard from '@/components/routing/ProductionRouteGuard';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

// Lazy load components for better performance
const Index = lazy(() => import('@/pages/Index'));
const Artists = lazy(() => import('@/pages/Artists'));
const BookingServices = lazy(() => import('@/pages/BookingServices'));
const SalonsPageRedesigned = lazy(() => import('@/pages/salons/SalonsPageRedesigned'));
const Dashboard = lazy(() => import('@/pages/dashboard'));
const ArtistDashboard = lazy(() => import('@/pages/dashboard/Artist'));
const CustomerDashboard = lazy(() => import('@/pages/dashboard/Customer'));
const SalonDashboard = lazy(() => import('@/pages/dashboard/Salon'));
const Community = lazy(() => import('@/pages/Community'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const SignIn = lazy(() => import('@/pages/auth/SignIn'));
const SignUp = lazy(() => import('@/pages/auth/SignUp'));

// Loading component for Suspense
const PageLoading = () => (
  <div className="min-h-screen bg-gray-50 p-4">
    <div className="max-w-7xl mx-auto">
      <div className="h-16 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LoadingSkeleton count={6} />
      </div>
    </div>
  </div>
);

const ProductionRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/booking-services" element={<BookingServices />} />
        <Route path="/salons" element={<SalonsPageRedesigned />} />
        <Route path="/community" element={<Community />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Authentication routes */}
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProductionRouteGuard requiresAuth>
              <Dashboard />
            </ProductionRouteGuard>
          }
        />
        <Route
          path="/dashboard/artist"
          element={
            <ProductionRouteGuard requiresAuth requiresRole="artist">
              <ArtistDashboard />
            </ProductionRouteGuard>
          }
        />
        <Route
          path="/dashboard/customer"
          element={
            <ProductionRouteGuard requiresAuth requiresRole="customer">
              <CustomerDashboard />
            </ProductionRouteGuard>
          }
        />
        <Route
          path="/dashboard/salon"
          element={
            <ProductionRouteGuard requiresAuth requiresRole="salon_owner">
              <SalonDashboard />
            </ProductionRouteGuard>
          }
        />

        {/* Legacy redirects */}
        {/* <Route path="/jobs" element={<Navigate to="/booking-services" replace />} /> */}
        <Route path="/salon-owners" element={<Navigate to="/salons" replace />} />
        <Route path="/customers" element={<Navigate to="/booking-services" replace />} />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default ProductionRoutes;