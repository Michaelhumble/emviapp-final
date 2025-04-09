
import React from 'react';
import Index from './pages/Index';
import Welcome from './pages/Welcome';
import NotFound from './pages/NotFound';
import Artists from './pages/Artists';
import Jobs from './pages/Jobs';
import SalonOwners from './pages/SalonOwners';
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
    element: <Jobs />,
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
    element: <ProfileEditor />,
  },
  {
    path: '/profile/edit',
    element: <ProfileEditor />,
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
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
