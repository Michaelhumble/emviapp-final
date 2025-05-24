
import React, { useState } from 'react';
import PremiumPricingTable from './PremiumPricingTable';
import JobPostOptions from '../job/JobPostOptions';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';

interface PricingSectionStagingProps {
  options: PricingOptions;
  onOptionsChange: (options: PricingOptions) => void;
  isFirstPost?: boolean;
  usePremiumPricing?: boolean; // Feature flag for testing
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
}

const PricingSectionStaging: React.FC<PricingSectionStagingProps> = ({
  options,
  onOptionsChange,
  isFirstPost = false,
  usePremiumPricing = true // Changed default to true for visual review
}) => {
  const [showPremiumPricing] = useState(usePremiumPricing);

  const handlePlanSelect = (plan: PricingPlan) => {
    console.log('Plan selected for visual review:', plan);
    
    // Map the new plan structure to existing PricingOptions (for future integration)
    let tier: JobPricingTier = 'standard';
    let durationMonths = 1;
    
    switch (plan.id) {
      case 'standard':
        tier = 'standard';
        durationMonths = 1;
        break;
      case 'gold':
        tier = 'gold';
        durationMonths = 3;
        break;
      case 'diamond':
        tier = 'diamond';
        durationMonths = 12;
        break;
    }

    const updatedOptions: PricingOptions = {
      ...options,
      selectedPricingTier: tier,
      durationMonths,
      autoRenew: plan.id !== 'diamond', // Diamond doesn't auto-renew
      isFirstPost
    };

    onOptionsChange(updatedOptions);
  };

  // Show new premium pricing for visual review
  if (showPremiumPricing) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="text-center text-blue-700 font-medium">
            🎨 DESIGN REVIEW: Premium Pricing Display
          </div>
          <div className="text-center text-sm text-blue-600 mt-1">
            Visual preview only — No payment integration yet
          </div>
        </div>
        
        <PremiumPricingTable
          onPlanSelect={handlePlanSelect}
          selectedPlan={options.selectedPricingTier}
          isFirstPost={isFirstPost}
        />
      </div>
    );
  }

  // Default to existing pricing component
  return (
    <JobPostOptions
      options={options}
      onOptionsChange={onOptionsChange}
      isFirstPost={isFirstPost}
    />
  );
};

export default PricingSectionStaging;
