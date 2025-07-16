import React from 'react';
import { motion } from 'framer-motion';
import ArtistPortfolioShowcase from '../sections/ArtistPortfolioShowcase';
import ArtistBookingsPreview from '../sections/ArtistBookingsPreview';
import ArtistLiveActivity from '../sections/ArtistLiveActivity';
import ArtistAvailabilityToggle from '../sections/ArtistAvailabilityToggle';
import ArtistViralShare from '../sections/ArtistViralShare';
import MatchmakingToggles from '../components/MatchmakingToggles';
import PokeOffersCard from '../components/PokeOffersCard';
import OneClickApplyCard from '../components/OneClickApplyCard';
import AIRecommendationsCard from '../components/AIRecommendationsCard';

const ArtistOverviewTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Live Activity Banner */}
      <ArtistLiveActivity />
      
      {/* Matchmaking & Visibility Controls */}
      <MatchmakingToggles />
      
      {/* AI-Powered Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PokeOffersCard />
        <OneClickApplyCard />
      </div>
      
      <AIRecommendationsCard />
      
      {/* Availability & Booking Settings */}
      <ArtistAvailabilityToggle />
      
      {/* Portfolio Showcase */}
      <ArtistPortfolioShowcase />
      
      {/* Bookings Preview */}
      <ArtistBookingsPreview />
      
      {/* Viral Share */}
      <ArtistViralShare />
    </motion.div>
  );
};

export default ArtistOverviewTab;