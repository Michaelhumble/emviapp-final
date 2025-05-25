
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import PricingSection from '@/components/posting/pricing/PricingSection';

const JobPost = () => {
  const [selectedTier, setSelectedTier] = useState<JobPricingTier>('premium');
  const [options, setOptions] = useState<PricingOptions>({
    selectedPricingTier: 'premium',
    durationMonths: 1,
    autoRenew: false,
    isFirstPost: false
  });

  const handleTierSelect = (tier: JobPricingTier) => {
    setSelectedTier(tier);
    setOptions(prev => ({ ...prev, selectedPricingTier: tier }));
  };

  const handleProceed = () => {
    // Handle proceeding with the selected tier
    console.log('Proceeding with tier:', selectedTier);
  };

  return (
    <Layout>
      <Helmet>
        <title>Post a Job | EmviApp</title>
      </Helmet>
      
      <div className="container mx-auto py-8">
        <PricingSection
          selectedTier={selectedTier}
          onTierSelect={handleTierSelect}
          options={options}
          onProceed={handleProceed}
        />
      </div>
    </Layout>
  );
};

export default JobPost;
