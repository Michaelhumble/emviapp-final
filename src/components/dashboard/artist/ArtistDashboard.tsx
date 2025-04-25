
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArtistDashboardContent from './ArtistDashboardContent';
import { useArtistData } from './context/ArtistDataContext';
import { ArtistDataProvider } from './context/ArtistDataContext';
import ArtistLoadingState from './components/ArtistLoadingState';
import ArtistErrorState from './ArtistErrorState';

const ArtistDashboard = () => {
  return (
    <ArtistDataProvider>
      <ArtistDashboardInner />
    </ArtistDataProvider>
  );
};

const ArtistDashboardInner = () => {
  const { loading, error } = useArtistData();
  const [showTimeoutError, setShowTimeoutError] = useState(false);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (loading) {
      timeoutId = setTimeout(() => {
        setShowTimeoutError(true);
      }, 10000);
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading]);
  
  if (showTimeoutError && loading) {
    return (
      <ArtistErrorState 
        error={new Error("We're having trouble loading your dashboard. Please refresh.")}
      />
    );
  }
  
  if (error) {
    return <ArtistErrorState error={error} />;
  }
  
  if (loading) {
    return <ArtistLoadingState />;
  }
  
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
