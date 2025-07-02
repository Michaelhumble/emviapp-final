import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/auth";
import { NotificationProvider } from "@/context/notification";
import { SubscriptionProvider } from "@/context/subscription";
import { ProfileProvider } from "@/context/profile";
import { PricingProvider } from "@/context/pricing";
import { GoogleMapsProvider } from "@/context/maps/GoogleMapsContext";
import { BookingNotificationProvider } from "@/components/BookingNotificationProvider";
import Index from "./pages/Index";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import Artists from "./pages/Artists";
import Salons from "./pages/Salons";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Messages from "./pages/Messages";
import Upgrade from "./pages/Upgrade";
import Admin from "./pages/Admin";
import SalonDashboard from "./pages/dashboard/SalonDashboard";
import ArtistDashboard from "./pages/dashboard/ArtistDashboard";
import SalonVisibility from "./pages/dashboard/salon/SalonVisibility";
import SalonBookings from "./pages/dashboard/salon/SalonBookings";
import SalonStaff from "./pages/dashboard/salon/SalonStaff";
import SalonServices from "./pages/dashboard/salon/SalonServices";
import ArtistServices from "./pages/dashboard/artist/ArtistServices";
import ArtistBookings from "./pages/dashboard/artist/ArtistBookings";
import JobDetail from "./pages/JobDetail";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <SubscriptionProvider>
                <ProfileProvider>
                  <PricingProvider>
                    <GoogleMapsProvider>
                      <BookingNotificationProvider>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/jobs" element={<Jobs />} />
                          <Route path="/artists" element={<Artists />} />
                          <Route path="/salons" element={<Salons />} />
                          <Route path="/community" element={<Community />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/profile/edit" element={<EditProfile />} />
                          <Route path="/messages" element={<Messages />} />
                          <Route path="/upgrade" element={<Upgrade />} />
                          <Route path="/admin" element={<Admin />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/privacy" element={<Privacy />} />
                          <Route path="/terms" element={<Terms />} />

                          {/* Dashboard Routes */}
                          <Route path="/dashboard/salon" element={<SalonDashboard />} />
                          <Route path="/dashboard/artist" element={<ArtistDashboard />} />

                          {/* Salon Routes */}
                          <Route path="/visibility/upgrade" element={<SalonVisibility />} />
                          <Route path="/bookings/salon" element={<SalonBookings />} />
                          <Route path="/staff/salon" element={<SalonStaff />} />
                          <Route path="/services/salon" element={<SalonServices />} />

                          {/* Artist Routes */}
                          <Route path="/services/artist" element={<ArtistServices />} />
                          <Route path="/bookings/artist" element={<ArtistBookings />} />

                          {/* Job Routes */}
                          <Route path="/jobs/:id" element={<JobDetail />} />
                          <Route path="/jobs/create" element={<CreateJob />} />
                          <Route path="/jobs/:id/edit" element={<EditJob />} />

                          <Route path="/checkout-success" element={<CheckoutSuccess />} />
                          <Route path="/checkout-cancel" element={<CheckoutCancel />} />

                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </BookingNotificationProvider>
                    </GoogleMapsProvider>
                  </PricingProvider>
                </ProfileProvider>
              </SubscriptionProvider>
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
