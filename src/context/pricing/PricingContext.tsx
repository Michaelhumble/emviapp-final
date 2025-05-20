
import { createContext, useContext } from 'react';
import { PricingOptions } from '@/utils/posting/types';

interface PricingContextType {
  pricingOptions: PricingOptions;
  setPricingOptions: (options: PricingOptions) => void;
}

export const PricingContext = createContext<PricingContextType>({
  pricingOptions: {
    selectedPricingTier: 'premium',
    durationMonths: 1,
    autoRenew: true,
    isFirstPost: true,
    isNationwide: false
  },
  setPricingOptions: () => {}
});

export const usePricing = () => useContext(PricingContext);

export default PricingContext;
