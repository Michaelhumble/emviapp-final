
import React from 'react';
import { motion } from 'framer-motion';
import { useArtistData } from './context/ArtistDataContext';
import ArtistHero from './sections/ArtistHero';
import ArtistMetrics from './sections/ArtistMetrics';
import ArtistPortfolioPreview from './sections/ArtistPortfolioPreview';
import ArtistActivityFeed from './sections/ArtistActivityFeed';
import ArtistAppointments from './sections/ArtistAppointments';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.12,
      delayChildren: 0.1,
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 } 
  }
};

const ArtistDashboardContent = () => {
  const { loading } = useArtistData();
  
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-8">
        <div className="space-y-6">
          <div className="h-48 bg-gray-100 animate-pulse rounded-xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
            <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
            <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
          </div>
          <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      className="max-w-5xl mx-auto py-8 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <ArtistHero />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ArtistMetrics />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ArtistPortfolioPreview />
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <ArtistActivityFeed />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ArtistAppointments />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArtistDashboardContent;
