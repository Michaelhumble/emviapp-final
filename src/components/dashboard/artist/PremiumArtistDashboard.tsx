
import React from 'react';
import { motion } from 'framer-motion';
import ArtistWelcomeHero from './sections/ArtistWelcomeHero';
import ArtistQuickStats from './sections/ArtistQuickStats';
import ArtistGrowYourBusinessCard from './sections/ArtistGrowYourBusinessCard';
import ArtistLiveLeaderboard from './sections/ArtistLiveLeaderboard';
import ArtistTestimonialCarousel from './sections/ArtistTestimonialCarousel';
import ArtistViralShareCard from './sections/ArtistViralShareCard';
import ArtistComingSoonFeatures from './ArtistComingSoonFeatures';
import ArtistSocialTicker from './sections/ArtistSocialTicker';
import ArtistStickyFooter from './sections/ArtistStickyFooter';
import ArtistPortfolioPreview from './sections/ArtistPortfolioPreview';
import ArtistBookingWidget from './sections/ArtistBookingWidget';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2,
    } 
  }
};

const PremiumArtistDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-25 to-orange-25 pb-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md mx-auto px-4 py-6 space-y-6"
      >
        {/* Welcome Hero */}
        <ArtistWelcomeHero />

        {/* Animated Stats */}
        <ArtistQuickStats />

        {/* Viral Share Card */}
        <ArtistViralShareCard />

        {/* Social Ticker */}
        <ArtistSocialTicker />

        {/* Testimonial Carousel */}
        <ArtistTestimonialCarousel />

        {/* Live Leaderboard */}
        <ArtistLiveLeaderboard />

        {/* Portfolio Preview */}
        <ArtistPortfolioPreview />

        {/* Booking Widget */}
        <ArtistBookingWidget />

        {/* Grow Business Card */}
        <ArtistGrowYourBusinessCard />

        {/* Coming Soon Features */}
        <ArtistComingSoonFeatures />
      </motion.div>

      {/* Sticky Footer */}
      <ArtistStickyFooter />
    </div>
  );
};

export default PremiumArtistDashboard;
