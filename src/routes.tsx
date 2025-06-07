import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { SimpleLoadingFallback } from '@/components/error-handling/SimpleLoadingFallback';

// Lazy load components
const Index = lazy(() => import('@/pages/Index'));
const Jobs = lazy(() => import('@/pages/Jobs'));
const Artists = lazy(() => import('@/pages/Artists'));
const SalonOwners = lazy(() => import('@/pages/SalonOwners'));
const About = lazy(() => import('@/pages/About.routes'));
const Contact = lazy(() => import('@/pages/Contact'));
const Terms = lazy(() => import('@/pages/Terms'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Cookies = lazy(() => import('@/pages/Cookies'));
const Refund = lazy(() => import('@/pages/Refund'));
const Welcome = lazy(() => import('@/pages/Welcome'));
const SignIn = lazy(() => import('@/pages/auth/SignIn'));
const SignUp = lazy(() => import('@/pages/auth/SignUp'));
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const Settings = lazy(() => import('@/pages/Settings'));
const PostJob = lazy(() => import('@/pages/PostJob'));
const PostJobBillion = lazy(() => import('@/pages/PostJobBillion'));
const PostJobExperimental = lazy(() => import('@/pages/PostJobExperimental'));
const CreateJobPosting = lazy(() => import('@/pages/CreateJobPosting'));
const EnhancedPostJob = lazy(() => import('@/pages/enhanced-post-job'));
const PostSalon = lazy(() => import('@/pages/PostSalon'));
const SalonMarketplace = lazy(() => import('@/pages/SalonMarketplace'));
const SellSalon = lazy(() => import('@/pages/sell-salon'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Analysis = lazy(() => import('@/pages/Analysis'));
const CheckoutFallback = lazy(() => import('@/pages/CheckoutFallback'));

// Dashboard pages
const ArtistDashboard = lazy(() => import('@/pages/dashboard/Artist'));
const CustomerDashboard = lazy(() => import('@/pages/dashboard/Customer'));
const SalonDashboard = lazy(() => import('@/pages/dashboard/Salon'));
const SupplierDashboard = lazy(() => import('@/pages/dashboard/Supplier'));
const FreelancerDashboard = lazy(() => import('@/pages/dashboard/Freelancer'));
const ManagerDashboard = lazy(() => import('@/pages/dashboard/Manager'));
const OtherDashboard = lazy(() => import('@/pages/dashboard/Other'));

// Profile pages
const ProfileEditor = lazy(() => import('@/pages/profile/ProfileEditor'));
const ProfileRedirect = lazy(() => import('@/pages/profile/ProfileRedirect'));
const UserProfilePage = lazy(() => import('@/pages/profile/UserProfilePage'));

// Specific profile setup pages
const ArtistSetup = lazy(() => import('@/pages/profile/artist/setup'));
const SalonSetup = lazy(() => import('@/pages/profile/salon/setup'));
const RenterSetup = lazy(() => import('@/pages/profile/renter/setup'));
const ManagerSetup = lazy(() => import('@/pages/manager/setup'));

// Other pages
const PricingPage = lazy(() => import('@/pages/pricing/PricingPage'));
const MessagesIndex = lazy(() => import('@/pages/messages/index'));
const InvitePage = lazy(() => import('@/pages/invite/InvitePage'));
const BoothsIndex = lazy(() => import('@/pages/booths/BoothsIndex'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<SimpleLoadingFallback />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/salon-owners" element={<SalonOwners />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/welcome" element={<Welcome />} />
        
        {/* Auth routes */}
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        
        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/artist" element={<ArtistDashboard />} />
        <Route path="/dashboard/customer" element={<CustomerDashboard />} />
        <Route path="/dashboard/salon" element={<SalonDashboard />} />
        <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
        <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
        <Route path="/dashboard/manager" element={<ManagerDashboard />} />
        <Route path="/dashboard/other" element={<OtherDashboard />} />
        
        {/* Profile routes */}
        <Route path="/profile" element={<ProfileRedirect />} />
        <Route path="/profile/edit" element={<ProfileEditor />} />
        <Route path="/profile/:username" element={<UserProfilePage />} />
        <Route path="/profile/artist/setup" element={<ArtistSetup />} />
        <Route path="/profile/salon/setup" element={<SalonSetup />} />
        <Route path="/profile/renter/setup" element={<RenterSetup />} />
        <Route path="/manager/setup" element={<ManagerSetup />} />
        
        {/* Job posting routes */}
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/post-job-billion" element={<PostJobBillion />} />
        <Route path="/post-job-experimental" element={<PostJobExperimental />} />
        <Route path="/create-job-posting" element={<CreateJobPosting />} />
        <Route path="/enhanced-post-job" element={<EnhancedPostJob />} />
        
        {/* Salon routes */}
        <Route path="/post-salon" element={<PostSalon />} />
        <Route path="/salon-marketplace" element={<SalonMarketplace />} />
        <Route path="/sell-salon" element={<SellSalon />} />
        
        {/* Other routes */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/messages" element={<MessagesIndex />} />
        <Route path="/invite/:code" element={<InvitePage />} />
        <Route path="/booths" element={<BoothsIndex />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/checkout-fallback" element={<CheckoutFallback />} />
        
        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
