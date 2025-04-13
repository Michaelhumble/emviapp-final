import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '@/components/common/Loading';
import InviteGuard from '@/components/auth/InviteGuard';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/Home'));
const PricingPage = lazy(() => import('@/pages/Pricing'));
const ContactPage = lazy(() => import('@/pages/Contact'));
const AboutPage = lazy(() => import('@/pages/About'));
const TermsOfServicePage = lazy(() => import('@/pages/legal/TermsOfService'));
const PrivacyPolicyPage = lazy(() => import('@/pages/legal/PrivacyPolicy'));
const CookiePolicyPage = lazy(() => import('@/pages/legal/CookiePolicy'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));
const SignIn = lazy(() => import('@/pages/auth/SignIn'));
const SignUp = lazy(() => import('@/pages/auth/SignUp'));
const ChooseRole = lazy(() => import('@/pages/auth/ChooseRole'));
const VerifyEmail = lazy(() => import('@/pages/auth/VerifyEmail'));
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const ArtistDashboard = lazy(() => import('@/pages/dashboard/ArtistDashboard'));
const OwnerDashboard = lazy(() => import('@/pages/dashboard/OwnerDashboard'));
const CustomerDashboard = lazy(() => import('@/pages/dashboard/CustomerDashboard'));
const FreelancerDashboard = lazy(() => import('@/pages/dashboard/FreelancerDashboard'));
const SupplierDashboard = lazy(() => import('@/pages/dashboard/SupplierDashboard'));
const OtherDashboard = lazy(() => import('@/pages/dashboard/OtherDashboard'));
const ProfileRedirect = lazy(() => import('@/pages/profile/ProfileRedirect'));
const EditProfile = lazy(() => import('@/pages/profile/EditProfile'));
const ArtistProfileSetup = lazy(() => import('@/pages/profile/artist/ArtistProfileSetup'));
const SalonProfileSetup = lazy(() => import('@/pages/profile/salon/SalonProfileSetup'));
const FreelancerProfileSetup = lazy(() => import('@/pages/profile/freelancer/FreelancerProfileSetup'));
const OtherProfileSetup = lazy(() => import('@/pages/profile/other/OtherProfileSetup'));
const CustomerProfileSetup = lazy(() => import('@/pages/profile/customer/CustomerProfileSetup'));
const ArtistPublicProfile = lazy(() => import('@/pages/u/ArtistPublicProfile'));
const SalonPublicProfile = lazy(() => import('@/pages/u/SalonPublicProfile'));
const SalonSalesPage = lazy(() => import('@/pages/SalonSalesPage'));
const NewSalonSalePage = lazy(() => import('@/pages/sell-salon/NewSalonSalePage'));
const EditSalonSalePage = lazy(() => import('@/pages/sell-salon/EditSalonSalePage'));
const SalonSaleDetailsPage = lazy(() => import('@/pages/sell-salon/SalonSaleDetailsPage'));
const JobsPage = lazy(() => import('@/pages/JobsPage'));
const NewJobPage = lazy(() => import('@/pages/jobs/NewJobPage'));
const EditJobPage = lazy(() => import('@/pages/jobs/EditJobPage'));
const JobDetailsPage = lazy(() => import('@/pages/jobs/JobDetailsPage'));
const ArtistsPage = lazy(() => import('@/pages/ArtistsPage'));
const SalonsPage = lazy(() => import('@/pages/SalonsPage'));
const ReferralsPage = lazy(() => import('@/pages/ReferralsPage'));
const CommandCenter = lazy(() => import('@/pages/CommandCenter'));
const SupplierProfileSetup = lazy(() => import('@/pages/profile/supplier/SupplierProfileSetup'));
const RenterProfileSetup = lazy(() => import('@/pages/profile/renter/RenterProfileSetup'));

// Add our new pages
const EarlyAccess = lazy(() => import('@/pages/auth/EarlyAccess'));
const AccessDenied = lazy(() => import('@/pages/auth/AccessDenied'));

// Main routes
const routes = [
  // Public routes (no auth required)
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: '/pricing',
    element: (
      <Suspense fallback={<Loading />}>
        <PricingPage />
      </Suspense>
    ),
  },
  {
    path: '/contact',
    element: (
      <Suspense fallback={<Loading />}>
        <ContactPage />
      </Suspense>
    ),
  },
  {
    path: '/about',
    element: (
      <Suspense fallback={<Loading />}>
        <AboutPage />
      </Suspense>
    ),
  },
  {
    path: '/terms',
    element: (
      <Suspense fallback={<Loading />}>
        <TermsOfServicePage />
      </Suspense>
    ),
  },
  {
    path: '/privacy',
    element: (
      <Suspense fallback={<Loading />}>
        <PrivacyPolicyPage />
      </Suspense>
    ),
  },
  {
    path: '/cookies',
    element: (
      <Suspense fallback={<Loading />}>
        <CookiePolicyPage />
      </Suspense>
    ),
  },
  {
    path: '/auth/signin',
    element: (
      <Suspense fallback={<Loading />}>
        <SignIn />
      </Suspense>
    ),
  },
  {
    path: '/auth/signup',
    element: (
      <Suspense fallback={<Loading />}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: '/auth/choose-role',
    element: (
      <Suspense fallback={<Loading />}>
        <ChooseRole />
      </Suspense>
    ),
  },
  {
    path: '/auth/verify-email',
    element: (
      <Suspense fallback={<Loading />}>
        <VerifyEmail />
      </Suspense>
    ),
  },
  {
    path: '/auth/forgot-password',
    element: (
      <Suspense fallback={<Loading />}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: '/auth/reset-password',
    element: (
      <Suspense fallback={<Loading />}>
        <ResetPassword />
      </Suspense>
    ),
  },
  {
    path: '/u/:username',
    element: (
      <Suspense fallback={<Loading />}>
        <ArtistPublicProfile />
      </Suspense>
    ),
  },
  {
    path: '/salon/:salonId',
    element: (
      <Suspense fallback={<Loading />}>
        <SalonPublicProfile />
      </Suspense>
    ),
  },
  {
    path: '/salons',
    element: (
      <Suspense fallback={<Loading />}>
        <SalonsPage />
      </Suspense>
    ),
  },
  {
    path: '/salon-sales',
    element: (
      <Suspense fallback={<Loading />}>
        <SalonSalesPage />
      </Suspense>
    ),
  },
  {
    path: '/salon-sales/:salonId',
    element: (
      <Suspense fallback={<Loading />}>
        <SalonSaleDetailsPage />
      </Suspense>
    ),
  },
  {
    path: '/jobs',
    element: (
      <Suspense fallback={<Loading />}>
        <JobsPage />
      </Suspense>
    ),
  },
  {
    path: '/jobs/:jobId',
    element: (
      <Suspense fallback={<Loading />}>
        <JobDetailsPage />
      </Suspense>
    ),
  },
  {
    path: '/artists',
    element: (
      <Suspense fallback={<Loading />}>
        <ArtistsPage />
      </Suspense>
    ),
  },
  
  // Add early access request page
  {
    path: '/early-access',
    element: (
      <Suspense fallback={<Loading />}>
        <EarlyAccess />
      </Suspense>
    ),
  },
  
  // Access denied page
  {
    path: '/access-denied',
    element: (
      <Suspense fallback={<Loading />}>
        <AccessDenied />
      </Suspense>
    ),
  },
  
  // Protected routes (auth required)
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <DashboardPage />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/dashboard/artist',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <ArtistDashboard />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/dashboard/owner',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <OwnerDashboard />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/dashboard/customer',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <CustomerDashboard />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/dashboard/freelancer',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <FreelancerDashboard />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/dashboard/supplier',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <SupplierDashboard />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/dashboard/other',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <OtherDashboard />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/profile',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <ProfileRedirect />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/profile/edit',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <EditProfile />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/profile/artist/setup',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <ArtistProfileSetup />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/profile/salon/setup',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <SalonProfileSetup />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/profile/freelancer/setup',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <FreelancerProfileSetup />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/profile/supplier/setup',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <SupplierProfileSetup />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/profile/renter/setup',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <RenterProfileSetup />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/profile/other/setup',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <OtherProfileSetup />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/profile/customer/setup',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <CustomerProfileSetup />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/sell-salon/new',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <NewSalonSalePage />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/sell-salon/:salonId/edit',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <EditSalonSalePage />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/jobs/new',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <NewJobPage />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/jobs/:jobId/edit',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <EditJobPage />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/referrals',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <ReferralsPage />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/command-center',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <CommandCenter />
        </InviteGuard>
      </Suspense>
    ),
  },
  
  // Wrap other protected routes with InviteGuard
  {
    path: '/dashboard/*',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <DashboardPage />
        </InviteGuard>
      </Suspense>
    ),
  },
  {
    path: '/profile/*',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <ProfileRedirect />
        </InviteGuard>
      </Suspense>
    ),
  },
  
  // Catch-all route for 404 Not Found
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
];

export default routes;
