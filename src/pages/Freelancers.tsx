
import React from 'react';
import Layout from '@/components/layout/Layout';
import PremiumCommunityHero from '@/components/community/PremiumCommunityHero';
import CommunityStories from '@/components/community/CommunityStories';
import CommunityQA from '@/components/community/CommunityQA';
import SpotlightStories from '@/components/community/SpotlightStories';
import TrustSignals from '@/components/community/TrustSignals';

const Freelancers = () => {
  return (
    <Layout hideFooter={true}>
      <div className="min-h-screen bg-white">
        {/* Premium Hero with Emotional Hook */}
        <PremiumCommunityHero />

        {/* Trust & Social Proof */}
        <TrustSignals />

        {/* Interactive Story Sharing */}
        <CommunityStories />

        {/* Educational Q&A Platform */}
        <CommunityQA />

        {/* Member Success Spotlights */}
        <SpotlightStories />
      </div>
    </Layout>
  );
};

export default Freelancers;
