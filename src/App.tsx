import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/auth/AuthContext";
import { SubscriptionProvider } from "./context/subscription/SubscriptionProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Toaster } from "sonner";
import { useAuth } from "./context/auth";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import ArtistDashboard from "./pages/dashboard/Artist";
import SalonDashboard from "./pages/dashboard/Salon";
import OwnerDashboard from "./pages/dashboard/Owner";
import CustomerDashboard from "./pages/dashboard/Customer";
import SupplierDashboard from "./pages/dashboard/Supplier";
import FreelancerDashboard from "./pages/dashboard/Freelancer";
import JobBoard from "./pages/JobBoard";
import PostJob from "./pages/PostJob";
import Messages from "./pages/Messages";
import Team from "./pages/dashboard/salon/Team";
import SalonSettings from "./pages/dashboard/SalonSettings";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || ""
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <SubscriptionProvider>
          <Elements stripe={stripePromise}>
            <AppContent />
          </Elements>
        </SubscriptionProvider>
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      const currentPath = window.location.pathname;
      if (currentPath === "/sign-in" || currentPath === "/sign-up") {
        navigate("/dashboard");
      }
    }
  }, [isSignedIn, navigate]);

  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/artist" element={<ArtistDashboard />} />
        <Route path="/dashboard/salon" element={<SalonDashboard />} />
        <Route path="/dashboard/owner" element={<OwnerDashboard />} />
        <Route path="/dashboard/customer" element={<CustomerDashboard />} />
        <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
        <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
        <Route path="/job-board" element={<JobBoard />} />
        <Route path="/post/job" element={<PostJob />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/dashboard/salon/team" element={<Team />} />
        <Route path="/dashboard/salon/settings" element={<SalonSettings />} />
      </Routes>
    </>
  );
}

export default App;
