
import React from 'react';

// Import pages with error handling
const Index = React.lazy(() => import('./pages/Index'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const Customer = React.lazy(() => import('./pages/dashboard/Customer'));
const Artist = React.lazy(() => import('./pages/dashboard/Artist'));
const Salon = React.lazy(() => import('./pages/dashboard/Salon'));
const Freelancer = React.lazy(() => import('./pages/dashboard/Freelancer'));
const Supplier = React.lazy(() => import('./pages/dashboard/Supplier'));
const Manager = React.lazy(() => import('./pages/dashboard/Manager'));

const routes = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/dashboard/customer',
    element: <Customer />,
  },
  {
    path: '/dashboard/artist',
    element: <Artist />,
  },
  {
    path: '/dashboard/salon',
    element: <Salon />,
  },
  {
    path: '/dashboard/freelancer',
    element: <Freelancer />,
  },
  {
    path: '/dashboard/supplier',
    element: <Supplier />,
  },
  {
    path: '/dashboard/manager',
    element: <Manager />,
  },
];

export default routes;
