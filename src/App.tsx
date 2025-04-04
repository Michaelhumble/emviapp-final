
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Import pages
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import ArtistDashboard from "./pages/dashboard/Artist";
import SalonDashboard from "./pages/dashboard/Salon";
import OwnerDashboard from "./pages/dashboard/Owner";
import CustomerDashboard from "./pages/dashboard/Customer";
import SupplierDashboard from "./pages/dashboard/Supplier";
import FreelancerDashboard from "./pages/dashboard/Freelancer";
import OtherDashboard from "./pages/dashboard/Other";
import NotFoundRedirect from "./components/common/NotFoundRedirect";
import ProfileEdit from "./pages/profile/edit";
import ProfileRedirect from "./pages/profile/ProfileRedirect";
import OtherRoleSetup from "./pages/profile/other/setup";
import FreelancerSetup from "./pages/profile/freelancer/setup";
import SalonOwnerSetup from "./pages/profile/salon/setup";

// Import contexts
import { AuthProvider } from "./context/auth";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/profile/setup" element={<ProfileRedirect />} />
          <Route path="/profile/other/setup" element={<OtherRoleSetup />} />
          <Route path="/profile/freelancer/setup" element={<FreelancerSetup />} />
          <Route path="/profile/salon/setup" element={<SalonOwnerSetup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/artist" element={<ArtistDashboard />} />
          <Route path="/dashboard/salon" element={<SalonDashboard />} />
          <Route path="/dashboard/owner" element={<OwnerDashboard />} />
          <Route path="/dashboard/customer" element={<CustomerDashboard />} />
          <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
          <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
          <Route path="/dashboard/other" element={<OtherDashboard />} />
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
