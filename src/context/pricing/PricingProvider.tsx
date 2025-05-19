
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { PricingOptions, JobPricingTier } from "@/utils/posting/types";
import { getJobPrice } from "@/utils/posting/jobPricing";

// Create a context with proper typing for both the options and the calculated price
interface PricingContextType {
  pricingOptions: PricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<PricingOptions>>;
  priceData: {
    basePrice: number;
    originalPrice: number;
    finalPrice: number;
    discountPercentage: number;
    discountAmount: number;
    autoRenewDiscount: number;
    durationMonths: number;
    isFirstPost: boolean;
    isNationwide: boolean;
    selectedTier: JobPricingTier;
  };
}

// Create the context with default values
const PricingContext = createContext<PricingContextType | undefined>(undefined);

interface PricingProviderProps {
  children: ReactNode;
  initialOptions?: PricingOptions;
}

export const PricingProvider: React.FC<PricingProviderProps> = ({ 
  children, 
  initialOptions 
}) => {
  // Initialize with reasonable defaults based on PricingOptions type
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>(
    initialOptions || {
      selectedPricingTier: 'premium', // Default to premium tier
      durationMonths: 1,             // Default to 1 month
      autoRenew: true,               // Default to auto-renew enabled
      isFirstPost: true,             // Default for first post (eligible for free tier)
      isNationwide: false            // Default to local listing
    }
  );

  // Calculate price data whenever pricing options change
  const priceData = React.useMemo(() => {
    return getJobPrice(pricingOptions);
  }, [pricingOptions]);

  return (
    <PricingContext.Provider 
      value={{ 
        pricingOptions, 
        setPricingOptions,
        priceData
      }}
    >
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
