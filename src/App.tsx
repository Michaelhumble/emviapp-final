
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/context/auth';

// Pages
import Home from "@/pages/Home";
import Jobs from "@/pages/Jobs";
import Salons from "@/pages/Salons";
import Opportunities from "@/pages/Opportunities";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import PostJob from "@/pages/post-job";
import SellSalonPage from "@/pages/sell-salon";
import SalonListingSuccess from "@/pages/salon-listing-success";

// Auth pages
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";

// Posting pages
import PostSalon from "@/pages/PostSalon";
import SalonPost from "@/pages/posting/SalonPost";
import SalonListingForm from "@/pages/salons/SalonListingForm";
import EnhancedPostJob from "@/pages/enhanced-post-job";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Router>
              <div className="min-h-screen bg-background font-sans antialiased">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/salons" element={<Salons />} />
                  <Route path="/opportunities" element={<Opportunities />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  
                  {/* Auth routes */}
                  <Route path="/auth/signin" element={<SignIn />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/auth/signup" element={<SignUp />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  
                  {/* Job posting routes */}
                  <Route path="/post-job" element={<PostJob />} />
                  <Route path="/enhanced-post-job" element={<EnhancedPostJob />} />
                  
                  {/* Salon posting routes */}
                  <Route path="/sell-salon" element={<SellSalonPage />} />
                  <Route path="/post-salon" element={<PostSalon />} />
                  <Route path="/salon-post" element={<SalonPost />} />
                  <Route path="/salon-listing-form" element={<SalonListingForm />} />
                  <Route path="/salon-listing-success" element={<SalonListingSuccess />} />
                </Routes>
              </div>
              <Toaster />
            </Router>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
