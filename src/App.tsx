
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SubscriptionProvider } from "./context/subscription";
import { ProfileProvider } from "./context/profile";
import { NotificationProvider } from "./context/notification";
import Index from "./pages/Index";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/Profile";
import Artists from "./pages/Artists";
import Salons from "./pages/Salons";
import Jobs from "./pages/Jobs";
import Community from "./pages/Community";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PostJob from "./pages/PostJob";
import SellSalon from "./pages/SellSalon";
import ArtistProfile from "./pages/a/artist-profile";
import SalonProfile from "./pages/SalonProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <SubscriptionProvider>
            <ProfileProvider>
              <NotificationProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/artists" element={<Artists />} />
                    <Route path="/salons" element={<Salons />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/post-job" element={<PostJob />} />
                    <Route path="/sell-salon" element={<SellSalon />} />
                    <Route path="/artist/:username" element={<ArtistProfile />} />
                    <Route path="/salon/:id" element={<SalonProfile />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </NotificationProvider>
            </ProfileProvider>
          </SubscriptionProvider>
        </AuthProvider>
      </TooltipProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
