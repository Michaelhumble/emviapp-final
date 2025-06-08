
import React from 'react';
import { motion } from 'framer-motion';
import { useArtistData } from './context/ArtistDataContext';
import ArtistWelcomeHero from './sections/ArtistWelcomeHero';
import ArtistPremiumStats from './sections/ArtistPremiumStats';
import ArtistViralShareCard from './sections/ArtistViralShareCard';
import ArtistTestimonialCarousel from './sections/ArtistTestimonialCarousel';
import ArtistComingSoonFeatures from './ArtistComingSoonFeatures';
import ArtistLiveLeaderboard from './sections/ArtistLiveLeaderboard';
import ArtistPortfolioPreview from './sections/ArtistPortfolioPreview';
import ArtistBookingWidget from './sections/ArtistBookingWidget';
import ArtistStickyFooter from './sections/ArtistStickyFooter';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.1,
    } 
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const PremiumArtistDashboard = () => {
  const { loading } = useArtistData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your empire...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 pb-20"
    >
      {/* Welcome Hero Section */}
      <motion.section variants={sectionVariants}>
        <ArtistWelcomeHero />
      </motion.section>

      {/* Premium Stats Section */}
      <motion.section variants={sectionVariants} className="px-4 mb-6">
        <ArtistPremiumStats />
      </motion.section>

      {/* Viral Share Card */}
      <motion.section variants={sectionVariants} className="px-4 mb-6">
        <ArtistViralShareCard />
      </motion.section>

      {/* Testimonial Carousel */}
      <motion.section variants={sectionVariants} className="px-4 mb-6">
        <ArtistTestimonialCarousel />
      </motion.section>

      {/* Coming Soon Features */}
      <motion.section variants={sectionVariants} className="px-4 mb-6">
        <ArtistComingSoonFeatures />
      </motion.section>

      {/* Live Leaderboard */}
      <motion.section variants={sectionVariants} className="px-4 mb-6">
        <ArtistLiveLeaderboard />
      </motion.section>

      {/* Portfolio Preview */}
      <motion.section variants={sectionVariants} className="px-4 mb-6">
        <ArtistPortfolioPreview />
      </motion.section>

      {/* Booking Widget */}
      <motion.section variants={sectionVariants} className="px-4 mb-6">
        <ArtistBookingWidget />
      </motion.section>

      {/* Sticky Footer CTA */}
      <ArtistStickyFooter />
    </motion.div>
  );
};

export default PremiumArtistDashboard;
