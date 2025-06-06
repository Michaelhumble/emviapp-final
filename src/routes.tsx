import { lazy } from 'react';

// Lazy load pages
const Index = lazy(() => import('./pages/Index'));
const Artists = lazy(() => import('./pages/Artists'));
const Jobs = lazy(() => import('./pages/Jobs'));
const Community = lazy(() => import('./pages/Community'));
const SalonOwners = lazy(() => import('./pages/SalonOwners'));
const PostJob = lazy(() => import('./pages/PostJob'));
const PostJobBillion = lazy(() => import('./pages/PostJobBillion'));
const PostJobExperimental = lazy(() => import('./pages/PostJobExperimental'));
const PostSalon = lazy(() => import('./pages/PostSalon'));
const CreateJobPosting = lazy(() => import('./pages/CreateJobPosting'));
const SalonMarketplace = lazy(() => import('./pages/SalonMarketplace'));
const Welcome = lazy(() => import('./pages/Welcome'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About.routes'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Settings = lazy(() => import('./pages/Settings'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Refund = lazy(() => import('./pages/Refund'));
const Analysis = lazy(() => import('./pages/Analysis'));
const TestEnhancedSignUp = lazy(() => import('./pages/TestEnhancedSignUp'));
const PostSuccess = lazy(() => import('./pages/post-success'));
const PostCanceled = lazy(() => import('./pages/post-canceled'));
const EnhancedPostJob = lazy(() => import('./pages/enhanced-post-job'));
const PostJobPage = lazy(() => import('./pages/post-job'));
const SellSalon = lazy(() => import('./pages/sell-salon'));
const CheckoutFallback = lazy(() => import('./pages/CheckoutFallback'));

// Auth pages
const SignIn = lazy(() => import('./pages/auth/SignIn'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const SignUpNew = lazy(() => import('./pages/auth/SignUpNew'));

// Profile pages
const ProfileEditor = lazy(() => import('./pages/profile/ProfileEditor'));
const ProfileRedirect = lazy(() => import('./pages/profile/ProfileRedirect'));
const UserProfilePage = lazy(() => import('./pages/profile/UserProfilePage'));
const ArtistSetup = lazy(() => import('./pages/profile/artist/setup'));
const SalonSetup = lazy(() => import('./pages/profile/salon/setup'));
const RenterSetup = lazy(() => import('./pages/profile/renter/setup'));
const EditProfile = lazy(() => import('./pages/profile/edit'));

// Dashboard pages
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const CustomerDashboard = lazy(() => import('./pages/dashboard/Customer'));
const ArtistDashboard = lazy(() => import('./pages/dashboard/Artist'));
const SalonDashboard = lazy(() => import('./pages/dashboard/Salon'));
const FreelancerDashboard = lazy(() => import('./pages/dashboard/Freelancer'));
const SupplierDashboard = lazy(() => import('./pages/dashboard/Supplier'));
const ManagerDashboard = lazy(() => import('./pages/dashboard/Manager'));
const OtherDashboard = lazy(() => import('./pages/dashboard/Other'));

// Artist pages
const ArtistBookingCalendar = lazy(() => import('./pages/dashboard/artist/BookingCalendar'));
const ArtistInbox = lazy(() => import('./pages/dashboard/artist/Inbox'));
const ArtistPortfolio = lazy(() => import('./pages/dashboard/artist/portfolio'));

// Salon pages
const SalonDetail = lazy(() => import('./pages/salons/SalonDetail'));
const SalonDetailPage = lazy(() => import('./pages/salons/SalonDetailPage'));
const SimpleSalonDetailPage = lazy(() => import('./pages/salons/SimpleSalonDetailPage'));
const StableSalonPage = lazy(() => import('./pages/salons/StableSalonPage'));
const SalonListingForm = lazy(() => import('./pages/salons/SalonListingForm'));
const SalonListingSuccess = lazy(() => import('./pages/salon-listing-success'));

// Public profile pages
const ArtistPublicProfile = lazy(() => import('./pages/u/ArtistPublicProfile'));
const ArtistPublicProfilePage = lazy(() => import('./pages/u/artist-profile/ArtistPublicProfilePage'));

// Artist profile pages
const ArtistProfilePage = lazy(() => import('./pages/a/artist-profile'));

// Other pages
const BoothsIndex = lazy(() => import('./pages/booths/BoothsIndex'));
const InvitePage = lazy(() => import('./pages/invite/InvitePage'));
const MessagesIndex = lazy(() => import('./pages/messages'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CustomerProfilePage = lazy(() => import('./pages/customer/ProfilePage'));
const JobPostCTA = lazy(() => import('./pages/jobs/JobPostCTA'));
const JobsIndex = lazy(() => import('./pages/jobs'));
const JobPost = lazy(() => import('./pages/posting/JobPost'));
const SalonPost = lazy(() => import('./pages/posting/SalonPost'));
const CreateJobPostingPage = lazy(() => import('./pages/jobs/CreateJobPosting'));
const PricingPage = lazy(() => import('./pages/pricing/PricingPage'));
const ExploreArtists = lazy(() => import('./pages/explore/artists'));
const ManagerSetup = lazy(() => import('./pages/manager/setup'));
const OpportunityNotFound = lazy(() => import('./pages/opportunity/OpportunityNotFound'));
const SellSalonIndex = lazy(() => import('./pages/sell-salon'));
const VisibilityIndex = lazy(() => import('./pages/visibility'));

const routes = [
  { path: '/', element: Index },
  { path: '/artists', element: Artists },
  { path: '/jobs', element: Jobs },
  { path: '/community', element: Community },
  { path: '/salon-owners', element: SalonOwners },
  { path: '/post-job', element: PostJob },
  { path: '/post-job-billion', element: PostJobBillion },
  { path: '/post-job-experimental', element: PostJobExperimental },
  { path: '/post-salon', element: PostSalon },
  { path: '/create-job-posting', element: CreateJobPosting },
  { path: '/salons', element: SalonMarketplace },
  { path: '/welcome', element: Welcome },
  { path: '/contact', element: Contact },
  { path: '/about', element: About },
  { path: '/settings', element: Settings },
  { path: '/terms', element: Terms },
  { path: '/privacy', element: Privacy },
  { path: '/cookies', element: Cookies },
  { path: '/refund', element: Refund },
  { path: '/analysis', element: Analysis },
  { path: '/test-signup', element: TestEnhancedSignUp },
  { path: '/post-success', element: PostSuccess },
  { path: '/post-canceled', element: PostCanceled },
  { path: '/enhanced-post-job', element: EnhancedPostJob },
  { path: '/post-job-page', element: PostJobPage },
  { path: '/sell-salon', element: SellSalon },
  { path: '/checkout-fallback', element: CheckoutFallback },

  // Auth routes
  { path: '/auth/signin', element: SignIn },
  { path: '/auth/signup', element: SignUp },
  { path: '/auth/signup-new', element: SignUpNew },

  // Profile routes
  { path: '/profile', element: ProfileRedirect },
  { path: '/profile/edit', element: ProfileEditor },
  { path: '/profile/:username', element: UserProfilePage },
  { path: '/profile/artist/setup', element: ArtistSetup },
  { path: '/profile/salon/setup', element: SalonSetup },
  { path: '/profile/renter/setup', element: RenterSetup },
  { path: '/profile/edit-profile', element: EditProfile },

  // Dashboard routes
  { path: '/dashboard', element: Dashboard },
  { path: '/dashboard/customer', element: CustomerDashboard },
  { path: '/dashboard/artist', element: ArtistDashboard },
  { path: '/dashboard/salon', element: SalonDashboard },
  { path: '/dashboard/freelancer', element: FreelancerDashboard },
  { path: '/dashboard/supplier', element: SupplierDashboard },
  { path: '/dashboard/manager', element: ManagerDashboard },
  { path: '/dashboard/other', element: OtherDashboard },

  // Artist dashboard routes
  { path: '/dashboard/artist/booking-calendar', element: ArtistBookingCalendar },
  { path: '/dashboard/artist/inbox', element: ArtistInbox },
  { path: '/dashboard/artist/portfolio', element: ArtistPortfolio },

  // Salon routes
  { path: '/salon/:id', element: SalonDetail },
  { path: '/salon-detail/:id', element: SalonDetailPage },
  { path: '/salon-simple/:id', element: SimpleSalonDetailPage },
  { path: '/salon-stable/:id', element: StableSalonPage },
  { path: '/salon-listing-form', element: SalonListingForm },
  { path: '/salon-listing-success', element: SalonListingSuccess },

  // Public profile routes
  { path: '/u/:username', element: ArtistPublicProfile },
  { path: '/u/artist-profile/:username', element: ArtistPublicProfilePage },

  // Artist profile routes
  { path: '/a/:username', element: ArtistProfilePage },

  // Other routes
  { path: '/booths', element: BoothsIndex },
  { path: '/invite/:code', element: InvitePage },
  { path: '/messages', element: MessagesIndex },
  { path: '/admin', element: AdminDashboard },
  { path: '/customer/profile', element: CustomerProfilePage },
  { path: '/jobs/post-cta', element: JobPostCTA },
  { path: '/jobs/index', element: JobsIndex },
  { path: '/posting/job', element: JobPost },
  { path: '/posting/salon', element: SalonPost },
  { path: '/jobs/create', element: CreateJobPostingPage },
  { path: '/pricing', element: PricingPage },
  { path: '/explore/artists', element: ExploreArtists },
  { path: '/manager/setup', element: ManagerSetup },
  { path: '/opportunity/not-found', element: OpportunityNotFound },
  { path: '/sell-salon/index', element: SellSalonIndex },
  { path: '/visibility/index', element: VisibilityIndex },

  // Catch-all route for 404
  { path: '*', element: NotFound }
];

export default routes;
