
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Jobs from "./pages/Jobs";
import Artists from "./pages/Artists";
import Salons from "./pages/Salons";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import ArtistDashboard from "./pages/dashboard/ArtistDashboard";
import SalonDashboard from "./pages/dashboard/SalonDashboard";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import FreelancerDashboard from "./pages/dashboard/FreelancerDashboard";
import SupplierDashboard from "./pages/dashboard/SupplierDashboard";
import OtherDashboard from "./pages/dashboard/OtherDashboard";
import ManagerDashboard from "./pages/dashboard/ManagerDashboard";
import PostJob from "./pages/PostJob";
import PostSalon from "./pages/PostSalon";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import RoleSelection from "./pages/RoleSelection";
import ArtistProfile from "./pages/ArtistProfile";
import SalonProfile from "./pages/SalonProfile";
import Community from "./pages/Community";
import Pricing from "./pages/Pricing";
import { Helmet, HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Helmet>
                <title>EmviApp - Connect with Beauty Professionals</title>
                <meta name="description" content="Connect with top nail artists, salons, and beauty professionals. Book appointments, discover services, and grow your beauty business." />
              </Helmet>
              <Routes>
                <Route path="/" element={<Layout><Index /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/jobs" element={<Layout><Jobs /></Layout>} />
                <Route path="/artists" element={<Layout><Artists /></Layout>} />
                <Route path="/salons" element={<Layout><Salons /></Layout>} />
                <Route path="/community" element={<Layout><Community /></Layout>} />
                <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
                
                {/* Auth routes */}
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/sign-up" element={<SignUp />} />
                
                {/* Dashboard routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/artist" element={<ArtistDashboard />} />
                <Route path="/dashboard/salon" element={<SalonDashboard />} />
                <Route path="/dashboard/customer" element={<CustomerDashboard />} />
                <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
                <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
                <Route path="/dashboard/other" element={<OtherDashboard />} />
                <Route path="/dashboard/manager" element={<ManagerDashboard />} />
                
                {/* Post routes */}
                <Route path="/post-job" element={<Layout><PostJob /></Layout>} />
                <Route path="/post-salon" element={<Layout><PostSalon /></Layout>} />
                
                {/* Profile routes */}
                <Route path="/profile" element={<Layout><Profile /></Layout>} />
                <Route path="/profile/edit" element={<Layout><EditProfile /></Layout>} />
                <Route path="/profile/role-selection" element={<Layout><RoleSelection /></Layout>} />
                <Route path="/artist/:id" element={<Layout><ArtistProfile /></Layout>} />
                <Route path="/salon/:id" element={<Layout><SalonProfile /></Layout>} />
                
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
