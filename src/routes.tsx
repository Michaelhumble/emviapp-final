
import { lazy, Suspense } from 'react';
import Loading from '@/components/Loading';

// Main Pages
import HomePage from './pages/Home';
import Salons from './pages/Salons';
import Error404 from './pages/404';

// Lazy loaded pages for better performance
const SalonDetail = lazy(() => import('./pages/salons/[id]'));
const Jobs = lazy(() => import('./pages/Jobs'));
const ArtistApplications = lazy(() => import('./pages/ArtistApplications'));
const Pricing = lazy(() => import('./pages/pricing'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const ArtistDashboard = lazy(() => import('./pages/dashboard/artist'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/legal/TermsOfService'));
const AuthLayout = lazy(() => import('./pages/auth/AuthLayout'));

// Wrapper for lazy loaded components
const LazyWrapper = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

// Route definitions
const routes = [
  {
    path: '/',
    element: <HomePage />,
    exact: true
  },
  {
    path: '/salons',
    element: <Salons />
  },
  {
    path: '/salons/:id',
    element: LazyWrapper(SalonDetail)
  },
  {
    path: '/jobs',
    element: LazyWrapper(Jobs)
  },
  {
    path: '/applications',
    element: LazyWrapper(ArtistApplications)
  },
  {
    path: '/pricing',
    element: LazyWrapper(Pricing)
  },
  {
    path: '/dashboard',
    element: LazyWrapper(Dashboard)
  },
  {
    path: '/dashboard/artist',
    element: LazyWrapper(ArtistDashboard)
  },
  {
    path: '/contact',
    element: LazyWrapper(Contact)
  },
  {
    path: '/privacy',
    element: LazyWrapper(PrivacyPolicy)
  },
  {
    path: '/terms',
    element: LazyWrapper(TermsOfService)
  },
  {
    path: '/auth/*',
    element: LazyWrapper(AuthLayout)
  },
  {
    path: '*',
    element: <Error404 />
  }
];

export default routes;
