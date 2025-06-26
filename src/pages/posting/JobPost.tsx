
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { JobPricingTier, PricingOptions } from '@/utils/posting/types';
import EnhancedPricingSection from '@/components/posting/pricing/EnhancedPricingSection';
import { PricingProvider } from '@/context/pricing/PricingProvider';

const JobPost = () => {
  const [selectedTier, setSelectedTier] = useState<JobPricingTier>('gold');
  const [options, setOptions] = useState<PricingOptions>({
    selectedPricingTier: 'gold',
    durationMonths: 1,
    autoRenew: true,
    isFirstPost: false
  });

  const handleTierSelect = (tier: JobPricingTier) => {
    setSelectedTier(tier);
    setOptions(prev => ({ ...prev, selectedPricingTier: tier }));
  };

  const handleOptionsChange = (newOptions: PricingOptions) => {
    setOptions(newOptions);
  };

  const handleProceed = () => {
    // Handle proceeding with the selected tier
    console.log('Proceeding with tier:', selectedTier, 'options:', options);
  };

  return (
    <Layout>
      <Helmet>
        <title>Post a Job | EmviApp</title>
        <meta name="description" content="Post your job listing and find the perfect talent for your salon" />
      </Helmet>
      
      <PricingProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
          <EnhancedPricingSection
            selectedTier={selectedTier}
            onTierSelect={handleTierSelect}
            options={options}
            onOptionsChange={handleOptionsChange}
            onProceed={handleProceed}
          />
        </div>
      </PricingProvider>
    </Layout>
  );
};

export default JobPost;
