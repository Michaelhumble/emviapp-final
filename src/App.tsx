/** PROTECTED: Do not modify without explicit approval. */
import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/auth';
import { BookingNotificationProvider } from '@/components/notifications/BookingNotificationProvider';
import { SalonProvider } from '@/context/salon';
import { SubscriptionProvider } from '@/context/subscription';
import { NotificationProvider } from '@/context/notification';
// Analytics now handled by unified system in RouteLogger
import { RecommendationProvider } from '@/context/RecommendationContext';
import { OnboardingProvider } from '@/context/OnboardingContext';
import { SecurityProvider } from '@/components/security/SecurityProvider';
import { HelmetProvider } from 'react-helmet-async';
import routes from './routes';
import LazyIndex from "./pages/LazyIndex";
import GlobalSEOInjection from '@/components/seo/GlobalSEOInjection';
import ConsentBanner from '@/components/ConsentBanner';

// Critical components loaded immediately
import { Toaster } from "@/components/ui/toaster";
import GeneralErrorBoundary from '@/components/error-handling/GeneralErrorBoundary';
import SimpleLoadingFallback from '@/components/error-handling/SimpleLoadingFallback';
import RouteLogger from '@/components/common/RouteLogger';
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import FirstTimeVisitorRedirect from "@/components/routing/FirstTimeVisitorRedirect";
import GlobalPremiumSignupModalProvider from "@/components/modals/GlobalPremiumSignupModalProvider";

// Lazy load heavy pages
const BookingCalendarNew = lazy(() => import("@/pages/dashboard/artist/BookingCalendarNew"));
const ArtistInbox = lazy(() => import("@/pages/dashboard/artist/Inbox"));
const SalonsPageRedesigned = lazy(() => import("@/pages/salons/SalonsPageRedesigned"));
const Jobs = lazy(() => import("@/pages/Jobs"));
const OptimizedJobsPage = lazy(() => import("@/pages/OptimizedJobsPage"));
const GlobalJobsPage = lazy(() => import("@/pages/GlobalJobsPage"));
const JobDetailPage = lazy(() => import("@/pages/JobDetailPage"));
const CityJobsLanding = lazy(() => import("@/pages/jobs/CityJobsLanding"));
const RoleCityJobsLanding = lazy(() => import("@/pages/jobs/RoleCityJobsLanding"));
const SpecialtyCityLanding = lazy(() => import("@/pages/artists/SpecialtyCityLanding"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Terms = lazy(() => import("@/pages/Terms"));
const Refund = lazy(() => import("@/pages/Refund"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Cookies = lazy(() => import("@/pages/Cookies"));
const CheckoutFallback = lazy(() => import("@/pages/CheckoutFallback"));
const PostSuccess = lazy(() => import("@/pages/post-success"));
const PostCanceled = lazy(() => import("@/pages/post-canceled"));
const PostJobBillion = lazy(() => import("@/pages/PostJobBillion"));
const PostJobExperimental = lazy(() => import("@/pages/PostJobExperimental"));
const SignIn = lazy(() => import("@/pages/auth/SignIn"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const NewSignUp = lazy(() => import("@/pages/auth/NewSignUp"));
const SignupFastFomo = lazy(() => import("@/pages/SignupFastFomo"));
const AuthPage = lazy(() => import("@/pages/auth/AuthPage"));
const PremiumSignupPage = lazy(() => import("@/pages/auth/PremiumSignupPage"));
const Onboarding = lazy(() => import("@/pages/Onboarding"));
const EnhancedPostJob = lazy(() => import("@/pages/enhanced-post-job"));
const SellSalonPage = lazy(() => import("@/pages/sell-salon"));
const PostSalon = lazy(() => import("@/pages/PostSalon"));
const SalonListingSuccessPage = lazy(() => import("@/pages/salon-listing-success"));
const CustomerProfilePage = lazy(() => import("@/pages/customer/ProfilePage"));
const JobPostingSuccessPage = lazy(() => import("@/pages/JobPostingSuccessPage"));
const InviteAcceptance = lazy(() => import("@/pages/InviteAcceptance"));
const FreelancerProfile = lazy(() => import("@/pages/FreelancerProfile"));
const NailJobSuccessPage = lazy(() => import("@/pages/nails-job-success"));

// Blog Pages
const BlogLanding = lazy(() => import("@/pages/blog/BlogLanding"));
const BlogArticlePage = lazy(() => import("@/pages/blog/[slug]"));
const TheBeautyRevolution = lazy(() => import("@/pages/blog/TheBeautyRevolution"));
const ViralArticle = lazy(() => import("@/pages/ViralArticle"));
const EmviStoryVietnamese = lazy(() => import("@/pages/blog/EmviStoryVietnamese"));

// Blog Category Pages
const TrendsCategory = lazy(() => import("@/pages/blog/categories/TrendsCategory"));
const BeautyTipsCategory = lazy(() => import("@/pages/blog/categories/BeautyTipsCategory"));
const IndustryCategory = lazy(() => import("@/pages/blog/categories/IndustryCategory"));
const ArtistSpotlightsCategory = lazy(() => import("@/pages/blog/categories/ArtistSpotlightsCategory"));
const SuccessStoriesCategory = lazy(() => import("@/pages/blog/categories/SuccessStoriesCategory"));
const SalonManagementCategory = lazy(() => import("@/pages/blog/categories/SalonManagementCategory"));

// Industry Pages
const NailsPage = lazy(() => import("@/pages/nails"));
const HairPage = lazy(() => import("@/pages/hair"));
const BarberPage = lazy(() => import("@/pages/barber"));
const MassagePage = lazy(() => import("@/pages/massage"));
const SkincarePage = lazy(() => import("@/pages/skincare"));
const MakeupPage = lazy(() => import("@/pages/makeup"));
const BrowsLashesPage = lazy(() => import("@/pages/brows-lashes"));
const TattooPage = lazy(() => import("@/pages/tattoo"));
const BookingServices = lazy(() => import("@/pages/BookingServices"));
const Artists = lazy(() => import("@/pages/Artists"));
const PricingPage = lazy(() => import("@/pages/pricing/PricingPage"));
const ArtistDetail = lazy(() => import("@/pages/artists/[id]"));


function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Log route for debugging
    console.log('Current route:', location.pathname);
  }, [location.pathname]);

  return (
    <HelmetProvider>
      {/* Global Organization + Website JSON-LD */}
      <GlobalSEOInjection />
      <GeneralErrorBoundary>
        <SecurityProvider>
          <AuthProvider>
            <BookingNotificationProvider>
            <SalonProvider>
              <SubscriptionProvider>
                <NotificationProvider>
                    <RecommendationProvider>
                       <OnboardingProvider>
                        <RouteLogger />
                        <FirstTimeVisitorRedirect>
                          <GlobalPremiumSignupModalProvider>
                            <Suspense fallback={<SimpleLoadingFallback message="Loading application..." />}>
                           <Routes>
                    
                     {/* Auth routes */}
                     <Route path="/login" element={<Suspense fallback={<SimpleLoadingFallback />}><SignIn /></Suspense>} />
                     <Route path="/signin" element={<Suspense fallback={<SimpleLoadingFallback />}><SignIn /></Suspense>} />
                     <Route path="/signup-fast-fomo" element={<Suspense fallback={<SimpleLoadingFallback />}><SignupFastFomo /></Suspense>} />
                     <Route path="/auth" element={<Suspense fallback={<SimpleLoadingFallback />}><AuthPage /></Suspense>} />
                     <Route path="/auth/signup" element={<Suspense fallback={<SimpleLoadingFallback />}><SignUp /></Suspense>} />
                     <Route path="/auth/premium-signup" element={<Suspense fallback={<SimpleLoadingFallback />}><PremiumSignupPage /></Suspense>} />
                     <Route path="/onboarding" element={
                       <ProtectedRoute>
                         <Suspense fallback={<SimpleLoadingFallback />}><Onboarding /></Suspense>
                       </ProtectedRoute>
                     } />
                     
                     {/* Customer Profile route */}
                     <Route path="/profile" element={<Suspense fallback={<SimpleLoadingFallback />}><CustomerProfilePage /></Suspense>} />
                    
                     {/* Job posting routes - Lazy loaded */}
                     <Route path="/post-job" element={<Suspense fallback={<SimpleLoadingFallback />}><EnhancedPostJob /></Suspense>} />
                     <Route path="/post-job/nails" element={<Suspense fallback={<SimpleLoadingFallback />}><EnhancedPostJob /></Suspense>} />
                     <Route path="/post-job-billion" element={<Suspense fallback={<SimpleLoadingFallback />}><PostJobBillion /></Suspense>} />
                     <Route path="/post-job-experimental" element={<Suspense fallback={<SimpleLoadingFallback />}><PostJobExperimental /></Suspense>} />
                    
                     {/* Salon selling routes */}
                     <Route path="/sell-salon" element={<SellSalonPage />} />
                     <Route path="/posting/salon" element={<Layout><PostSalon /></Layout>} />
                     
                     {/* Salon listing success routes */}
                     <Route path="/salon-listing-success" element={<Layout><SalonListingSuccessPage /></Layout>} />
                     <Route path="/salon-success" element={<Layout><SalonListingSuccessPage /></Layout>} />
                    
                    {/* Payment routes */}
                    <Route path="/checkout" element={<CheckoutFallback />} />
                    <Route path="/post-success" element={<PostSuccess />} />
                    <Route path="/post-canceled" element={<PostCanceled />} />
                    
                    {/* Job posting success route */}
                    <Route path="/job-posted-success" element={<JobPostingSuccessPage />} />
                    <Route path="/nails-job-success" element={<NailJobSuccessPage />} />
                    
                     {/* Other pages */}
                     <Route path="/salons" element={<Layout><SalonsPageRedesigned /></Layout>} />
                     <Route path="/jobs" element={<Layout><Jobs /></Layout>} />
                     <Route path="/jobs/in/:cityState" element={<Layout><CityJobsLanding /></Layout>} />
                     <Route path="/jobs/:role/:cityState" element={<Layout><RoleCityJobsLanding /></Layout>} />
                     <Route path="/jobs/:cityState" element={<Layout><CityJobsLanding /></Layout>} />
                     <Route path="/jobs/:id" element={<Layout><JobDetailPage /></Layout>} />
                     <Route path="/job/:jobId" element={<Navigate to="/jobs/:jobId" replace />} />
                     <Route path="/jobs-optimized" element={<OptimizedJobsPage />} />
                     <Route path="/artists" element={<Suspense fallback={<SimpleLoadingFallback />}><Artists /></Suspense>} />
                     <Route path="/artists/:specialty/:cityState" element={<Suspense fallback={<SimpleLoadingFallback />}><SpecialtyCityLanding /></Suspense>} />
                     <Route path="/artists/:id" element={<Suspense fallback={<SimpleLoadingFallback />}><ArtistDetail /></Suspense>} />
                     <Route path="/booking-services" element={<Layout><BookingServices /></Layout>} />
                    
                    {/* Industry Pages */}
                    <Route path="/nails" element={<Layout><NailsPage /></Layout>} />
                    <Route path="/hair" element={<Layout><HairPage /></Layout>} />
                    <Route path="/barber" element={<Layout><BarberPage /></Layout>} />
                    <Route path="/massage" element={<Layout><MassagePage /></Layout>} />
                    <Route path="/skincare" element={<Layout><SkincarePage /></Layout>} />
                    <Route path="/makeup" element={<Layout><MakeupPage /></Layout>} />
                    <Route path="/brows-lashes" element={<Layout><BrowsLashesPage /></Layout>} />
                    <Route path="/tattoo" element={<Layout><TattooPage /></Layout>} />
                    
                     <Route path="/about" element={<Layout><About /></Layout>} />
                     <Route path="/contact" element={<Layout><Contact /></Layout>} />
                     <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
                     
                     <Route path="/terms" element={<Layout><Terms /></Layout>} />
                     <Route path="/refund" element={<Layout><Refund /></Layout>} />
                     <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
                     <Route path="/cookies" element={<Layout><Cookies /></Layout>} />
                    
                     {/* Homepage route - critical performance optimization */}
                     <Route path="/" element={<LazyIndex />} />
                     
                     {/* ... keep existing code (other routes) the same */}
                     {routes.map((route, index) => (
                       (route.path !== "/" && route.path !== "/salons" && route.path !== "/jobs" && route.path !== "/about" && 
                        route.path !== "/contact" && route.path !== "/terms" && route.path !== "/refund" &&
                        route.path !== "/privacy" && route.path !== "/cookies" && route.path !== "/post-job" &&
                        route.path !== "/sell-salon" && route.path !== "/salon-listing-success" && route.path !== "/profile") && (
                        <Route 
                          key={index}
                          path={route.path}
                          element={<Layout>{route.element}</Layout>}
                        />
                      )
                    ))}
                    <Route path="/dashboard/artist/booking-calendar-new" element={
                      <ProtectedRoute>
                        <Layout><BookingCalendarNew /></Layout>
                      </ProtectedRoute>
                    } />
                    <Route path="/dashboard/artist/inbox" element={
                      <ProtectedRoute>
                        <Layout><ArtistInbox /></Layout>
                      </ProtectedRoute>
                    } />
                    
                    {/* Blog Routes */}
                    <Route path="/blog" element={<Layout><BlogLanding /></Layout>} />
                    <Route path="/blog/:slug" element={<Layout><BlogArticlePage /></Layout>} />
                    <Route path="/blog/the-beauty-revolution" element={<Layout><TheBeautyRevolution /></Layout>} />
                    <Route path="/article/from-invisible-to-unstoppable" element={<Layout><ViralArticle /></Layout>} />
                    <Route path="/blog/emviapp-vision/emviapp-story-vi" element={<Layout><EmviStoryVietnamese /></Layout>} />
                    
                    {/* Dynamic blog article routes */}
                    <Route path="/blog/:category/:slug" element={<Layout><BlogArticlePage /></Layout>} />

                    {/* Blog Category Routes */}
                    <Route path="/blog/categories/trends" element={<Layout><TrendsCategory /></Layout>} />
                    <Route path="/blog/categories/beauty-tips" element={<Layout><BeautyTipsCategory /></Layout>} />
                    <Route path="/blog/categories/industry" element={<Layout><IndustryCategory /></Layout>} />
                    <Route path="/blog/categories/artist-spotlights" element={<Layout><ArtistSpotlightsCategory /></Layout>} />
                    <Route path="/blog/categories/success-stories" element={<Layout><SuccessStoriesCategory /></Layout>} />
                    <Route path="/blog/categories/salon-management" element={<Layout><SalonManagementCategory /></Layout>} />
                    
                    {/* REMOVED: Hardcoded blog routes that conflict with dynamic routing */}
                    {/* All blog articles now use dynamic /blog/:category/:slug pattern */}
                    
                    {/* Team Invite Routes */}
                    <Route path="/invite/:inviteCode" element={<InviteAcceptance />} />
                    
                    {/* Freelancer Profile Route */}
                    <Route path="/freelancer/:profileId" element={<FreelancerProfile />} />
                        </Routes>
                       </Suspense>
                       </GlobalPremiumSignupModalProvider>
                       </FirstTimeVisitorRedirect>
                        <Toaster />
                        <ConsentBanner />
                     </OnboardingProvider>
                  </RecommendationProvider>
              </NotificationProvider>
            </SubscriptionProvider>
          </SalonProvider>
            </BookingNotificationProvider>
        </AuthProvider>
      </SecurityProvider>
      </GeneralErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
