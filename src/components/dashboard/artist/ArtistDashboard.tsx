
import React from 'react';
import { motion } from 'framer-motion';
import ArtistDashboardContent from './ArtistDashboardContent';
import { useArtistData } from './context/ArtistDataContext';
import { ArtistDataProvider } from './context/ArtistDataContext';

const ArtistDashboard = () => {
  return (
    <ArtistDataProvider>
      <ArtistDashboardInner />
    </ArtistDataProvider>
  );
};

const ArtistDashboardInner = () => {
  const { loading } = useArtistData();
  
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ArtistDashboardContent />
    </motion.div>
  );
};

export default ArtistDashboard;
