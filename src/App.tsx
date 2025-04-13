import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth";
import { ProfileProvider } from "@/context/profile";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";
import { SubscriptionProvider } from "@/context/subscription";
import { NotificationProvider } from "@/context/notification";
import { GoogleMapsProvider } from "@/context/maps";

// Pages
import Index from "@/pages/Index";
import Jobs from "@/pages/Jobs";
import Artists from "@/pages/Artists";
import ArtistDetails from "@/pages/ArtistDetails";
import Salons from "@/pages/Salons";
import SalonDetails from "@/pages/SalonDetails";
import SalonSales from "@/pages/SalonSales";
import Pricing from "@/pages/Pricing";
import Support from "@/pages/Support";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/dashboard/Dashboard";
import Bookings from "@/pages/dashboard/Bookings";
import Profile from "@/pages/dashboard/Profile";
import Wallet from "@/pages/dashboard/Wallet";
import Notifications from "@/pages/dashboard/Notifications";
import MySalons from "@/pages/dashboard/MySalons";
import MyJobs from "@/pages/dashboard/MyJobs";
import MyNetwork from "@/pages/dashboard/MyNetwork";
import MySubscription from "@/pages/dashboard/MySubscription";
import SalonAvailabilityManager from "@/components/dashboard/salon/SalonAvailabilityManager";
import SalonMessagingCenter from "@/components/dashboard/salon/SalonMessagingCenter";
import SalonProfileEditor from "@/components/dashboard/salon/SalonProfileEditor";
import JobPostEditor from "@/components/dashboard/jobs/JobPostEditor";
import ArtistProfileEditor from "@/components/dashboard/artist/ArtistProfileEditor";
import ArtistAvailabilityManager from "@/components/dashboard/artist/ArtistAvailabilityManager";
import ArtistPortfolioManager from "@/components/dashboard/artist/ArtistPortfolioManager";
import ArtistSubscription from "@/components/dashboard/artist/ArtistSubscription";
import ArtistPayouts from "@/components/dashboard/artist/ArtistPayouts";
import ArtistAnalytics from "@/components/dashboard/artist/ArtistAnalytics";
import SalonAnalytics from "@/components/dashboard/salon/SalonAnalytics";
import SalonSubscription from "@/components/dashboard/salon/SalonSubscription";
import SalonPayouts from "@/components/dashboard/salon/SalonPayouts";
import EditJobPost from "@/components/dashboard/jobs/EditJobPost";
import EditSalonSale from "@/components/dashboard/salon-sales/EditSalonSale";
import SalonSaleEditor from "@/components/dashboard/salon-sales/SalonSaleEditor";
import ArtistMessagingCenter from "@/components/dashboard/artist/ArtistMessagingCenter";

// Global styles
import "@/styles/globals.css";
import "@/styles/chat.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <ProfileProvider>
            <ProfileCompletionProvider>
              <SubscriptionProvider>
                <NotificationProvider>
                  <GoogleMapsProvider>
                    <Toaster position="top-center" richColors />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/jobs" element={<Jobs />} />
                      <Route path="/jobs/:id" element={<EditJobPost />} />
                      <Route path="/artists" element={<Artists />} />
                      <Route path="/artists/:id" element={<ArtistDetails />} />
                      <Route path="/salons" element={<Salons />} />
                      <Route path="/salons/:id" element={<SalonDetails />} />
                      <Route path="/salon-sales" element={<SalonSales />} />
                      <Route path="/salon-sales/:id" element={<EditSalonSale />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="*" element={<NotFound />} />

                      {/* Dashboard Routes */}
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/dashboard/bookings" element={<Bookings />} />
                      <Route path="/dashboard/profile" element={<Profile />} />
                      <Route path="/dashboard/wallet" element={<Wallet />} />
                      <Route path="/dashboard/notifications" element={<Notifications />} />
                      <Route path="/dashboard/my-salons" element={<MySalons />} />
                      <Route path="/dashboard/my-jobs" element={<MyJobs />} />
                      <Route path="/dashboard/my-network" element={<MyNetwork />} />
                      <Route path="/dashboard/subscription" element={<MySubscription />} />

                      {/* Salon Dashboard Routes */}
                      <Route path="/dashboard/salon/availability" element={<SalonAvailabilityManager />} />
                      <Route path="/dashboard/salon/messaging" element={<SalonMessagingCenter />} />
                      <Route path="/dashboard/salon/profile-editor" element={<SalonProfileEditor />} />
                      <Route path="/dashboard/salon/job-post-editor" element={<JobPostEditor />} />
                      <Route path="/dashboard/salon/salon-sale-editor" element={<SalonSaleEditor />} />
                      <Route path="/dashboard/salon/analytics" element={<SalonAnalytics />} />
                      <Route path="/dashboard/salon/subscription" element={<SalonSubscription />} />
                      <Route path="/dashboard/salon/payouts" element={<SalonPayouts />} />

                      {/* Artist Dashboard Routes */}
                      <Route path="/dashboard/artist/profile-editor" element={<ArtistProfileEditor />} />
                      <Route path="/dashboard/artist/availability" element={<ArtistAvailabilityManager />} />
                      <Route path="/dashboard/artist/portfolio" element={<ArtistPortfolioManager />} />
                      <Route path="/dashboard/artist/subscription" element={<ArtistSubscription />} />
                      <Route path="/dashboard/artist/payouts" element={<ArtistPayouts />} />
                      <Route path="/dashboard/artist/analytics" element={<ArtistAnalytics />} />
                      <Route path="/dashboard/artist/messaging" element={<ArtistMessagingCenter />} />
                    </Routes>
                  </GoogleMapsProvider>
                </NotificationProvider>
              </SubscriptionProvider>
            </ProfileCompletionProvider>
          </ProfileProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
