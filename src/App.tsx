import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/auth";
import { NotificationProvider } from "@/context/notification";
import { SubscriptionProvider } from "@/context/subscription";
import { PricingProvider } from "@/context/pricing";
import { GoogleMapsProvider } from "@/context/maps/GoogleMapsContext";

// Layout components
import Layout from "@/components/layout/Layout";
import AuthGuard from "@/components/auth/AuthGuard";
import ErrorLayout from "@/components/layout/ErrorLayout";

// Page imports
import Index from "@/pages/Index";
import Artists from "@/pages/Artists";
import Jobs from "@/pages/Jobs";
import PostJob from "@/pages/PostJob";
import PostSalon from "@/pages/PostSalon";
import Community from "@/pages/Community";
import Contact from "@/pages/Contact";
import About from "@/pages/About.routes";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Refund from "@/pages/Refund";
import Cookies from "@/pages/Cookies";
import NotFound from "@/pages/NotFound";
import CheckoutFallback from "@/pages/CheckoutFallback";
import Welcome from "@/pages/Welcome";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import Settings from "@/pages/Settings";
import SalonOwners from "@/pages/SalonOwners";
import CreateJobPosting from "@/pages/CreateJobPosting";
import PostJobBillion from "@/pages/PostJobBillion";
import PostJobExperimental from "@/pages/PostJobExperimental";
import TestEnhancedSignUp from "@/pages/TestEnhancedSignUp";
import Analysis from "@/pages/Analysis";

// Dashboard imports
import Dashboard from "@/pages/dashboard/Dashboard";
import Customer from "@/pages/dashboard/Customer";
import Artist from "@/pages/dashboard/Artist";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import Freelancer from "@/pages/dashboard/Freelancer";
import Manager from "@/pages/dashboard/Manager";
import Supplier from "@/pages/dashboard/Supplier";
import Other from "@/pages/dashboard/Other";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <SubscriptionProvider>
                <PricingProvider>
                  <GoogleMapsProvider>
                    <Routes>
                      {/* Public routes */}
                      <Route path="/" element={<Layout><Index /></Layout>} />
                      <Route path="/artists" element={<Layout><Artists /></Layout>} />
                      <Route path="/jobs" element={<Layout><Jobs /></Layout>} />
                      <Route path="/post-job" element={<Layout><PostJob /></Layout>} />
                      <Route path="/post-salon" element={<Layout><PostSalon /></Layout>} />
                      <Route path="/community" element={<Layout><Community /></Layout>} />
                      <Route path="/contact" element={<Layout><Contact /></Layout>} />
                      <Route path="/about/*" element={<Layout><About /></Layout>} />
                      <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
                      <Route path="/terms" element={<Layout><Terms /></Layout>} />
                      <Route path="/refund" element={<Layout><Refund /></Layout>} />
                      <Route path="/cookies" element={<Layout><Cookies /></Layout>} />
                      <Route path="/checkout-fallback" element={<CheckoutFallback />} />
                      <Route path="/salon-owners" element={<Layout><SalonOwners /></Layout>} />
                      <Route path="/create-job-posting" element={<Layout><CreateJobPosting /></Layout>} />
                      <Route path="/post-job-billion" element={<Layout><PostJobBillion /></Layout>} />
                      <Route path="/post-job-experimental" element={<Layout><PostJobExperimental /></Layout>} />
                      <Route path="/test-enhanced-signup" element={<Layout><TestEnhancedSignUp /></Layout>} />
                      <Route path="/analysis" element={<Layout><Analysis /></Layout>} />
                      
                      {/* Authentication routes */}
                      <Route path="/signin" element={<SignIn />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/welcome" element={<Welcome />} />
                      
                      {/* Protected routes */}
                      <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
                      
                      {/* Dashboard routes */}
                      <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
                      <Route path="/dashboard/customer" element={<AuthGuard><Customer /></AuthGuard>} />
                      <Route path="/dashboard/artist" element={<AuthGuard><Artist /></AuthGuard>} />
                      <Route path="/dashboard/owner" element={<AuthGuard><RoleDashboardLayout /></AuthGuard>} />
                      <Route path="/dashboard/freelancer" element={<AuthGuard><Freelancer /></AuthGuard>} />
                      <Route path="/dashboard/manager" element={<AuthGuard><Manager /></AuthGuard>} />
                      <Route path="/dashboard/supplier" element={<AuthGuard><Supplier /></AuthGuard>} />
                      <Route path="/dashboard/other" element={<AuthGuard><Other /></AuthGuard>} />
                      
                      {/* Catch all route */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </GoogleMapsProvider>
                </PricingProvider>
              </SubscriptionProvider>
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
