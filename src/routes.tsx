
import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ArtistsPage from './pages/ArtistsPage';
import SalonsPage from './pages/SalonsPage';
import JobsPage from './pages/JobsPage';
import CommunityPage from './pages/CommunityPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import PostJobPage from './pages/PostJobPage';
import PostSalonPage from './pages/PostSalonPage';
import SalonOwnerDashboard from './pages/dashboard/owner';
import ArtistProfile from './pages/ArtistProfile';
import SalonProfile from './pages/SalonProfile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/artists',
    element: <ArtistsPage />,
  },
  {
    path: '/salons',
    element: <SalonsPage />,
  },
  {
    path: '/jobs',
    element: <JobsPage />,
  },
  {
    path: '/community',
    element: <CommunityPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/dashboard/owner',
    element: <SalonOwnerDashboard />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/post-job',
    element: <PostJobPage />,
  },
  {
    path: '/post-salon',
    element: <PostSalonPage />,
  },
  {
    path: '/artist/:id',
    element: <ArtistProfile />,
  },
  {
    path: '/salon/:id',
    element: <SalonProfile />,
  },
]);
