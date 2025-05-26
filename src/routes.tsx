
import React from 'react';
import Dashboard from '@/pages/Dashboard';
import HomePage from '@/pages/HomePage';
import Jobs from '@/pages/Jobs';
import JobDetail from '@/pages/JobDetail';
import ArtistProfile from '@/pages/ArtistProfile';
import SalonDetail from '@/pages/SalonDetail';
import BookingConfirmation from '@/pages/BookingConfirmation';
import BookingSuccess from '@/pages/BookingSuccess';
import Contact from '@/pages/Contact';
import About from '@/pages/About';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Refund from '@/pages/Refund';
import Cookies from '@/pages/Cookies';

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '/jobs/:id',
    element: <JobDetail />,
  },
  {
    path: '/artist/:id',
    element: <ArtistProfile />,
  },
  {
    path: '/salon/:id',
    element: <SalonDetail />,
  },
  {
    path: '/booking/:artistId/confirm',
    element: <BookingConfirmation />,
  },
  {
    path: '/booking/success',
    element: <BookingSuccess />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
  {
    path: '/refund',
    element: <Refund />,
  },
  {
    path: '/cookies',
    element: <Cookies />,
  },
];

export default routes;
