
import React from 'react';
import { motion } from 'framer-motion';
import ArtistWelcomeHero from './sections/ArtistWelcomeHero';
import ArtistEmpireStats from './sections/ArtistEmpireStats';
import ArtistBookingsPreview from './sections/ArtistBookingsPreview';
import ArtistPortfolioShowcase from './sections/ArtistPortfolioShowcase';
import ArtistSocialProofTicker from './sections/ArtistSocialProofTicker';
import ArtistViralLeaderboard from './sections/ArtistViralLeaderboard';
import ArtistTestimonialCarousel from './sections/ArtistTestimonialCarousel';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            opacity: [0.03, 0.12, 0.03]
          }}
          transition={{ 
            duration: 35, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.02, 0.08, 0.02]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
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
              </div>

              {/* Right Column */}
              <div className="col-span-4 space-y-8">
                <motion.div variants={itemVariants}>
                  <ArtistViralLeaderboard />
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
              <ArtistViralLeaderboard />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ArtistTestimonialCarousel />
            </motion.div>

            {/* Bottom Padding for Sticky Footer */}
            <div className="h-24"></div>
          </div>
        </div>
      </motion.div>

      {/* Action Footer */}
      <ArtistActionFooter />
    </div>
  );
};

export default PremiumArtistDashboard;
