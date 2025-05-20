
import React, { useState } from 'react';
import PricingContext from './PricingContext';
import { PricingOptions } from '@/utils/posting/types';

interface PricingProviderProps {
  children: React.ReactNode;
  initialOptions?: PricingOptions;
}

export const PricingProvider: React.FC<PricingProviderProps> = ({ children, initialOptions }) => {
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>(
    initialOptions || {
      selectedPricingTier: 'premium',
      durationMonths: 1,
      autoRenew: true,
      isFirstPost: true,
      isNationwide: false
    }
  );

  return (
    <PricingContext.Provider value={{
      pricingOptions,
      setPricingOptions
    }}>
      {children}
    </PricingContext.Provider>
  );
};

export default PricingProvider;
