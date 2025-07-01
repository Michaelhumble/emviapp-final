import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "@/context/notification";
import { AuthProvider } from "@/context/auth";
import { ProfileProvider } from "@/context/profile";
import { SubscriptionProvider } from "@/context/subscription";
import { PricingProvider } from "@/context/pricing";
import { GoogleMapsProvider } from "@/context/maps/GoogleMapsContext";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Artists from "./pages/Artists";
import Jobs from "./pages/Jobs";
import PostJob from "./pages/PostJob";
import PostJobBillion from "./pages/PostJobBillion";
import PostJobExperimental from "./pages/PostJobExperimental";
import PostSalon from "./pages/PostSalon";
import SignUp from "./pages/SignUp";
import About from "./pages/About.routes";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Refund from "./pages/Refund";
import SalonOwners from "./pages/SalonOwners";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/Settings";
import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import ArtistProfile from "./pages/ArtistProfile";
import SalonProfile from "./pages/SalonProfile";
import JobDetail from "./pages/JobDetail";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SubscriptionProvider>
          <PricingProvider>
            <ProfileProvider>
              <NotificationProvider>
                <GoogleMapsProvider>
                  <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                      <Routes>
                        <Route path="/" element={<Layout />}>
                          <Route index element={<Index />} />
                          <Route path="artists" element={<Artists />} />
                          <Route path="jobs" element={<Jobs />} />
                          <Route path="community" element={<Community />} />
                          <Route path="post-job" element={<PostJob />} />
                          <Route path="post-job-billion" element={<PostJobBillion />} />
                          <Route path="post-job-experimental" element={<PostJobExperimental />} />
                          <Route path="post-salon" element={<PostSalon />} />
                          <Route path="signup" element={<SignUp />} />
                          <Route path="about" element={<About />} />
                          <Route path="contact" element={<Contact />} />
                          <Route path="terms" element={<Terms />} />
                          <Route path="privacy" element={<Privacy />} />
                          <Route path="cookies" element={<Cookies />} />
                          <Route path="refund" element={<Refund />} />
                          <Route path="salon-owners" element={<SalonOwners />} />
                          <Route path="dashboard/*" element={<Dashboard />} />
                          <Route path="settings" element={<Settings />} />
                          <Route path="welcome" element={<Welcome />} />
                          <Route path="artist/:artistId" element={<ArtistProfile />} />
                          <Route path="salon/:salonId" element={<SalonProfile />} />
                          <Route path="job/:jobId" element={<JobDetail />} />
                          <Route path="*" element={<NotFound />} />
                        </Route>
                      </Routes>
                    </BrowserRouter>
                  </TooltipProvider>
                </GoogleMapsProvider>
              </NotificationProvider>
            </ProfileProvider>
          </PricingProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
