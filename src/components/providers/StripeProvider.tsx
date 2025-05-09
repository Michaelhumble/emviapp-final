
import { ReactNode } from 'react';

// We're conditionally importing Stripe to avoid build issues
// These will be loaded at runtime
let Elements: any;
let loadStripe: any;
let stripePromise: any;

// Use dynamic import to prevent build-time errors
if (typeof window !== 'undefined') {
  // This will only run in the browser
  import('@stripe/react-stripe-js').then(module => {
    Elements = module.Elements;
  });
  
  import('@stripe/stripe-js').then(module => {
    loadStripe = module.loadStripe;
    // Use Stripe's publishable key (this is safe to expose in frontend code)
    stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
  });
}

interface StripeProviderProps {
  children: ReactNode;
}

export function StripeProvider({ children }: StripeProviderProps) {
  // If we're not in a browser or if Elements isn't loaded yet, just render children
  if (typeof window === 'undefined' || !Elements) {
    return <>{children}</>;
  }

  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}
