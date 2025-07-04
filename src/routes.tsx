
import { createBrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import DashboardPage from './pages/DashboardPage';
import ArtistProfile from './pages/ArtistProfile';
import SalonProfile from './pages/SalonProfile';
import CustomerProfilePage from './pages/profiles/CustomerProfilePage';
import ArtistProfilePage from './pages/profiles/ArtistProfilePage';
import SalonProfilePage from './pages/profiles/SalonProfilePage';
import ProfileRouter from './components/profile/ProfileRouter';

const routes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/artist/:id",
    element: <ArtistProfile />,
  },
  {
    path: "/salon/:id", 
    element: <SalonProfile />,
  },
  {
    path: "/profile",
    element: <ProfileRouter />,
  },
  {
    path: "/profile/customer",
    element: <CustomerProfilePage />,
  },
  {
    path: "/profile/artist",
    element: <ArtistProfilePage />,
  },
  {
    path: "/profile/salon",
    element: <SalonProfilePage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
