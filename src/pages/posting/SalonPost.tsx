
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';

const SalonPost = () => {
  const [selectedTier, setSelectedTier] = useState<JobPricingTier>('premium');
  const [options] = useState<PricingOptions>({
    selectedPricingTier: 'premium',
    durationMonths: 1,
    autoRenew: false,
    isFirstPost: false
  });

  return (
    <Layout>
      <Helmet>
        <title>Post a Salon | EmviApp</title>
      </Helmet>
      
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Post Your Salon</h1>
        <p>Selected tier: {selectedTier}</p>
        <p>Pricing options: {JSON.stringify(options, null, 2)}</p>
      </div>
    </Layout>
  );
};

export default SalonPost;
