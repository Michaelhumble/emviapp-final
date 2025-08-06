import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductionRouteGuard from '@/components/routing/ProductionRouteGuard';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

// Lazy load components for better performance
const Index = lazy(() => import('@/pages/Index'));
const Artists = lazy(() => import('@/pages/Artists'));
const BookingServices = lazy(() => import('@/pages/BookingServices'));
const Jobs = lazy(() => import('@/pages/Jobs'));
const SalonsPageRedesigned = lazy(() => import('@/pages/salons/SalonsPageRedesigned'));
const Dashboard = lazy(() => import('@/pages/dashboard'));
const ProfileDashboard = lazy(() => import('@/pages/dashboard/Profile'));
const ArtistDashboard = lazy(() => import('@/pages/dashboard/Artist'));
const CustomerDashboard = lazy(() => import('@/pages/dashboard/Customer'));
const SalonDashboard = lazy(() => import('@/pages/dashboard/Salon'));
const Community = lazy(() => import('@/pages/Community'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const SignIn = lazy(() => import('@/pages/auth/SignIn'));
const SignUp = lazy(() => import('@/pages/auth/SignUp'));
const PerformanceAudit = lazy(() => import('@/pages/PerformanceAudit'));

// Optimized loading component for faster initial render
const PageLoading = () => (
  <div className="min-h-screen bg-background p-4">
    <div className="max-w-7xl mx-auto">
      <div className="h-12 bg-muted rounded-lg mb-4 animate-pulse"></div>
      <div className="space-y-4">
        <div className="h-8 bg-muted rounded animate-pulse w-1/3"></div>
        <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
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
        <Route path="/jobs/*" element={<Jobs />} />
        <Route path="/salons" element={<SalonsPageRedesigned />} />
        <Route path="/community" element={<Community />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Authentication routes */}
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        
        {/* Performance audit route */}
        <Route path="/performance-audit" element={<PerformanceAudit />} />

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
          path="/dashboard/profile"
          element={
            <ProductionRouteGuard requiresAuth>
              <ProfileDashboard />
            </ProductionRouteGuard>
          }
        />
        <Route
          path="/dashboard/artist"
          element={
            <ProductionRouteGuard requiresAuth requiresRole="artist">
              <ProfileDashboard />
            </ProductionRouteGuard>
          }
        />
        <Route
          path="/dashboard/freelancer"
          element={
            <ProductionRouteGuard requiresAuth>
              <ProfileDashboard />
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
        <Route path="/salon-owners" element={<Navigate to="/salons" replace />} />
        <Route path="/customers" element={<Navigate to="/booking-services" replace />} />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default ProductionRoutes;