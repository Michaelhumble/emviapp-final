
import React from 'react';
import Index from '@/pages/Index';
import Jobs from '@/pages/jobs/index';
import Salons from '@/pages/Salons';
import SalonOwners from '@/pages/SalonOwners';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import ChooseRole from '@/pages/auth/ChooseRole';
import Profile from '@/pages/Profile';
import UserProfilePage from '@/pages/profile/UserProfilePage';
import ProfileEdit from '@/pages/profile/edit';
import UserProfileByUsername from '@/pages/profile/[username]';
import Dashboard from '@/pages/dashboard/Dashboard';
import CustomerDashboard from '@/pages/dashboard/Customer';
import SalonDashboard from '@/pages/dashboard/Salon';
import ArtistDashboard from '@/pages/dashboard/Artist';
import SupplierDashboard from '@/pages/dashboard/Supplier';
import FreelancerDashboard from '@/pages/dashboard/Freelancer';
import OtherDashboard from '@/pages/dashboard/Other';
import NotFound from '@/pages/NotFound';
import Analysis from '@/pages/Analysis';
import ProfileRedirect from '@/components/profile/ProfileRedirect';
import Checkout from '@/pages/Checkout';
import Messaging from '@/pages/Messaging';
import SalonMarketplace from '@/pages/SalonMarketplace';
import ArtistPublicProfile from '@/pages/u/ArtistPublicProfile';
import PostJob from '@/pages/post/PostJob';
import PostingIndex from '@/pages/posting/Index';
import SalonPost from '@/pages/posting/SalonPost';
import SellSalonIndex from '@/pages/sell-salon/index';
import NewSalonSalePage from '@/pages/sell-salon/new';
import SalonSaleDetail from '@/pages/sell-salon/[id]';
import ArtistDirectory from '@/pages/explore/artists';
import Welcome from '@/pages/Welcome';

// Define the routes
const routes = [
  {
    path: '/',
    element: <Index />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/salons',
    element: <Salons />
  },
  {
    path: '/salon-owners',
    element: <SalonOwners />
  },
  {
    path: '/salon/:id',
    element: <SalonMarketplace />
  },
  {
    path: '/analysis',
    element: <Analysis />
  },
  {
    path: '/welcome',
    element: <Welcome />
  },
  {
    path: '/auth/signin',
    element: <SignIn />
  },
  {
    path: '/auth/signup',
    element: <SignUp />
  },
  {
    path: '/sign-in',
    element: <SignIn />
  },
  {
    path: '/sign-up',
    element: <SignUp />
  },
  {
    path: '/choose-role',
    element: <ChooseRole />
  },
  {
    path: '/profile',
    element: <UserProfilePage />
  },
  {
    path: '/profile/edit',
    element: <ProfileEdit />
  },
  {
    path: '/profile/:username',
    element: <UserProfileByUsername />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/dashboard/customer',
    element: <CustomerDashboard />
  },
  {
    path: '/dashboard/salon',
    element: <SalonDashboard />
  },
  {
    path: '/dashboard/artist',
    element: <ArtistDashboard />
  },
  {
    path: '/dashboard/supplier',
    element: <SupplierDashboard />
  },
  {
    path: '/dashboard/freelancer',
    element: <FreelancerDashboard />
  },
  {
    path: '/dashboard/owner',
    element: <SalonDashboard />
  },
  {
    path: '/dashboard/other',
    element: <OtherDashboard />
  },
  {
    path: '/checkout',
    element: <Checkout />
  },
  {
    path: '/messages',
    element: <Messaging />
  },
  {
    path: '/messages/:id',
    element: <Messaging />
  },
  {
    path: '/redirect/profile',
    element: <ProfileRedirect />
  },
  {
    path: '/post/job',
    element: <PostJob />
  },
  {
    path: '/posting',
    element: <PostingIndex />
  },
  {
    path: '/posting/salon',
    element: <SalonPost />
  },
  {
    path: '/sell-salon',
    element: <SellSalonIndex />
  },
  {
    path: '/sell-salon/new',
    element: <NewSalonSalePage />
  },
  {
    path: '/sell-salon/:id',
    element: <SalonSaleDetail />
  },
  {
    path: '/explore/artists',
    element: <ArtistDirectory />
  },
  {
    path: '/u/:username',
    element: <ArtistPublicProfile />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
