
import React, { createContext, useState, useContext, ReactNode } from "react";
import { PricingOptions } from "@/utils/posting/types";

// Create a context with proper typing
interface PricingContextType {
  pricingOptions: PricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<PricingOptions>>;
}

// Create the context with default values
const PricingContext = createContext<PricingContextType | undefined>(undefined);

interface PricingProviderProps {
  children: ReactNode;
}

export const PricingProvider: React.FC<PricingProviderProps> = ({ children }) => {
  // Initialize with reasonable defaults based on PricingOptions type
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'premium', // Default to premium tier
    durationMonths: 1,             // Default to 1 month
    autoRenew: true,               // Default to auto-renew enabled
    isFirstPost: true,             // Default for first post (eligible for free tier)
    isNationwide: false            // Default to local listing
  });

  return (
    <PricingContext.Provider value={{ pricingOptions, setPricingOptions }}>
      {children}
    </PricingContext.Provider>
  );
};

// Export the hook for consuming the context
export const usePricing = (): PricingContextType => {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error("usePricing must be used within a PricingProvider");
  }
  return context;
};
