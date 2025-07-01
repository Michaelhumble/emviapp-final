
import React from 'react';
import Layout from '@/components/layout/Layout';
import CommunityHero from '@/components/community/CommunityHero';
import FeatureVotingBoard from '@/components/community/FeatureVotingBoard';
import InvestorQASection from '@/components/community/InvestorQASection';

const Community = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <CommunityHero />
        <FeatureVotingBoard />
        <InvestorQASection />
      </div>
    </Layout>
  );
};

export default Community;
