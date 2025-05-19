
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { calculateJobPostPrice } from '@/utils/posting/jobPricing';

interface PricingContextType {
  pricingOptions: PricingOptions;
  updatePricingOptions: (options: Partial<PricingOptions>) => void;
  calculatePrice: () => {
    finalPrice: number;
    originalPrice: number;
    discountPercentage: number;
  };
  priceData: {
    finalPrice: number;
    originalPrice: number;
    discountPercentage: number;
  };
}

// Default pricing options
const defaultPricingOptions: PricingOptions = {
  selectedPricingTier: 'premium' as JobPricingTier,
  durationMonths: 1,
  autoRenew: true,
  isFirstPost: true,
  isNationwide: false
};

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export function PricingProvider({ children, initialOptions }: { children: ReactNode, initialOptions?: Partial<PricingOptions> }) {
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    ...defaultPricingOptions,
    ...initialOptions
  });
  
  const [priceData, setPriceData] = useState(() => calculateJobPostPrice(pricingOptions));

  const updatePricingOptions = (options: Partial<PricingOptions>) => {
    const newOptions = { ...pricingOptions, ...options };
    setPricingOptions(newOptions);
    
    // Recalculate price when options change
    const newPriceData = calculateJobPostPrice(newOptions);
    setPriceData(newPriceData);
    
    // Debug logging
    console.log('[PricingContext] Updated options:', newOptions);
    console.log('[PricingContext] New price data:', newPriceData);
  };

  const calculatePrice = () => {
    const calculatedPrice = calculateJobPostPrice(pricingOptions);
    console.log('[PricingContext] Calculated price:', calculatedPrice);
    return calculatedPrice;
  };

  return (
    <PricingContext.Provider value={{ 
      pricingOptions, 
      updatePricingOptions, 
      calculatePrice,
      priceData
    }}>
      {children}
    </PricingContext.Provider>
  );
}

export function usePricing() {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
}
