
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
import CustomerDashboard from "./pages/dashboard/Customer";
import ArtistDashboard from "./pages/dashboard/Artist";
import OwnerDashboard from "./pages/dashboard/Owner";
import SupplierDashboard from "./pages/dashboard/Supplier";

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
            <Route path="/analysis" element={<Analysis />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard/customer" element={<CustomerDashboard />} />
            <Route path="/dashboard/artist" element={<ArtistDashboard />} />
            <Route path="/dashboard/owner" element={<OwnerDashboard />} />
            <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
