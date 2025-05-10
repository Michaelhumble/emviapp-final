import React, { Suspense, lazy, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useTranslation } from './hooks/useTranslation';
import AppLoader from './components/ui/app-loader';
import RouteLogger from './components/common/RouteLogger';

// Pages
const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/register'));
const ForgotPassword = lazy(() => import('./pages/forgot-password'));
const ResetPassword = lazy(() => import('./pages/reset-password'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const About = lazy(() => import('./pages/about'));
const Settings = lazy(() => import('./pages/settings'));
const Profile = lazy(() => import('./pages/profile'));
const FindJobs = lazy(() => import('./pages/jobs'));
const JobPage = lazy(() => import('./pages/jobs/id'));
const FindBooths = lazy(() => import('./pages/booths'));
const BoothPage = lazy(() => import('./pages/booths/id'));
const FindSalons = lazy(() => import('./pages/salons'));
const SalonPage = lazy(() => import('./pages/salons/id'));
const FindArtists = lazy(() => import('./pages/artists'));
const ArtistPage = lazy(() => import('./pages/artists/id'));
const PostJobPage = lazy(() => import('./pages/post-job/Index'));
const PostJobFormPage = lazy(() => import('./pages/post-job/form'));
const PostJobPricingPage = lazy(() => import('./pages/post-job/pricing'));
const PaymentSuccess = lazy(() => import('./pages/payment-success'));
const PaymentCanceled = lazy(() => import('./pages/payment-canceled'));
const PostSuccess = lazy(() => import('./pages/post-success'));
const PostingIndex = lazy(() => import('./pages/posting/Index'));

// Import your auth context provider
import { UserProvider } from './context/auth';
import { ThemeProvider } from './context/theme';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Load the language from localStorage
    const storedLanguage = localStorage.getItem('i18nextLng') || 'en';
    i18n.changeLanguage(storedLanguage);
  }, [i18n]);

  // Define your routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Suspense fallback={<AppLoader />}><Home /></Suspense>,
    },
    {
      path: "/login",
      element: <Suspense fallback={<AppLoader />}><Login /></Suspense>,
    },
    {
      path: "/register",
      element: <Suspense fallback={<AppLoader />}><Register /></Suspense>,
    },
    {
      path: "/forgot-password",
      element: <Suspense fallback={<AppLoader />}><ForgotPassword /></Suspense>,
    },
    {
      path: "/reset-password",
      element: <Suspense fallback={<AppLoader />}><ResetPassword /></Suspense>,
    },
    {
      path: "/dashboard",
      element: <Suspense fallback={<AppLoader />}><Dashboard /></Suspense>,
    },
    {
      path: "/about",
      element: <Suspense fallback={<AppLoader />}><About /></Suspense>,
    },
    {
      path: "/settings",
      element: <Suspense fallback={<AppLoader />}><Settings /></Suspense>,
    },
    {
      path: "/profile/:id",
      element: <Suspense fallback={<AppLoader />}><Profile /></Suspense>,
    },
    {
      path: "/jobs",
      element: <Suspense fallback={<AppLoader />}><FindJobs /></Suspense>,
    },
    {
      path: "/jobs/:id",
      element: <Suspense fallback={<AppLoader />}><JobPage /></Suspense>,
    },
    {
      path: "/booths",
      element: <Suspense fallback={<AppLoader />}><FindBooths /></Suspense>,
    },
    {
      path: "/booths/:id",
      element: <Suspense fallback={<AppLoader />}><BoothPage /></Suspense>,
    },
    {
      path: "/salons",
      element: <Suspense fallback={<AppLoader />}><FindSalons /></Suspense>,
    },
    {
      path: "/salons/:id",
      element: <Suspense fallback={<AppLoader />}><SalonPage /></Suspense>,
    },
    {
      path: "/artists",
      element: <Suspense fallback={<AppLoader />}><FindArtists /></Suspense>,
    },
    {
      path: "/artists/:id",
      element: <Suspense fallback={<AppLoader />}><ArtistPage /></Suspense>,
    },
    {
      path: "/payment-success",
      element: <Suspense fallback={<AppLoader />}><PaymentSuccess /></Suspense>,
    },
    {
      path: "/payment-canceled",
      element: <Suspense fallback={<AppLoader />}><PaymentCanceled /></Suspense>,
    },
    {
      path: "/post-success",
      element: <Suspense fallback={<AppLoader />}><PostSuccess /></Suspense>,
    },
    {
      path: "/posting",
      element: <Suspense fallback={<AppLoader />}><PostingIndex /></Suspense>,
    },
    {
      path: "/post-job",
      element: <Suspense fallback={<AppLoader />}><PostJobPage /></Suspense>
    },
    {
      path: "/post-job/form",
      element: <Suspense fallback={<AppLoader />}><PostJobFormPage /></Suspense>
    },
    {
      path: "/post-job/pricing",
      element: <Suspense fallback={<AppLoader />}><PostJobPricingPage /></Suspense>
    },
  ]);

  return (
    <UserProvider>
      <ThemeProvider>
        <RouteLogger />
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
