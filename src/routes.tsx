
import { lazy } from 'react';
import Dashboard from './pages/dashboard/Dashboard';

// Use lazy loading for routes to improve initial load time
const Index = lazy(() => import('./pages/Index'));
const Login = lazy(() => import('./pages/auth/Login'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const ArtistDashboard = lazy(() => import('./pages/dashboard/artist/ArtistDashboardPage'));
const CustomerDashboard = lazy(() => import('./pages/dashboard/customer/CustomerDashboard'));
const OwnerDashboard = lazy(() => import('./pages/dashboard/owner/OwnerDashboard'));
const FreelancerDashboard = lazy(() => import('./pages/dashboard/freelancer/FreelancerDashboard'));
const SupplierDashboard = lazy(() => import('./pages/dashboard/supplier/SupplierDashboard'));
const OtherDashboard = lazy(() => import('./pages/dashboard/other/OtherDashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Jobs = lazy(() => import('./pages/jobs/Jobs'));
const JobDetails = lazy(() => import('./pages/jobs/JobDetails'));
const JobPublish = lazy(() => import('./pages/jobs/JobPublish'));
const Artists = lazy(() => import('./pages/artists/Artists'));
const ArtistProfile = lazy(() => import('./pages/artists/ArtistProfile'));
const SalonProfile = lazy(() => import('./pages/salons/SalonProfile'));

// Define all routes
const routes = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/auth/signup',
    element: <SignUp />,
  },
  {
    path: '/auth/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/auth/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/dashboard/artist',
    element: <ArtistDashboard />,
  },
  {
    path: '/dashboard/customer',
    element: <CustomerDashboard />,
  },
  {
    path: '/dashboard/owner',
    element: <OwnerDashboard />,
  },
  {
    path: '/dashboard/freelancer',
    element: <FreelancerDashboard />,
  },
  {
    path: '/dashboard/supplier',
    element: <SupplierDashboard />,
  },
  {
    path: '/dashboard/other',
    element: <OtherDashboard />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '/jobs/:id',
    element: <JobDetails />,
  },
  {
    path: '/jobs/publish',
    element: <JobPublish />,
  },
  {
    path: '/artists',
    element: <Artists />,
  },
  {
    path: '/artists/:id',
    element: <ArtistProfile />,
  },
  {
    path: '/salons/:id',
    element: <SalonProfile />,
  },
  // Add a wildcard route for 404
  {
    path: '*',
    element: <div>Page not found</div>,
  },
];

export default routes;
