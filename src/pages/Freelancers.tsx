
import React from 'react';
import Layout from '@/components/layout/Layout';
import UltraPremiumHero from '@/components/community/UltraPremiumHero';
import ViralSuccessStories from '@/components/community/ViralSuccessStories';
import LiveMemberActivity from '@/components/community/LiveMemberActivity';
import ExclusiveOpportunities from '@/components/community/ExclusiveOpportunities';
import CommunityImpactStats from '@/components/community/CommunityImpactStats';
import MemberSpotlight from '@/components/community/MemberSpotlight';
import UrgentCTA from '@/components/community/UrgentCTA';

const Freelancers = () => {
  return (
    <Layout hideFooter={true}>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Ultra Premium Hero with FOMO */}
        <UltraPremiumHero />

        {/* Live Community Impact Stats */}
        <CommunityImpactStats />

        {/* Viral Success Stories */}
        <ViralSuccessStories />

        {/* Live Member Activity Feed */}
        <LiveMemberActivity />

        {/* Member Spotlight */}
        <MemberSpotlight />

        {/* Exclusive Opportunities */}
        <ExclusiveOpportunities />

        {/* Urgent CTA */}
        <UrgentCTA />
      </div>
    </Layout>
  );
};

export default Freelancers;
