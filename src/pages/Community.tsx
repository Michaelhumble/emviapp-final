
import React from 'react';
import Layout from '@/components/layout/Layout';
import CommunityHero from '@/components/community/CommunityHero';
import AuthenticStories from '@/components/community/AuthenticStories';
import CommunityQA from '@/components/community/CommunityQA';
import LiveCommunityFeed from '@/components/community/LiveCommunityFeed';
import CommunityGuidelines from '@/components/community/CommunityGuidelines';
import TrustSignals from '@/components/community/TrustSignals';

const Community = () => {
  return (
    <Layout hideFooter={true}>
      <div className="min-h-screen bg-white">
        <CommunityHero />
        <TrustSignals />
        <AuthenticStories />
        <CommunityQA />
        <LiveCommunityFeed />
        <CommunityGuidelines />
      </div>
    </Layout>
  );
};

export default Community;
