
import React from 'react';
// First import the core components that don't depend on others
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import ErrorLayout from './components/layout/ErrorLayout';

// Simple page components with minimal dependencies
import Index from './pages/Index';
import Welcome from './pages/Welcome';
import Artists from './pages/Artists';
import JobsPage from './pages/jobs';
import Customers from './pages/Customers';
import Suppliers from './pages/Suppliers';
import Freelancers from './pages/Freelancers';
import Settings from './pages/Settings';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Profile from './pages/Profile';

// Import salon related pages
import SalonsPage from './pages/salons/SalonsFinal';
import SellSalon from './pages/salons/SellSalon';
import SalonOwners from './pages/SalonOwners';
import SalonDetail from './pages/salons/SalonDetail';

// Import profile related pages
import ProfileEditor from './pages/profile/ProfileEditor';
import UserProfilePage from './pages/profile/UserProfilePage';
import ProfileRedirect from './pages/profile/ProfileRedirect';

// Define the main dashboard component separately to avoid circular reference
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// Import role-specific dashboard pages using lazy loading
const ArtistDashboard = React.lazy(() => import('./pages/dashboard/Artist'));
const CustomerDashboard = React.lazy(() => import('./pages/dashboard/Customer'));
const SalonDashboard = React.lazy(() => import('./pages/dashboard/Salon'));
const OwnerDashboard = React.lazy(() => import('./pages/dashboard/Owner'));
const FreelancerDashboard = React.lazy(() => import('./pages/dashboard/Freelancer'));
const SupplierDashboard = React.lazy(() => import('./pages/dashboard/Supplier'));
const OtherDashboard = React.lazy(() => import('./pages/dashboard/Other'));

// Create a loading component for lazy-loaded routes
const LazyLoadingComponent = () => (
  <ErrorLayout>
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  </ErrorLayout>
);

// Define all routes
const routes = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/welcome',
    element: <Welcome />,
  },
  {
    path: '/artists',
    element: <Artists />,
  },
  {
    path: '/jobs',
    element: <JobsPage />,
  },
  {
    path: '/salons',
    element: <SalonsPage />,
  },
  {
    path: '/salons/:id',
    element: <SalonDetail />,
  },
  {
    path: '/sell-salon',
    element: <SellSalon />,
  },
  {
    path: '/salon-owners',
    element: <SalonOwners />,
  },
  {
    path: '/customers',
    element: <Customers />,
  },
  {
    path: '/suppliers',
    element: <Suppliers />,
  },
  {
    path: '/freelancers',
    element: <Freelancers />,
  },
  {
    path: '/dashboard',
    element: (
      <React.Suspense fallback={<LazyLoadingComponent />}>
        <Dashboard />
      </React.Suspense>
    ),
  },
  {
    path: '/dashboard/artist',
    element: (
      <React.Suspense fallback={<LazyLoadingComponent />}>
        <ArtistDashboard />
      </React.Suspense>
    ),
  },
  {
    path: '/dashboard/customer',
    element: (
      <React.Suspense fallback={<LazyLoadingComponent />}>
        <CustomerDashboard />
      </React.Suspense>
    ),
  },
  {
    path: '/dashboard/salon',
    element: (
      <React.Suspense fallback={<LazyLoadingComponent />}>
        <SalonDashboard />
      </React.Suspense>
    ),
  },
  {
    path: '/dashboard/owner',
    element: (
      <React.Suspense fallback={<LazyLoadingComponent />}>
        <OwnerDashboard />
      </React.Suspense>
    ),
  },
  {
    path: '/dashboard/freelancer',
    element: (
      <React.Suspense fallback={<LazyLoadingComponent />}>
        <FreelancerDashboard />
      </React.Suspense>
    ),
  },
  {
    path: '/dashboard/supplier',
    element: (
      <React.Suspense fallback={<LazyLoadingComponent />}>
        <SupplierDashboard />
      </React.Suspense>
    ),
  },
  {
    path: '/dashboard/other',
    element: (
      <React.Suspense fallback={<LazyLoadingComponent />}>
        <OtherDashboard />
      </React.Suspense>
    ),
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/profile/view',
    element: <UserProfilePage />,
  },
  {
    path: '/profile/redirect',
    element: <ProfileRedirect />,
  },
  {
    path: '/profile/edit',
    element: <ProfileEditor />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/auth/signin',
    element: <SignIn />,
  },
  {
    path: '/auth/signup',
    element: <SignUp />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
