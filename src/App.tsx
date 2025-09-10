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
import HubSpotProvider from '@/components/analytics/HubSpotProvider';
import { HelmetProvider } from 'react-helmet-async';
import routes from './routes';
import LazyIndex from "./pages/LazyIndex";
import GlobalSEOInjection from '@/components/seo/GlobalSEOInjection';
import ConsentBanner from '@/components/ConsentBanner';
import ChatSystem from '@/components/chat/ChatSystem';

// Dev-only performance tools
import { IS_PROD, PERF_OVERLAY } from '@/lib/env';
import PerfOverlay from '@/components/dev/PerfOverlay';

// Critical components loaded immediately
import { Toaster } from "@/components/ui/toaster";
import GeneralErrorBoundary from '@/components/error-handling/GeneralErrorBoundary';
import SimpleLoadingFallback from '@/components/error-handling/SimpleLoadingFallback';
import RouteLogger from '@/components/common/RouteLogger';
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import FirstTimeVisitorRedirect from "@/components/routing/FirstTimeVisitorRedirect";


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
const RoleCityPage = lazy(() => import("@/pages/artists/RoleCityPage"));
const RoleIndexPage = lazy(() => import("@/pages/artists/[role]/index"));
const CityIndexPage = lazy(() => import("@/pages/artists/cities/[cityState]"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const ThankYou = lazy(() => import("@/pages/ThankYou"));
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
// REMOVED: SignupFastFomo page - contained popup modals
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
const ManageBooking = lazy(() => import("@/pages/ManageBooking"));
const SalonSuccessPage = lazy(() => import("@/pages/salon-success"));

// Blog Pages
const BlogIndex = lazy(() => import("@/pages/blog/BlogIndex"));
const BlogLanding = lazy(() => import("@/pages/blog/BlogLanding"));
const BlogArticlePage = lazy(() => import("@/pages/blog/[slug]"));
const TheBeautyRevolution = lazy(() => import("@/pages/blog/TheBeautyRevolution"));
const ViralArticle = lazy(() => import("@/pages/ViralArticle"));

// New Blog Content Hub Pages
const HowToFindBestBeautyProfessionals = lazy(() => import("@/pages/blog/how-to-find-the-best-beauty-professionals"));
const WhyWeeklyPayAttractsBetterArtists = lazy(() => import("@/pages/blog/why-weekly-pay-attracts-better-artists"));
const TopSalonStaffingMistakesToAvoid = lazy(() => import("@/pages/blog/top-salon-staffing-mistakes-to-avoid"));
const HowToGetMoreClientsAsNailTech = lazy(() => import("@/pages/blog/how-to-get-more-clients-as-a-nail-tech"));
const FutureOfBeautyIndustryIn2025 = lazy(() => import("@/pages/blog/the-future-of-beauty-industry-in-2025"));

// Migrated Blog Posts
const AISalonTools2025 = lazy(() => import("@/pages/blog/AISalonTools2025"));
const SalonStaffingCrisis2025 = lazy(() => import("@/pages/blog/SalonStaffingCrisis2025"));
const NailTechSalaryByCity2025 = lazy(() => import("@/pages/blog/nail-tech-salary-by-city-2025"));
const NailArtistPortfolioExamples = lazy(() => import("@/pages/blog/nail-artist-portfolio-examples"));
const HowToGetMoreNailClients = lazy(() => import("@/pages/blog/how-to-get-more-nail-clients"));
const NailSalonInterviewQuestionsAnswers = lazy(() => import("@/pages/blog/nail-salon-interview-questions-answers"));
const HireNailTechniciansInterviewQuestions = lazy(() => import("@/pages/blog/HireNailTechniciansInterviewQuestions"));

const NailJobsGuide = lazy(() => import("@/pages/guides/nail-jobs-in-the-us"));

// New SEO Content Hub Pages
const NailSalonGrowth2025 = lazy(() => import("@/pages/blog/nail-salon-growth-2025"));
const HiringNailArtists = lazy(() => import("@/pages/blog/hiring-nail-artists"));
const FiveStarReviews = lazy(() => import("@/pages/blog/5-star-reviews"));
const SalonMarketing2025 = lazy(() => import("@/pages/blog/salon-marketing-2025"));
const NailArtistsBestJobs = lazy(() => import("@/pages/blog/nail-artists-best-jobs"));

// Latest SEO Articles (2025)
const NailSalonHiringCrisis2025 = lazy(() => import("@/pages/blog/nail-salon-hiring-crisis-2025"));
const TopCitiesNailTechnicians2025 = lazy(() => import("@/pages/blog/top-10-cities-nail-technicians-2025"));
const SalonOwnersAttractHireKeepArtists = lazy(() => import("@/pages/blog/salon-owners-attract-hire-keep-artists"));
const BeautyIndustryHiddenJobMarket = lazy(() => import("@/pages/blog/500b-beauty-industry-hidden-job-market"));
const SideHustleSixFiguresNailTechnicians = lazy(() => import("@/pages/blog/side-hustle-six-figures-nail-technicians"));

// Vietnamese Blog Articles
const UngDungTotNhatChoNguoiVietTimViecNail = lazy(() => import("@/pages/blog/ung-dung-tot-nhat-cho-nguoi-viet-tim-viec-nail"));
const CachDangBanTiemNailOnlineNhanhHieuQua = lazy(() => import("@/pages/blog/cach-dang-ban-tiem-nail-online-nhanh-hieu-qua"));
const Top5WebsiteUyTinChoNguoiVietDangTinTuyenDung = lazy(() => import("@/pages/blog/top-5-website-uy-tin-cho-nguoi-viet-dang-tin-tuyen-dung"));
const BiQuyetTuyenThoNailNhanhChoThuTiemNguoiViet = lazy(() => import("@/pages/blog/bi-quyet-tuyen-tho-nail-nhanh-cho-chu-tiem-nguoi-viet"));
const EmviAppCongDongNguoiVietTrongNganhLamDep = lazy(() => import("@/pages/blog/emviapp-cong-dong-nguoi-viet-trong-nganh-lam-dep"));

// SEO Programmatic Pages
const CategoryCityPage = lazy(() => import("@/pages/seo/CategoryCityPage"));
const CategoryOnlyPage = lazy(() => import("@/pages/seo/CategoryOnlyPage"));
const CityOnlyPage = lazy(() => import("@/pages/seo/CityOnlyPage"));

// Blog Category Pages - Dynamic
const DynamicBlogCategory = lazy(() => import("@/pages/blog/categories/DynamicBlogCategory"));

// Affiliate Program Pages
const AffiliatesLanding = lazy(() => import("@/pages/affiliate/AffiliatesLanding"));
const AffiliatePortal = lazy(() => import("@/pages/affiliate/AffiliatePortal"));
const AffiliateDashboard = lazy(() => import("@/pages/affiliate/AffiliateDashboard"));
import AffiliateLinks from '@/pages/affiliate/AffiliateLinks';
import AffiliatePayouts from '@/pages/affiliate/AffiliatePayouts';
import AffiliateAssets from '@/pages/affiliate/AffiliateAssets';
import AffiliateSettings from '@/pages/affiliate/AffiliateSettings';

const AffiliateTestPage = lazy(() => import("@/pages/AffiliateTestPage"));

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
const EmviMissionVision = lazy(() => import("@/pages/EmviMissionVision"));
const EmviAppPressPage = lazy(() => import("@/pages/press/EmviAppPressPage"));
const EmviAppPressDetailPage = lazy(() => import("@/pages/press/EmviAppPressDetailPage"));
const PressPage = lazy(() => import("@/pages/press"));
const OldPressPage = lazy(() => import("@/pages/PressPage"));
const InvestorsPartners = lazy(() => import("@/pages/InvestorsPartners"));
const PartnersThankYou = lazy(() => import("@/pages/PartnersThankYou"));
// Content Hub Pages
const BeautyJobs = lazy(() => import("@/pages/BeautyJobs"));
const HireBeautyProfessionals = lazy(() => import("@/pages/HireBeautyProfessionals"));
const ForSalons = lazy(() => import("@/pages/ForSalons"));
const ForArtists = lazy(() => import("@/pages/ForArtists"));
const PerformanceAudit = lazy(() => import("@/pages/PerformanceAudit"));
// City Landing Pages
const CityLandingPage = lazy(() => import("@/pages/cities/CityLandingPage"));

function App() {
  const location = useLocation();

  useEffect(() => {
    // Only scroll to top for specific navigation cases, not data updates
    // Preserve scroll position for better UX
    
    // Log route for debugging
    console.log('Current route:', location.pathname);
  }, [location.pathname]);

  return (
    <HelmetProvider>
      {/* Dev-only performance tools */}
      {!IS_PROD && PERF_OVERLAY ? <PerfOverlay /> : null}
      
      {/* Global Organization + Website JSON-LD */}
      <GlobalSEOInjection />
      <GeneralErrorBoundary>
        <SecurityProvider>
          <AuthProvider>
            <HubSpotProvider>
            <BookingNotificationProvider>
            <SalonProvider>
              <SubscriptionProvider>
                <NotificationProvider>
                    <RecommendationProvider>
                       <OnboardingProvider>
                        <RouteLogger />
                        <FirstTimeVisitorRedirect>
                             <Suspense fallback={<SimpleLoadingFallback message="Loading application..." />}>
                            <Routes>
                     
                      {/* Auth routes */}
                     <Route path="/login" element={<Suspense fallback={<SimpleLoadingFallback />}><SignIn /></Suspense>} />
                     <Route path="/signin" element={<Suspense fallback={<SimpleLoadingFallback />}><SignIn /></Suspense>} />
                     <Route path="/signup" element={<Suspense fallback={<SimpleLoadingFallback />}><SignUp /></Suspense>} />
                     {/* REMOVED: signup-fast-fomo route - contained popup modals */}
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
                      
                      {/* Booking Management route */}
                      <Route path="/bookings/manage" element={<Suspense fallback={<SimpleLoadingFallback />}><ManageBooking /></Suspense>} />
                    
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
                    
                       <Route path="/sitemap.xml" element={<Navigate to="https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/sitemap" replace />} />
                       <Route path="/sitemaps/news.xml" element={<Navigate to="https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/news-sitemap" replace />} />
                      
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
                <Route path="/artists/:role" element={<Suspense fallback={<SimpleLoadingFallback />}><RoleIndexPage /></Suspense>} />
                <Route path="/artists/cities/:cityState" element={<Suspense fallback={<SimpleLoadingFallback />}><CityIndexPage /></Suspense>} />
                <Route path="/artists/:role/:cityState" element={<Suspense fallback={<SimpleLoadingFallback />}><RoleCityPage /></Suspense>} />
                <Route path="/artists/:id" element={<Suspense fallback={<SimpleLoadingFallback />}><ArtistDetail /></Suspense>} />
                     <Route path="/booking-services" element={<Layout><BookingServices /></Layout>} />
                     
                     {/* Content Hub Pages */}
                     <Route path="/beauty-jobs" element={<Layout><Suspense fallback={<SimpleLoadingFallback />}><BeautyJobs /></Suspense></Layout>} />
                     <Route path="/hire-beauty-professionals" element={<Layout><Suspense fallback={<SimpleLoadingFallback />}><HireBeautyProfessionals /></Suspense></Layout>} />
                     <Route path="/for-salons" element={<Layout><Suspense fallback={<SimpleLoadingFallback />}><ForSalons /></Suspense></Layout>} />
                     <Route path="/for-artists" element={<Layout><Suspense fallback={<SimpleLoadingFallback />}><ForArtists /></Suspense></Layout>} />
                    
                    {/* Industry Pages */}
                    <Route path="/nails" element={<Layout><NailsPage /></Layout>} />
                    <Route path="/hair" element={<Layout><HairPage /></Layout>} />
                    <Route path="/barber" element={<Layout><BarberPage /></Layout>} />
                    <Route path="/massage" element={<Layout><MassagePage /></Layout>} />
                    <Route path="/skincare" element={<Layout><SkincarePage /></Layout>} />
                    <Route path="/makeup" element={<Layout><MakeupPage /></Layout>} />
                    <Route path="/brows-lashes" element={<Layout><BrowsLashesPage /></Layout>} />
                    <Route path="/tattoo" element={<Layout><TattooPage /></Layout>} />
                    
                       {/* SEO Programmatic Pages */}
                       <Route path="/seo/:category/:city" element={<Layout><Suspense fallback={<SimpleLoadingFallback />}><CategoryCityPage /></Suspense></Layout>} />
                       <Route path="/seo/category/:category" element={<Layout><Suspense fallback={<SimpleLoadingFallback />}><CategoryOnlyPage /></Suspense></Layout>} />
                       <Route path="/seo/city/:city" element={<Layout><Suspense fallback={<SimpleLoadingFallback />}><CityOnlyPage /></Suspense></Layout>} />
                       
                       {/* City Landing Pages - Programmatic SEO */}
                       <Route path="/cities/:citySlug/:categorySlug" element={<Layout><CityLandingPage /></Layout>} />
                      
                      <Route path="/about" element={<Layout><About /></Layout>} />
                     <Route path="/contact" element={<Layout><Contact /></Layout>} />
                     <Route path="/thank-you" element={<Suspense fallback={<SimpleLoadingFallback />}><ThankYou /></Suspense>} />
                     <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
                     <Route path="/performance" element={<Layout><PerformanceAudit /></Layout>} />
                      <Route path="/press" element={<Layout><PressPage /></Layout>} />
                      <Route path="/press/:slug" element={<Layout><EmviAppPressDetailPage /></Layout>} />
                      <Route path="/press/emviapp-ai-powered-growth-engine" element={<Layout><EmviAppPressPage /></Layout>} />
                     <Route path="/emviapp-mission-vision" element={<Layout><EmviMissionVision /></Layout>} />
                     <Route path="/partners" element={<Layout><InvestorsPartners /></Layout>} />
                     <Route path="/investors-partners" element={<Navigate to="/partners" replace />} />
                     <Route path="/partners/thank-you" element={<Layout><PartnersThankYou /></Layout>} />
                     <Route path="/terms" element={<Layout><Terms /></Layout>} />
                     <Route path="/refund" element={<Layout><Refund /></Layout>} />
                     <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
                     <Route path="/cookies" element={<Layout><Cookies /></Layout>} />
                    
                     {/* Homepage route - critical performance optimization */}
                      {/* Affiliate Program Routes */}
                      <Route path="/affiliates" element={<Suspense fallback={<SimpleLoadingFallback />}><AffiliatesLanding /></Suspense>} />
                      <Route path="/affiliate" element={
                        <ProtectedRoute>
                          <Suspense fallback={<SimpleLoadingFallback />}><AffiliatePortal /></Suspense>
                        </ProtectedRoute>
                      } />
                       <Route path="/affiliate/dashboard" element={
                         <ProtectedRoute>
                           <AffiliateDashboard />
                         </ProtectedRoute>
                       } />
                       <Route path="/affiliate/links" element={
                         <ProtectedRoute>
                           <AffiliateLinks />
                         </ProtectedRoute>
                       } />
                       <Route path="/affiliate/payouts" element={
                         <ProtectedRoute>
                           <AffiliatePayouts />
                         </ProtectedRoute>
                       } />
                       <Route path="/affiliate/assets" element={
                         <ProtectedRoute>
                           <AffiliateAssets />
                         </ProtectedRoute>
                       } />
                        <Route path="/affiliate/settings" element={
                          <ProtectedRoute>
                            <AffiliateSettings />
                          </ProtectedRoute>
                        } />
                        <Route path="/affiliate/test" element={
                          <ProtectedRoute>
                            <Suspense fallback={<SimpleLoadingFallback />}><AffiliateTestPage /></Suspense>
                          </ProtectedRoute>
                        } />

                      <Route path="/" element={<LazyIndex />} />
                      
                      {/* ... keep existing code (other routes) the same */}
                     {routes.map((route) => (
                       (route.path !== "/" && route.path !== "/salons" && route.path !== "/jobs" && route.path !== "/about" && 
                        route.path !== "/contact" && route.path !== "/terms" && route.path !== "/refund" &&
                        route.path !== "/privacy" && route.path !== "/cookies" && route.path !== "/post-job" &&
                        route.path !== "/sell-salon" && route.path !== "/salon-listing-success" && route.path !== "/profile") && (
                        <Route 
                          key={route.path}
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
                     
                     {/* New Blog Content Hub Routes */}
                     <Route path="/blog/how-to-find-the-best-beauty-professionals" element={<Layout><Suspense fallback={<SimpleLoadingFallback />}><HowToFindBestBeautyProfessionals /></Suspense></Layout>} />
                     <Route path="/blog/why-weekly-pay-attracts-better-artists" element={<Layout><Suspense fallback={<SimpleLoadingFallback />}><WhyWeeklyPayAttractsBetterArtists /></Suspense></Layout>} />
                     <Route path="/blog/top-salon-staffing-mistakes-to-avoid" element={<Layout><Suspense fallback={<SimpleLoadingFallback />}><TopSalonStaffingMistakesToAvoid /></Suspense></Layout>} />
                     <Route path="/blog/how-to-get-more-clients-as-a-nail-tech" element={<Layout><Suspense fallback={<SimpleLoadingFallback />}><HowToGetMoreClientsAsNailTech /></Suspense></Layout>} />
                     <Route path="/blog/the-future-of-beauty-industry-in-2025" element={<Layout><Suspense fallback={<SimpleLoadingFallback />}><FutureOfBeautyIndustryIn2025 /></Suspense></Layout>} />
                    <Route path="/blog/the-beauty-revolution" element={<Layout><TheBeautyRevolution /></Layout>} />
                    
                    {/* Migrated Blog Posts */}
                    <Route path="/blog/ai-salon-tools-2025" element={<Layout><AISalonTools2025 /></Layout>} />
                    <Route path="/blog/salon-staffing-crisis-2025" element={<Layout><SalonStaffingCrisis2025 /></Layout>} />
                    <Route path="/blog/nail-tech-salary-by-city-2025" element={<Layout><NailTechSalaryByCity2025 /></Layout>} />
                    <Route path="/blog/nail-artist-portfolio-examples" element={<Layout><NailArtistPortfolioExamples /></Layout>} />
                    <Route path="/blog/how-to-get-more-nail-clients" element={<Layout><HowToGetMoreNailClients /></Layout>} />
                     <Route path="/blog/nail-salon-interview-questions-answers" element={<Layout><NailSalonInterviewQuestionsAnswers /></Layout>} />
                     <Route path="/blog/hire-nail-technicians-interview-questions" element={<Layout><HireNailTechniciansInterviewQuestions /></Layout>} />
                    <Route path="/article/from-invisible-to-unstoppable" element={<Layout><ViralArticle /></Layout>} />
                    
                    {/* SEO Content Hub Posts */}
                    <Route path="/blog/nail-salon-growth-2025" element={<Layout><NailSalonGrowth2025 /></Layout>} />
                    <Route path="/blog/hiring-nail-artists" element={<Layout><HiringNailArtists /></Layout>} />
                    <Route path="/blog/5-star-reviews" element={<Layout><FiveStarReviews /></Layout>} />
                    <Route path="/blog/salon-marketing-2025" element={<Layout><SalonMarketing2025 /></Layout>} />
                    <Route path="/blog/nail-artists-best-jobs" element={<Layout><NailArtistsBestJobs /></Layout>} />
                    
                     {/* Latest SEO Articles (2025) */}
                     <Route path="/blog/nail-salon-hiring-crisis-2025" element={<Layout><NailSalonHiringCrisis2025 /></Layout>} />
                     <Route path="/blog/top-10-cities-nail-technicians-2025" element={<Layout><TopCitiesNailTechnicians2025 /></Layout>} />
                     <Route path="/blog/salon-owners-attract-hire-keep-artists" element={<Layout><SalonOwnersAttractHireKeepArtists /></Layout>} />
                     <Route path="/blog/500b-beauty-industry-hidden-job-market" element={<Layout><BeautyIndustryHiddenJobMarket /></Layout>} />
                     <Route path="/blog/side-hustle-six-figures-nail-technicians" element={<Layout><SideHustleSixFiguresNailTechnicians /></Layout>} />
                     
                     {/* Vietnamese Blog Articles */}
                     <Route path="/blog/ung-dung-tot-nhat-cho-nguoi-viet-tim-viec-nail" element={<Layout><UngDungTotNhatChoNguoiVietTimViecNail /></Layout>} />
                     <Route path="/blog/cach-dang-ban-tiem-nail-online-nhanh-hieu-qua" element={<Layout><CachDangBanTiemNailOnlineNhanhHieuQua /></Layout>} />
                     <Route path="/blog/top-5-website-uy-tin-cho-nguoi-viet-dang-tin-tuyen-dung" element={<Layout><Top5WebsiteUyTinChoNguoiVietDangTinTuyenDung /></Layout>} />
                     <Route path="/blog/bi-quyet-tuyen-tho-nail-nhanh-cho-chu-tiem-nguoi-viet" element={<Layout><BiQuyetTuyenThoNailNhanhChoThuTiemNguoiViet /></Layout>} />
                     <Route path="/blog/emviapp-cong-dong-nguoi-viet-trong-nganh-lam-dep" element={<Layout><EmviAppCongDongNguoiVietTrongNganhLamDep /></Layout>} />
                    
                    {/* Content Hub Routes */}
                    <Route path="/guides/nail-jobs-in-the-us" element={<Layout><NailJobsGuide /></Layout>} />
                    
                    {/* Dynamic blog article routes */}
                    <Route path="/blog/:category/:slug" element={<Layout><BlogArticlePage /></Layout>} />

                     {/* Blog Category Routes - Dynamic */}
                     <Route path="/blog/categories/:categorySlug" element={<Layout><DynamicBlogCategory /></Layout>} />
                    
                    {/* REMOVED: Hardcoded blog routes that conflict with dynamic routing */}
                    {/* All blog articles now use dynamic /blog/:category/:slug pattern */}
                    
                    {/* Team Invite Routes */}
                    <Route path="/invite/:inviteCode" element={<InviteAcceptance />} />
                    
                    {/* Freelancer Profile Route */}
                    <Route path="/freelancer/:profileId" element={<FreelancerProfile />} />
                        </Routes>
                       </Suspense>
                       
                       </FirstTimeVisitorRedirect>
        {/* Global Sunshine Chat Widget - renders on all routes and breakpoints */}
        <div id="sunshine-root" className="fixed bottom-4 right-4 z-[10000] md:bottom-6 md:right-6">
          <ChatSystem />
        </div>
        
        <Toaster />
                         <ConsentBanner />
                     </OnboardingProvider>
                  </RecommendationProvider>
              </NotificationProvider>
            </SubscriptionProvider>
          </SalonProvider>
            </BookingNotificationProvider>
         </HubSpotProvider>
         </AuthProvider>
        </SecurityProvider>
      </GeneralErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
