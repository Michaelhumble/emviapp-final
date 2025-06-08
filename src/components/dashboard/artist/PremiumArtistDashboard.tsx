
import React from 'react';
import { motion } from 'framer-motion';
import ArtistWelcomeHero from './sections/ArtistWelcomeHero';
import ArtistQuickStats from './sections/ArtistQuickStats';
import ArtistTestimonialCarousel from './sections/ArtistTestimonialCarousel';
import ArtistLiveLeaderboard from './sections/ArtistLiveLeaderboard';
import ArtistPortfolioShowcase from './sections/ArtistPortfolioShowcase';
import ArtistBookingWidget from './sections/ArtistBookingWidget';
import ArtistComingSoonFeatures from './sections/ArtistComingSoonFeatures';
import ArtistStickyFooter from './sections/ArtistStickyFooter';
import ArtistSocialTicker from './sections/ArtistSocialTicker';
import ArtistViralShareCard from './sections/ArtistViralShareCard';

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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const PremiumArtistDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-md mx-auto px-4 py-6 space-y-6"
      >
        {/* Welcome Hero */}
        <motion.div variants={itemVariants}>
          <ArtistWelcomeHero />
        </motion.div>

        {/* Live Stats */}
        <motion.div variants={itemVariants}>
          <ArtistQuickStats />
        </motion.div>

        {/* Social Activity Ticker */}
        <motion.div variants={itemVariants}>
          <ArtistSocialTicker />
        </motion.div>

        {/* Viral Share Card */}
        <motion.div variants={itemVariants}>
          <ArtistViralShareCard />
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div variants={itemVariants}>
          <ArtistTestimonialCarousel />
        </motion.div>

        {/* Live Leaderboard */}
        <motion.div variants={itemVariants}>
          <ArtistLiveLeaderboard />
        </motion.div>

        {/* Portfolio Showcase */}
        <motion.div variants={itemVariants}>
          <ArtistPortfolioShowcase />
        </motion.div>

        {/* Booking Widget */}
        <motion.div variants={itemVariants}>
          <ArtistBookingWidget />
        </motion.div>

        {/* Coming Soon Features */}
        <motion.div variants={itemVariants}>
          <ArtistComingSoonFeatures />
        </motion.div>

        {/* Bottom Padding for Sticky Footer */}
        <div className="h-24"></div>
      </motion.div>

      {/* Sticky Footer */}
      <ArtistStickyFooter />
    </div>
  );
};

export default PremiumArtistDashboard;
