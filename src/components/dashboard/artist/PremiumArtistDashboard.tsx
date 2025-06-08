
import React from 'react';
import { motion } from 'framer-motion';
import ArtistWelcomeHero from './sections/ArtistWelcomeHero';
import ArtistEmpireStats from './sections/ArtistEmpireStats';
import ArtistPortfolioShowcase from './sections/ArtistPortfolioShowcase';
import ArtistBookingsPreview from './sections/ArtistBookingsPreview';
import ArtistTestimonialCarousel from './sections/ArtistTestimonialCarousel';
import ArtistLeaderboard from './sections/ArtistLeaderboard';
import ArtistViralShare from './sections/ArtistViralShare';
import ArtistLiveActivity from './sections/ArtistLiveActivity';
import ArtistFeatureVoting from './sections/ArtistFeatureVoting';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1,
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const PremiumArtistDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FDFDFD] to-gray-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Hero Section */}
            <motion.div variants={itemVariants} className="mb-8">
              <ArtistWelcomeHero />
            </motion.div>

            {/* Empire Stats */}
            <motion.div variants={itemVariants} className="mb-8">
              <ArtistEmpireStats />
            </motion.div>

            {/* Live Activity Banner */}
            <motion.div variants={itemVariants} className="mb-8">
              <ArtistLiveActivity />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-8">
              {/* Left Column - Main Content */}
              <div className="col-span-8 space-y-8">
                <motion.div variants={itemVariants}>
                  <ArtistPortfolioShowcase />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <ArtistBookingsPreview />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <ArtistFeatureVoting />
                </motion.div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="col-span-4 space-y-8">
                <motion.div variants={itemVariants}>
                  <ArtistLeaderboard />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <ArtistTestimonialCarousel />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <ArtistViralShare />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="px-4 py-6 space-y-6">
            <motion.div variants={itemVariants}>
              <ArtistWelcomeHero />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ArtistEmpireStats />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ArtistLiveActivity />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ArtistPortfolioShowcase />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ArtistBookingsPreview />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ArtistTestimonialCarousel />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ArtistLeaderboard />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ArtistFeatureVoting />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ArtistViralShare />
            </motion.div>

            {/* Bottom spacing for mobile navigation */}
            <div className="h-20"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PremiumArtistDashboard;
