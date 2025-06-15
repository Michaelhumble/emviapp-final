
import React from 'react';
import Layout from '@/components/layout/Layout';
import PersonalizedHero from '@/components/community/PersonalizedHero';
import CommunityDiscovery from '@/components/community/CommunityDiscovery';
import SuccessStoriesCarousel from '@/components/community/SuccessStoriesCarousel';
import RealTimeActivityFeed from '@/components/community/RealTimeActivityFeed';
import CommunityFeed from '@/components/community/CommunityFeed';
import CommunityQA from '@/components/community/CommunityQA';
import Leaderboards from '@/components/community/Leaderboards';
import TrustSignals from '@/components/community/TrustSignals';
import CommunityGuidelines from '@/components/community/CommunityGuidelines';

const Community = () => {
  return (
    <Layout hideFooter={true}>
      <div className="min-h-screen bg-white">
        {/* Personalized Hero with Dynamic Welcome */}
        <PersonalizedHero />
        
        {/* Trust Signals */}
        <TrustSignals />
        
        {/* Community Discovery Grid */}
        <CommunityDiscovery />
        
        {/* Success Stories Carousel */}
        <SuccessStoriesCarousel />
        
        {/* Real-Time Activity Feed */}
        <RealTimeActivityFeed />
        
        {/* Community Stories Feed */}
        <CommunityFeed />
        
        {/* Leaderboards & Achievements */}
        <Leaderboards />
        
        {/* Q&A Section */}
        <CommunityQA />
        
        {/* Community Guidelines */}
        <CommunityGuidelines />
      </div>
    </Layout>
  );
};

export default Community;
