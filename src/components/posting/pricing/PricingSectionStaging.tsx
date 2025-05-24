
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
  usePremiumPricing = false // Default to false to preserve existing behavior
}) => {
  const [showPremiumPricing] = useState(usePremiumPricing);

  const handlePlanSelect = (plan: PricingPlan) => {
    console.log('Plan selected for testing:', plan);
    
    // Map the new plan structure to existing PricingOptions
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

  // For staging/testing purposes, we can toggle between old and new pricing
  if (showPremiumPricing) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4 mb-6">
          <div className="text-center text-purple-700 font-medium">
            🚀 STAGING: Premium Pricing Display
          </div>
          <div className="text-center text-sm text-purple-600 mt-1">
            This is the new AdCreative.ai-style pricing table for testing
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
