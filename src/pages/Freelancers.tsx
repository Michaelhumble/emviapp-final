
import React from 'react';
import Layout from '@/components/layout/Layout';
import PremiumCommunityHero from '@/components/community/PremiumCommunityHero';
import SpotlightStories from '@/components/community/SpotlightStories';
import LiveSuccessFeed from '@/components/community/LiveSuccessFeed';
import WhyJoinSection from '@/components/community/WhyJoinSection';
import PowerfulCTA from '@/components/community/PowerfulCTA';

const Freelancers = () => {
  return (
    <Layout hideFooter={true}>
      {/* Premium Hero Section */}
      <PremiumCommunityHero />

      {/* Spotlight Stories Section */}
      <SpotlightStories />

      {/* Live Success Feed */}
      <LiveSuccessFeed />

      {/* Why Join EmviApp Section */}
      <WhyJoinSection />

      {/* Powerful CTA Section */}
      <PowerfulCTA />
    </Layout>
  );
};

export default Freelancers;
