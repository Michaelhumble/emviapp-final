
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/auth";
import { NotificationProvider } from "@/context/notification";
import { SubscriptionProvider } from "@/context/subscription";
import { ProfileProvider } from "@/context/profile";
import { GoogleMapsProvider } from "@/context/maps/GoogleMapsContext";
import { BookingNotificationProvider } from "@/components/BookingNotificationProvider";
import Index from "./pages/Index";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import Artists from "./pages/Artists";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import SalonDashboard from "./pages/dashboard/SalonDashboard";
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
                  <GoogleMapsProvider>
                    <BookingNotificationProvider>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/artists" element={<Artists />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />

                        {/* Dashboard Routes */}
                        <Route path="/dashboard/salon" element={<SalonDashboard />} />

                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </BookingNotificationProvider>
                  </GoogleMapsProvider>
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
