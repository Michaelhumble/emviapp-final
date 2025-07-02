import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/auth";
import { SubscriptionProvider } from "@/context/subscription";
import { PostingProvider } from "@/context/posting";
import Layout from "@/components/layout/Layout";

const Home = lazy(() => import("@/pages/Home"));
const SignIn = lazy(() => import("@/pages/SignIn"));
const SignUpNew = lazy(() => import("@/pages/auth/SignUpNew"));
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const Salons = lazy(() => import("@/pages/Salons"));
const Artists = lazy(() => import("@/pages/Artists"));
const Jobs = lazy(() => import("@/pages/Jobs"));
const Search = lazy(() => import("@/pages/Search"));
const Contact = lazy(() => import("@/pages/Contact"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Community = lazy(() => import("@/pages/Community"));
const PostJob = lazy(() => import("@/pages/PostJob"));
const PostJobExperimental = lazy(() => import("@/pages/PostJobExperimental"));
const PostSalon = lazy(() => import("@/pages/posting/PostSalon"));
const PostArtist = lazy(() => import("@/pages/posting/PostArtist"));
const PostBooth = lazy(() => import("@/pages/posting/PostBooth"));
const PostSupply = lazy(() => import("@/pages/posting/PostSupply"));
const ArtistProfile = lazy(() => import("@/pages/a/artist-profile/[artistId]"));
const SalonProfile = lazy(() => import("@/pages/s/salon-profile/[salonId]"));
const TestEnhancedSignUp = lazy(() => import("@/pages/TestEnhancedSignUp"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SubscriptionProvider>
          <PostingProvider>
            <TooltipProvider>
              <Toaster />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout><Home /></Layout>} />
                  
                  {/* Redirect old sign-up route to new premium sign-up */}
                  <Route path="/sign-up" element={<Navigate to="/auth/signup" replace />} />
                  
                  <Route path="/auth/signup" element={<Layout hideNavbar><SignUpNew /></Layout>} />
                  <Route path="/sign-in" element={<Layout hideNavbar><SignIn /></Layout>} />
                  
                  <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                  <Route path="/salons" element={<Layout><Salons /></Layout>} />
                  <Route path="/artists" element={<Layout><Artists /></Layout>} />
                  <Route path="/jobs" element={<Layout><Jobs /></Layout>} />
                  <Route path="/search" element={<Layout><Search /></Layout>} />
                  <Route path="/contact" element={<Layout><Contact /></Layout>} />
                  <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
                  <Route path="/community" element={<Layout><Community /></Layout>} />
                  <Route path="/post-job" element={<Layout><PostJob /></Layout>} />
                  <Route path="/post-job-experimental" element={<Layout><PostJobExperimental /></Layout>} />
                  <Route path="/posting/post-salon" element={<Layout><PostSalon /></Layout>} />
                  <Route path="/posting/post-artist" element={<Layout><PostArtist /></Layout>} />
                  <Route path="/posting/post-booth" element={<Layout><PostBooth /></Layout>} />
                  <Route path="/posting/post-supply" element={<Layout><PostSupply /></Layout>} />
                  <Route path="/a/:artistId" element={<Layout><ArtistProfile /></Layout>} />
                  <Route path="/s/:salonId" element={<Layout><SalonProfile /></Layout>} />
                  <Route path="/test-enhanced-signup" element={<Layout><TestEnhancedSignUp /></Layout>} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </PostingProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
