import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sonner } from 'sonner';

import Index from "@/pages/Index";
import Salons from "@/pages/Salons";
import SalonProfile from "@/pages/SalonProfile";
import Artists from "@/pages/Artists";
import ArtistProfile from "@/pages/ArtistProfile";
import Jobs from "@/pages/Jobs";
import PostJob from "@/pages/PostJob";
import SignIn from "@/pages/SignIn";
import Pricing from "@/pages/Pricing";
import Dashboard from "@/pages/Dashboard";
import EarlyAccess from "@/pages/EarlyAccess";
import SalonDashboard from "@/pages/dashboards/SalonDashboard";
import ArtistDashboard from "@/pages/dashboards/ArtistDashboard";
import CustomerDashboard from "@/pages/dashboards/CustomerDashboard";
import SignUpTest from "@/pages/SignUp";
import TestEnhancedSignUp from "@/pages/TestEnhancedSignUp";
import SignUpRedirect from "@/pages/SignUpRedirect";
import SignUpNew from "@/pages/auth/SignUpNew";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUpNew />} />
            <Route path="/sign-up" element={<SignUpRedirect />} />
            <Route path="/signup" element={<SignUpRedirect />} />
            <Route path="/salons" element={<Salons />} />
            <Route path="/salons/:salonId" element={<SalonProfile />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/:artistId" element={<ArtistProfile />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/early-access" element={<EarlyAccess />} />
            <Route path="/salon-dashboard" element={<SalonDashboard />} />
            <Route path="/artist-dashboard" element={<ArtistDashboard />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/sign-up-test" element={<SignUpTest />} />
            <Route path="/test-enhanced-signup" element={<TestEnhancedSignUp />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
