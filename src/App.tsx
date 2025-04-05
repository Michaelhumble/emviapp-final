
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { SiteConfig } from "@/config/site";

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
import Profile from "@/pages/Profile";
import ProfileEdit from "@/pages/profile/edit";
import ProfilePage from "@/pages/profile/[username]";
import ProductPromotions from "@/pages/ProductPromotions";
import Messaging from "@/pages/Messaging";
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
import { AuthProvider } from "@/context/auth/AuthProvider";
import { ProfileProvider } from "@/context/profile/ProfileProvider";
import { SubscriptionProvider } from "@/context/subscription";
import { ThemeProvider } from "@/components/theme-provider";

const AppRoutes = () => {
  return (
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
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<ProfileEdit />} />
      <Route path="/profile/:username" element={<ProfilePage />} />
      <Route path="/product-promotions" element={<ProductPromotions />} />
      <Route path="/messaging" element={<Messaging />} />
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

      {/* Visibility Routes */}
      <Route path="/visibility/upgrade" element={<VisibilityUpgrade />} />
      <Route path="/visibility/stats" element={<VisibilityStats />} />
      
      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Router>
        <AuthProvider>
          <ProfileProvider>
            <SubscriptionProvider>
              <Toaster />
              <AppRoutes />
            </SubscriptionProvider>
          </ProfileProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
