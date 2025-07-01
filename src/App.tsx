import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { NotificationProvider } from "./context/notification";
import { ProfileProvider } from "./context/profile";
import { SubscriptionProvider } from "./context/subscription";
import { PricingProvider } from "./context/pricing";
import { ProfileCompletionProvider } from "./context/profile/ProfileCompletionProvider";
import { GoogleMapsProvider } from "./context/maps/GoogleMapsContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Artists from "./pages/Artists";
import Salons from "./pages/Salons";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ArtistProfile from "./pages/ArtistProfile";
import SalonProfile from "./pages/SalonProfile";
import JobDetail from "./pages/JobDetail";
import PostJob from "./pages/PostJob";
import BoothRentalDetail from "./pages/BoothRentalDetail";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Pricing from "./pages/Pricing";
import PostBoothRental from "./pages/PostBoothRental";
import PostSalonListing from "./pages/PostSalonListing";
import DashboardArtist from "./pages/dashboard/Artist";
import DashboardSalon from "./pages/dashboard/Salon";
import FreelancerDashboard from "./pages/dashboard/Freelancer";
import BookingCalendar from "./pages/dashboard/artist/BookingCalendar";
import Inbox from "./pages/dashboard/artist/Inbox";
import SalonNotFound from "./pages/SalonNotFound";
import OpportunityNotFound from "./pages/OpportunityNotFound";
import BoothNotFound from "./pages/BoothNotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <ProfileProvider>
            <SubscriptionProvider>
              <PricingProvider>
                <ProfileCompletionProvider>
                  <GoogleMapsProvider>
                    <TooltipProvider>
                      <Toaster />
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/dashboard/*" element={<Dashboard />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/artists" element={<Artists />} />
                        <Route path="/salons" element={<Salons />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/verify-email" element={<VerifyEmail />} />
                        <Route path="/artist/:artistId" element={<ArtistProfile />} />
                        <Route path="/salon/:salonId" element={<SalonProfile />} />
                        <Route path="/job/:jobId" element={<JobDetail />} />
                        <Route path="/post-job" element={<PostJob />} />
                        <Route path="/booth-rental/:boothRentalId" element={<BoothRentalDetail />} />
                        <Route path="/terms-of-service" element={<TermsOfService />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/post-booth-rental" element={<PostBoothRental />} />
                        <Route path="/post-salon-listing" element={<PostSalonListing />} />
                        <Route path="/dashboard/artist" element={<DashboardArtist />} />
                        <Route path="/dashboard/salon" element={<DashboardSalon />} />
                        <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
                        <Route path="/dashboard/artist/booking-calendar" element={<BookingCalendar />} />
                        <Route path="/dashboard/artist/inbox" element={<Inbox />} />
                        <Route path="/salon-not-found" element={<SalonNotFound />} />
                        <Route path="/opportunity-not-found" element={<OpportunityNotFound />} />
                        <Route path="/booth-not-found" element={<BoothNotFound />} />
                        <Route path="/unauthorized" element={<Unauthorized />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </TooltipProvider>
                  </GoogleMapsProvider>
                </ProfileCompletionProvider>
              </PricingProvider>
            </SubscriptionProvider>
          </ProfileProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
