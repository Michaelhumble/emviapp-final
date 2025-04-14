import React from 'react';
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
import ManagerDashboard from './pages/dashboard/Manager';
import FreelancerDashboard from './pages/dashboard/Freelancer';
import SupplierDashboard from './pages/dashboard/Supplier';
import OtherDashboard from './pages/dashboard/Other';
import ProfileEditor from './pages/profile/ProfileEditor';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import UserProfilePage from './pages/profile/UserProfilePage';
import SalonOwners from './pages/SalonOwners';
import Settings from './pages/Settings';
import SalonDetail from './pages/salons/SalonDetail';
import ProfileRedirect from './pages/profile/ProfileRedirect';
import Profile from './pages/Profile';
import ArtistPublicPage from './pages/a/ArtistPublicPage';
import ArtistExplore from './pages/explore/artists';
import SalonMarketplace from './pages/SalonMarketplace';
import CommandCenter from './pages/CommandCenter';
import BookingPage from './pages/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage';
import BookingCalendar from './pages/BookingCalendar';
import BoothDetail from './pages/booths/BoothDetail';
import BoothsIndex from './pages/booths/BoothsIndex';
import Welcome from './pages/Welcome';
import Index from './pages/Index';

// Import profile setup pages
import ArtistSetup from './pages/profile/artist/setup';
import SalonOwnerSetup from './pages/profile/salon/setup';
import FreelancerSetup from './pages/profile/freelancer/setup';
import CustomerSetup from './pages/profile/customer/setup';
import OtherProfileSetup from './pages/profile/other/OtherProfileSetup';
import RenterProfileSetup from './pages/profile/renter/RenterProfileSetup';
import SupplierProfileSetup from './pages/profile/supplier/SupplierProfileSetup';
import EarlyAccess from './pages/EarlyAccess';

// Import legal and contact pages
import Contact from './pages/Contact';
import Terms from './pages/legal/Terms';
import Privacy from './pages/legal/Privacy';
import Cookies from './pages/legal/Cookies';

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
    path: '/explore/artists',
    element: <ArtistExplore />,
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
    path: '/salon-marketplace',
    element: <SalonMarketplace />,
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
    path: '/dashboard/manager',
    element: <ManagerDashboard />,
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
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/command-center',
    element: <CommandCenter />,
  },
  {
    path: '/profile/artist/setup',
    element: <ArtistSetup />,
  },
  {
    path: '/profile/salon/setup',
    element: <SalonOwnerSetup />,
  },
  {
    path: '/profile/freelancer/setup',
    element: <FreelancerSetup />,
  },
  {
    path: '/profile/customer/setup',
    element: <CustomerSetup />,
  },
  {
    path: '/profile/other/setup',
    element: <OtherProfileSetup />,
  },
  {
    path: '/profile/renter/setup',
    element: <RenterProfileSetup />,
  },
  {
    path: '/profile/supplier/setup',
    element: <SupplierProfileSetup />,
  },
  {
    path: '/setup/artist',
    element: <ArtistSetup />,
  },
  {
    path: '/setup/salon',
    element: <SalonOwnerSetup />,
  },
  {
    path: '/setup/freelancer',
    element: <FreelancerSetup />,
  },
  {
    path: '/setup/customer',
    element: <CustomerSetup />,
  },
  {
    path: '/setup/other',
    element: <OtherProfileSetup />,
  },
  {
    path: '/a/:username',
    element: <ArtistPublicPage />,
  },
  {
    path: '/artist/:username',
    element: <ArtistPublicPage />,
  },
  {
    path: '/early-access',
    element: <EarlyAccess />,
  },
  {
    path: '/contact',
    element: <Contact />,
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
    path: '/cookies',
    element: <Cookies />,
  },
  {
    path: '/booking',
    element: <BookingPage />,
  },
  {
    path: '/my-bookings',
    element: <MyBookingsPage />,
  },
  {
    path: '/booths',
    element: <BoothsIndex />,
  },
  {
    path: '/booths/:id',
    element: <BoothDetail />,
  },
  {
    path: '/calendar',
    element: <BookingCalendar />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
