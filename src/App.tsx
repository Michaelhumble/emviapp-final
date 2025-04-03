
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Salons from "./pages/Salons";
import SalonOwners from "./pages/SalonOwners";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Checkout from "./pages/Checkout";
import Messaging from "./pages/Messaging";
import Customers from "./pages/Customers";
import Artists from "./pages/Artists";
import Suppliers from "./pages/Suppliers";
import Analysis from "./pages/Analysis";
import PostJob from "./pages/PostJob";
import PostSalon from "./pages/PostSalon";
import CustomerDashboard from "./pages/dashboard/Customer";
import ArtistDashboard from "./pages/dashboard/Artist";
import OwnerDashboard from "./pages/dashboard/Owner";
import SupplierDashboard from "./pages/dashboard/Supplier";
import FreelancerDashboard from "./pages/dashboard/Freelancer";
import OtherDashboard from "./pages/dashboard/Other";
import Freelancers from "./pages/Freelancers";
import NailJobs from "./pages/NailJobs";
import SalonMarketplace from "./pages/SalonMarketplace";
import SupplierDirectory from "./pages/SupplierDirectory";
import ProductPromotions from "./pages/ProductPromotions";
import Welcome from "./pages/Welcome";

// Post Management System
import PostingIndex from "./pages/posting/Index";
import JobPost from "./pages/posting/JobPost";
import SalonPost from "./pages/posting/SalonPost";
import BoothPost from "./pages/posting/BoothPost";

// Profile Setup Pages
import ArtistSetup from "./pages/profile/artist/setup";
import SalonOwnerSetup from "./pages/profile/salon/setup";
import BoothRenterSetup from "./pages/profile/renter/setup";
import FreelancerSetup from "./pages/profile/freelancer/setup";
import CustomerSetup from "./pages/profile/customer/setup";
import SupplierSetup from "./pages/profile/supplier/setup";
import OtherRoleSetup from "./pages/profile/other/setup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/salons" element={<Salons />} />
            <Route path="/salon-owners" element={<SalonOwners />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/messages" element={<Messaging />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/freelancers" element={<Freelancers />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/post-salon" element={<PostSalon />} />
            <Route path="/welcome" element={<Welcome />} />
            
            <Route path="/nail-jobs" element={<NailJobs />} />
            <Route path="/salon-marketplace" element={<SalonMarketplace />} />
            <Route path="/supplier-directory" element={<SupplierDirectory />} />
            <Route path="/product-promotions" element={<ProductPromotions />} />
            
            <Route path="/posting" element={<PostingIndex />} />
            <Route path="/posting/job" element={<JobPost />} />
            <Route path="/posting/salon" element={<SalonPost />} />
            <Route path="/posting/booth" element={<BoothPost />} />
            
            <Route path="/dashboard/customer" element={<CustomerDashboard />} />
            <Route path="/dashboard/artist" element={<ArtistDashboard />} />
            <Route path="/dashboard/owner" element={<OwnerDashboard />} />
            <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
            <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
            <Route path="/dashboard/other" element={<OtherDashboard />} />
            
            <Route path="/artists/profile-setup" element={<ArtistSetup />} />
            <Route path="/salon/profile-setup" element={<SalonOwnerSetup />} />
            <Route path="/freelancers/profile-setup" element={<FreelancerSetup />} />
            <Route path="/customers/profile-setup" element={<CustomerSetup />} />
            <Route path="/vendors/profile-setup" element={<SupplierSetup />} />
            <Route path="/other/profile-setup" element={<OtherRoleSetup />} />
            <Route path="/profile/renter/setup" element={<BoothRenterSetup />} />
            
            <Route path="/profile/artist/setup" element={<ArtistSetup />} />
            <Route path="/profile/salon/setup" element={<SalonOwnerSetup />} />
            <Route path="/profile/freelancer/setup" element={<FreelancerSetup />} />
            <Route path="/profile/customer/setup" element={<CustomerSetup />} />
            <Route path="/profile/supplier/setup" element={<SupplierSetup />} />
            <Route path="/profile/other/setup" element={<OtherRoleSetup />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
