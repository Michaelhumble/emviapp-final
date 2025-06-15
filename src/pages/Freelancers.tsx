
import React from 'react';
import Layout from '@/components/layout/Layout';
import CommunitiesHero from '@/components/communities/CommunitiesHero';
import CreateDiscoverSection from '@/components/communities/CreateDiscoverSection';
import FeaturedCommunities from '@/components/communities/FeaturedCommunities';
import LiveActivityBar from '@/components/communities/LiveActivityBar';
import CommunityLeaderboard from '@/components/communities/CommunityLeaderboard';
import SpotlightStories from '@/components/communities/SpotlightStories';
import EventsPolls from '@/components/communities/EventsPolls';
import SponsorOpportunities from '@/components/communities/SponsorOpportunities';
import GlobalSearch from '@/components/communities/GlobalSearch';
import CommunitiesQA from '@/components/communities/CommunitiesQA';

const Freelancers = () => {
  return (
    <Layout hideFooter={true}>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <CommunitiesHero />

        {/* Live Activity Bar */}
        <LiveActivityBar />

        {/* Create & Discover Section */}
        <CreateDiscoverSection />

        {/* Featured Communities Grid */}
        <FeaturedCommunities />

        {/* Spotlight Stories */}
        <SpotlightStories />

        {/* Community Leaderboard */}
        <CommunityLeaderboard />

        {/* Events & Polls */}
        <EventsPolls />

        {/* Sponsor Opportunities */}
        <SponsorOpportunities />

        {/* Global Search */}
        <GlobalSearch />

        {/* Q&A Section */}
        <CommunitiesQA />
      </div>
    </Layout>
  );
};

export default Freelancers;
