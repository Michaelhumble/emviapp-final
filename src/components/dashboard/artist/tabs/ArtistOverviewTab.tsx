import React from 'react';
import { motion } from 'framer-motion';
import ArtistPortfolioShowcase from '../sections/ArtistPortfolioShowcase';
import ArtistBookingsPreview from '../sections/ArtistBookingsPreview';
import ArtistLiveActivity from '../sections/ArtistLiveActivity';
import ArtistAvailabilityToggle from '../sections/ArtistAvailabilityToggle';
import ArtistViralShare from '../sections/ArtistViralShare';

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