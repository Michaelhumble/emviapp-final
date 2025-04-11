
import React from 'react';
// Import all page components
import Index from './pages/Index';
import Welcome from './pages/Welcome';
import NotFound from './pages/NotFound';
import Artists from './pages/Artists';
import JobsPage from './pages/jobs';
import SalonsPage from './pages/salons/SalonsFinal';
import SellSalon from './pages/salons/SellSalon';
import Customers from './pages/Customers';
import Suppliers from './pages/Suppliers';
import Freelancers from './pages/Freelancers';
import Dashboard from './pages/dashboard';
import ArtistDashboard from './pages/dashboard/Artist';
import CustomerDashboard from './pages/dashboard/Customer';
import SalonDashboard from './pages/dashboard/Salon';
import OwnerDashboard from './pages/dashboard/Owner';
import FreelancerDashboard from './pages/dashboard/Freelancer';
import SupplierDashboard from './pages/dashboard/Supplier';
import OtherDashboard from './pages/dashboard/Other';
import ProfileEditor from './pages/profile/ProfileEditor';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import UserProfilePage from './pages/profile/UserProfilePage';
import SalonOwners from './pages/SalonOwners';
import Settings from './pages/Settings';
import SalonDetail from './pages/salons/SalonDetail';
import ProfileRedirect from './pages/profile/ProfileRedirect';
import Profile from './pages/Profile';

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
    path: '/dashboard/salon',
    element: <SalonDashboard />,
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
