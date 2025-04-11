
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/auth/AuthContext";
import { SubscriptionProvider } from "./context/subscription/SubscriptionProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Toaster } from "sonner";
import routes from "./routes";
import AppModifier from "./App-Modifier";
import ErrorBoundary from "./components/error/ErrorBoundary";

// Initialize Stripe with publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ""
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <AuthProvider>
      <SubscriptionProvider>
        <Elements stripe={stripePromise}>
          <AppModifier />
          <AppContent />
        </Elements>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const navigate = useNavigate();

  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <ErrorBoundary>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
