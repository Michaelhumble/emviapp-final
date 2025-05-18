
import { useState } from 'react';

export function useStripe() {
  const [isLoading, setIsLoading] = useState(false);
  
  // This is a mock implementation to make the types work
  // The actual implementation will come from the existing Stripe integration
  
  return {
    isLoading
  };
}
