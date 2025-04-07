
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/auth';
import { ProfileProvider } from './context/profile';
import { SubscriptionProvider } from './context/subscription';
import { Toaster } from '@/components/ui/sonner';

// Import pages
import App from './App';
import Index from '@/pages/Index';
import Jobs from '@/pages/jobs/index';
import Salons from '@/pages/Salons';
import SalonOwners from '@/pages/SalonOwners';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import Profile from '@/pages/Profile';
import UserProfilePage from '@/pages/profile/UserProfilePage';
import ProfileEdit from '@/pages/profile/edit';
import UserProfileByUsername from '@/pages/profile/[username]';
import CustomerDashboard from '@/pages/dashboard/Customer';
import SalonDashboard from '@/pages/dashboard/Salon';
import ArtistDashboard from '@/pages/dashboard/Artist';
import SupplierDashboard from '@/pages/dashboard/Supplier';
import FreelancerDashboard from '@/pages/dashboard/Freelancer';
import OwnerDashboard from '@/pages/dashboard/Owner';
import Dashboard from '@/pages/dashboard/Dashboard';
import OtherDashboard from '@/pages/dashboard/Other';
import NotFound from '@/pages/NotFound';
import Analysis from '@/pages/Analysis';
import ProfileRedirect from '@/components/profile/ProfileRedirect';
import Checkout from '@/pages/Checkout';
import Messaging from '@/pages/Messaging';
import SalonMarketplace from '@/pages/SalonMarketplace';
import ProfileNotFound from '@/components/profile/ProfileNotFound';
import SalonNotFound from '@/components/salon/SalonNotFound';
import MessageNotFound from '@/components/messaging/MessageNotFound';
import ArtistPublicProfile from '@/pages/u/ArtistPublicProfile';
import PostJob from '@/pages/post/PostJob';

// Import styles
import './index.css';

// Create query client
const queryClient = new QueryClient();

// Create router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: 'jobs',
        element: <Jobs />
      },
      {
        path: 'salons',
        element: <Salons />
      },
      {
        path: 'salon-owners',
        element: <SalonOwners />
      },
      {
        path: 'salon/:id',
        element: <SalonMarketplace />,
        errorElement: <SalonNotFound />
      },
      {
        path: 'analysis',
        element: <Analysis />
      },
      {
        path: 'auth/signin',
        element: <SignIn />
      },
      {
        path: 'auth/signup',
        element: <SignUp />
      },
      // Add direct routes to sign-in and sign-up without auth prefix
      {
        path: 'sign-in',
        element: <SignIn />
      },
      {
        path: 'sign-up',
        element: <SignUp />
      },
      {
        path: 'profile',
        element: <UserProfilePage />
      },
      {
        path: 'profile/edit',
        element: <ProfileEdit />
      },
      {
        path: 'profile/:username',
        element: <UserProfileByUsername />,
        errorElement: <ProfileNotFound />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'dashboard/customer',
        element: <CustomerDashboard />
      },
      {
        path: 'dashboard/salon',
        element: <SalonDashboard />
      },
      {
        path: 'dashboard/artist',
        element: <ArtistDashboard />
      },
      {
        path: 'dashboard/supplier',
        element: <SupplierDashboard />
      },
      {
        path: 'dashboard/freelancer',
        element: <FreelancerDashboard />
      },
      {
        path: 'dashboard/owner',
        element: <SalonDashboard />  // Makes the owner route also show the salon dashboard
      },
      {
        path: 'dashboard/other',
        element: <OtherDashboard />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'messages',
        element: <Messaging />,
        errorElement: <MessageNotFound />
      },
      {
        path: 'messages/:id',
        element: <Messaging />,
        errorElement: <MessageNotFound />
      },
      {
        path: 'redirect/profile',
        element: <ProfileRedirect />
      },
      {
        path: 'post/job',
        element: <PostJob />
      },
      {
        path: '*',
        element: <NotFound />
      },
      {
        path: 'u/:username',
        element: <ArtistPublicProfile />,
        errorElement: <ProfileNotFound />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SubscriptionProvider>
          <ProfileProvider>
            <RouterProvider router={router} />
            <Toaster />
          </ProfileProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
