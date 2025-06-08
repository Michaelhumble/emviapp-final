
import React from 'react';
import { motion } from 'framer-motion';
import ArtistWelcomeHero from './sections/ArtistWelcomeHero';
import ArtistEmpireStats from './sections/ArtistEmpireStats';
import ArtistBookingsPreview from './sections/ArtistBookingsPreview';
import ArtistPortfolioShowcase from './sections/ArtistPortfolioShowcase';
import ArtistSocialProofTicker from './sections/ArtistSocialProofTicker';
import ArtistTestimonialCarousel from './sections/ArtistTestimonialCarousel';
import ArtistViralShare from './sections/ArtistViralShare';
import ArtistLeaderboard from './sections/ArtistLeaderboard';
import ArtistActionFooter from './sections/ArtistActionFooter';

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
    <div className="min-h-screen bg-[#FDFDFD] relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Hero Section */}
            <motion.div variants={itemVariants}>
              <ArtistWelcomeHero />
            </motion.div>

            {/* Empire Stats */}
            <motion.div variants={itemVariants}>
              <ArtistEmpireStats />
            </motion.div>

            {/* Social Proof Ticker */}
            <motion.div variants={itemVariants}>
              <ArtistSocialProofTicker />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-8">
              {/* Left Column */}
              <div className="col-span-8 space-y-8">
                <motion.div variants={itemVariants}>
                  <ArtistBookingsPreview />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <ArtistPortfolioShowcase />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <ArtistViralShare />
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="col-span-4 space-y-8">
                <motion.div variants={itemVariants}>
                  <ArtistLeaderboard />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <ArtistTestimonialCarousel />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="max-w-md mx-auto px-4 py-6 space-y-6">
            <motion.div variants={itemVariants}>
              <ArtistWelcomeHero />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ArtistEmpireStats />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ArtistSocialProofTicker />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ArtistBookingsPreview />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ArtistPortfolioShowcase />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ArtistTestimonialCarousel />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ArtistViralShare />
            </motion.div>

            {/* Bottom Padding for Sticky Footer */}
            <div className="h-24"></div>
          </div>
        </div>
      </motion.div>

      {/* Action Footer - Mobile Only */}
      <ArtistActionFooter />
    </div>
  );
};

export default PremiumArtistDashboard;
