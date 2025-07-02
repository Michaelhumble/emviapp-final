
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/auth";
import { ProfileProvider } from "@/context/profile";
import { SalonProvider } from "@/context/salon";
import { NotificationProvider } from "@/context/notification";
import { SubscriptionProvider } from "@/context/subscription";
import { PostingProvider } from "@/context/posting";
import Layout from "@/components/layout/Layout";
import Index from "@/pages/Index";
import Artists from "@/pages/Artists";
import Salons from "@/pages/Salons";
import Jobs from "@/pages/Jobs";
import Community from "@/pages/Community";
import Dashboard from "@/pages/Dashboard";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/auth/SignUp";
import TestEnhancedSignUp from "@/pages/TestEnhancedSignUp";
import SignUpNew from "@/pages/auth/SignUpNew";
import ArtistProfile from "@/pages/ArtistProfile";
import SalonProfile from "@/pages/SalonProfile";
import PostJob from "@/pages/PostJob";
import PostSalon from "@/pages/posting/PostSalon";
import PostArtist from "@/pages/posting/PostArtist";
import PostBooth from "@/pages/posting/PostBooth";
import PostSupply from "@/pages/posting/PostSupply";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Cookies from "@/pages/Cookies";
import Pricing from "@/pages/Pricing";
import Search from "@/pages/Search";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProfileProvider>
        <SalonProvider>
          <NotificationProvider>
            <SubscriptionProvider>
              <PostingProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/artists" element={<Artists />} />
                        <Route path="/salons" element={<Salons />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/auth/signup" element={<SignUp />} />
                        <Route path="/auth/signup-new" element={<SignUpNew />} />
                        <Route path="/test-enhanced-signup" element={<TestEnhancedSignUp />} />
                        
                        {/* Redirect old sign-up route to new unified route */}
                        <Route path="/sign-up" element={<Navigate to="/auth/signup" replace />} />
                        
                        <Route path="/artist/:id" element={<ArtistProfile />} />
                        <Route path="/salon/:id" element={<SalonProfile />} />
                        <Route path="/post-job" element={<PostJob />} />
                        <Route path="/posting/salon" element={<PostSalon />} />
                        <Route path="/posting/artist" element={<PostArtist />} />
                        <Route path="/posting/booth" element={<PostBooth />} />
                        <Route path="/posting/supply" element={<PostSupply />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/cookies" element={<Cookies />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/search" element={<Search />} />
                      </Routes>
                    </Layout>
                  </BrowserRouter>
                </TooltipProvider>
              </PostingProvider>
            </SubscriptionProvider>
          </NotificationProvider>
        </SalonProvider>
      </ProfileProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
