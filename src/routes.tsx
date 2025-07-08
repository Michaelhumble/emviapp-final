import React from 'react';
import Index from './pages/Index';
import Welcome from './pages/Welcome';
import NotFound from './pages/NotFound';
import Artists from './pages/Artists';
import JobsPage from './pages/jobs';
import SalonsFinalsPage from './pages/salons/SalonsFinal';
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
import BoothDetail from './pages/booths/BoothDetail';
import BoothsIndex from './pages/booths/BoothsIndex';
import AdminDashboard from './pages/admin/AdminDashboard';

import ArtistProfileSetup from './pages/profile/artist/setup';
import SalonProfileSetup from './pages/profile/salon/setup';
import FreelancerSetup from './pages/profile/freelancer/setup';
import CustomerSetup from './pages/profile/customer/setup';
import OtherRoleSetup from './pages/profile/other/setup';
import BoothRenterSetup from './pages/profile/renter/setup';
import SupplierSetup from './pages/profile/supplier/setup';

import EarlyAccess from "./pages/EarlyAccess";
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';

import { AuthRedirect } from './components/auth/AuthRedirect';

import PricingPage from './pages/pricing/PricingPage';
import InvitePage from './pages/invite/InvitePage';

const Messages = React.lazy(() => import('./pages/messages/index'));
import PostJobFreePage from './pages/post-job-free/index';

import PortfolioManagerPage from './pages/dashboard/artist/portfolio/index';

import OpportunityDetailPage from './pages/opportunities/OpportunityDetailPage';
import SimpleSalonsPage from './pages/salons/SimpleSalonsPage';
import SimpleSalonDetailPage from './pages/salons/SimpleSalonDetailPage';
import SalonDetailPage from './pages/salons/SalonDetailPage';
import SalonListingForm from './pages/salons/SalonListingForm';

import TestEnhancedSignUp from "@/pages/TestEnhancedSignUp";
import PaymentSuccess from "@/pages/PaymentSuccess";

// Removed test page imports - paid job test now integrated into main form

const routes = [
  {
    path: '/auth/redirect',
    element: <AuthRedirect />,
  },
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
    path: '/jobs/:id',
    element: <JobsPage />,
  },
  {
    path: '/jobs/edit/:jobId',
    element: <React.Suspense fallback={<div>Loading...</div>}>
      {React.createElement(React.lazy(() => import('./pages/jobs/EditJobPage')))}
    </React.Suspense>,
  },
  {
    path: '/post-job-free',
    element: <PostJobFreePage />,
  },
  // Removed test route - paid job test now integrated into main form
  {
    path: '/salons',
    element: <SimpleSalonsPage />,
  },
  {
    path: '/salons/:id',
    element: <SimpleSalonDetailPage />,
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
    element: <ArtistProfileSetup />,
  },
  {
    path: '/profile/salon/setup',
    element: <SalonProfileSetup />,
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
    element: <OtherRoleSetup />,
  },
  {
    path: '/profile/renter/setup',
    element: <BoothRenterSetup />,
  },
  {
    path: '/profile/supplier/setup',
    element: <SupplierSetup />,
  },
  {
    path: '/setup/artist',
    element: <ArtistProfileSetup />,
  },
  {
    path: '/setup/salon',
    element: <SalonProfileSetup />,
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
    element: <OtherRoleSetup />,
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
    path: '/admin-dashboard',
    element: <AdminDashboard />,
  },
  {
    path: '/pricing-page',
    element: <PricingPage />,
  },
  {
    path: '/pricing',
    element: <PricingPage />,
  },
  {
    path: '/invite/:token',
    element: <InvitePage />,
  },
  {
    path: '/dashboard/artist/portfolio',
    element: <PortfolioManagerPage />
  },
  {
    path: '/opportunities/:id',
    element: <OpportunityDetailPage />,
  },
  {
    path: '/test-signup',
    element: <TestEnhancedSignUp />,
    errorElement: <NotFound />
  },
  {
    path: '/payment-success',
    element: <PaymentSuccess />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/search',
    element: <Artists />, // Using Artists page for search/browse
  },
  {
    path: '/messages',
    element: <React.Suspense fallback={<div>Loading...</div>}>
      <Messages />
    </React.Suspense>,
  },
  {
    path: '/bookings',
    element: <MyBookingsPage />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/listing/:id',
    element: <SimpleSalonDetailPage />, // Fixed from SimpleSalonsPage
  },
  {
    path: '/salon-listing',
    element: <SalonListingForm />,
  },
];

export default routes;
