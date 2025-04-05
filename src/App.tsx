import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuth } from "@/context/auth";
import { SiteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// Authentication
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";

// Custom Routes - General
import Index from "@/pages/Index";
import Welcome from "@/pages/Welcome";
import Jobs from "@/pages/Jobs";
import Artists from "@/pages/Artists";
import Salons from "@/pages/Salons";
import Suppliers from "@/pages/Suppliers";
import Freelancers from "@/pages/Freelancers";
import NailJobs from "@/pages/NailJobs";
import SalonOwners from "@/pages/SalonOwners";
import Customers from "@/pages/Customers";
import JobPostCTA from "@/pages/JobPostCTA";
import Profile from "@/pages/Profile";
import ProfileEdit from "@/pages/profile/edit";
import ProfileRedirect from "@/pages/profile/setup";
import ArtistSetup from "@/pages/profile/ArtistSetup";
import SalonSetup from "@/pages/profile/SalonSetup";
import CustomerSetup from "@/pages/profile/CustomerSetup";
import FreelancerSetup from "@/pages/profile/FreelancerSetup";
import RenterSetup from "@/pages/profile/RenterSetup";
import SupplierSetup from "@/pages/profile/SupplierSetup";
import OtherSetup from "@/pages/profile/OtherSetup";
import ProfilePage from "@/pages/profile/[username]";
import ProductPromotions from "@/pages/ProductPromotions";
import Messaging from "@/pages/Messaging";
import Messages from "@/pages/Messages";
import Analysis from "@/pages/Analysis";
import ManageJobs from "@/pages/ManageJobs";
import Checkout from "@/pages/Checkout";
import SalonMarketplace from "@/pages/SalonMarketplace";
import PostJob from "@/pages/PostJob";
import PostSalon from "@/pages/posting/SalonPost";
import SupplierDirectory from "@/pages/SupplierDirectory";
import NotFound from "@/pages/NotFound";

// Custom Routes - Dashboards
import Dashboard from "@/pages/dashboard/Dashboard";
import ArtistDashboard from "@/pages/dashboard/Artist";
import SalonDashboard from "@/pages/dashboard/Owner";
import CustomerDashboard from "@/pages/dashboard/Customer";
import SupplierDashboard from "@/pages/dashboard/Supplier";
import FreelancerDashboard from "@/pages/dashboard/Freelancer";
import OtherDashboard from "@/pages/dashboard/Other";

// Import visibility pages
import { VisibilityUpgrade, VisibilityStats } from "@/pages/visibility";

// Posting Routes
import PostingIndex from "@/pages/posting/Index";
import JobPost from "@/pages/posting/JobPost";
import SalonPost from "@/pages/posting/SalonPost";
import BoothPost from "@/pages/posting/BoothPost";

// Context Providers
import { AuthProvider } from "@/context/auth";
import { ProfileProvider } from "@/context/profile";
import { SubscriptionProvider } from "@/context/subscription";
import { ThemeProvider } from "@/components/theme-provider";

const App = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    document.title = SiteConfig.name;
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <ProfileProvider>
          <SubscriptionProvider>
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/welcome" element={<Welcome />} />

              {/* Authentication Routes */}
              <Route path="/auth">
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
              </Route>

              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/artist" element={<ArtistDashboard />} />
              <Route path="/dashboard/owner" element={<SalonDashboard />} />
              <Route path="/dashboard/customer" element={<CustomerDashboard />} />
              <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
              <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
              <Route path="/dashboard/other" element={<OtherDashboard />} />

              {/* Main Content Routes */}
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/salons" element={<Salons />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/freelancers" element={<Freelancers />} />
              <Route path="/nail-jobs" element={<NailJobs />} />
              <Route path="/salon-owners" element={<SalonOwners />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/jobs/post" element={<JobPostCTA />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<ProfileEdit />} />
              <Route path="/profile/setup" element={<ProfileRedirect />} /> 
              <Route path="/profile/artist/setup" element={<ArtistSetup />} />
              <Route path="/profile/salon/setup" element={<SalonSetup />} />
              <Route path="/profile/customer/setup" element={<CustomerSetup />} />
              <Route path="/profile/freelancer/setup" element={<FreelancerSetup />} />
              <Route path="/profile/renter/setup" element={<RenterSetup />} />
              <Route path="/profile/supplier/setup" element={<SupplierSetup />} />
              <Route path="/profile/other/setup" element={<OtherSetup />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
              <Route path="/product-promotions" element={<ProductPromotions />} />
              <Route path="/messaging" element={<Messaging />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/manage-jobs" element={<ManageJobs />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/salon-marketplace" element={<SalonMarketplace />} />
              <Route path="/post/job" element={<PostJob />} />
              <Route path="/post/salon" element={<PostSalon />} />
              <Route path="/supplier-directory" element={<SupplierDirectory />} />
              
              {/* Posting Routes */}
              <Route path="/posting" element={<PostingIndex />} />
              <Route path="/posting/job" element={<JobPost />} />
              <Route path="/posting/salon" element={<SalonPost />} />
              <Route path="/posting/booth" element={<BoothPost />} />

              {/* NEW: Visibility Routes */}
              <Route path="/visibility/upgrade" element={<VisibilityUpgrade />} />
              <Route path="/visibility/stats" element={<VisibilityStats />} />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SubscriptionProvider>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
