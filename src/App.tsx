
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "@/context/notification";
import { AuthProvider } from "@/context/auth";
import { ProfileProvider } from "@/context/profile";
import { SubscriptionProvider } from "@/context/subscription";
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
import About from "./pages/About";
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SubscriptionProvider>
          <ProfileProvider>
            <NotificationProvider>
              <GoogleMapsProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Layout><Index /></Layout>} />
                      <Route path="/artists" element={<Layout><Artists /></Layout>} />
                      <Route path="/jobs" element={<Layout><Jobs /></Layout>} />
                      <Route path="/community" element={<Layout><Community /></Layout>} />
                      <Route path="/post-job" element={<Layout><PostJob /></Layout>} />
                      <Route path="/post-job-billion" element={<Layout><PostJobBillion /></Layout>} />
                      <Route path="/post-job-experimental" element={<Layout><PostJobExperimental /></Layout>} />
                      <Route path="/post-salon" element={<Layout><PostSalon /></Layout>} />
                      <Route path="/signup" element={<Layout><SignUp /></Layout>} />
                      <Route path="/about" element={<Layout><About /></Layout>} />
                      <Route path="/contact" element={<Layout><Contact /></Layout>} />
                      <Route path="/terms" element={<Layout><Terms /></Layout>} />
                      <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
                      <Route path="/cookies" element={<Layout><Cookies /></Layout>} />
                      <Route path="/refund" element={<Layout><Refund /></Layout>} />
                      <Route path="/salon-owners" element={<Layout><SalonOwners /></Layout>} />
                      <Route path="/dashboard/*" element={<Layout><Dashboard /></Layout>} />
                      <Route path="/settings" element={<Layout><Settings /></Layout>} />
                      <Route path="/welcome" element={<Layout><Welcome /></Layout>} />
                      <Route path="*" element={<Layout><NotFound /></Layout>} />
                    </Routes>
                  </BrowserRouter>
                </TooltipProvider>
              </GoogleMapsProvider>
            </NotificationProvider>
          </ProfileProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
