
import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import SalonDashboard from './pages/dashboard/SalonDashboard';
import ArtistProfile from './pages/ArtistProfile';
import SalonProfile from './pages/SalonProfile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/dashboard/owner',
    element: <SalonDashboard />,
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

// Default export for compatibility
export default router;
