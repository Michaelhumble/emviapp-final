
import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import SalonOwnerDashboard from './pages/dashboard/owner';
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
    element: <SalonOwnerDashboard />,
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
