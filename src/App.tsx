
import React from "react";
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/auth";
import { SubscriptionProvider } from "./context/subscription";
import { PricingProvider } from "./context/pricing/PricingProvider";
import { Toaster } from 'sonner';
import PostJob from "./pages/PostJob";
import PostSuccessPage from "./pages/post-success";
import PostWaitlistPage from "./pages/post-waitlist";

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <PricingProvider>
          <Routes>
            {/* Add minimal routes for job posting flow */}
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/post-success" element={<PostSuccessPage />} />
            <Route path="/post-waitlist" element={<PostWaitlistPage />} />

            {/* Fallback route */}
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
          <Toaster />
        </PricingProvider>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;
