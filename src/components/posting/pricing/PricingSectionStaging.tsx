
import React from 'react';
import JobPostOptions from '../job/JobPostOptions';
import { PricingOptions } from '@/utils/posting/types';

interface PricingSectionStagingProps {
  options: PricingOptions;
  onOptionsChange: (options: PricingOptions) => void;
  isFirstPost?: boolean;
  usePremiumPricing?: boolean;
}

const PricingSectionStaging: React.FC<PricingSectionStagingProps> = ({
  options,
  onOptionsChange,
  isFirstPost = false,
  usePremiumPricing = false // Disabled premium pricing for production
}) => {
  // Always use legacy pricing in production mode
  return (
    <JobPostOptions
      options={options}
      onOptionsChange={onOptionsChange}
      isFirstPost={isFirstPost}
    />
  );
};

export default PricingSectionStaging;
