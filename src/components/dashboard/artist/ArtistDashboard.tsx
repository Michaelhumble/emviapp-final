
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
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  
  // Add timeout detection for loading
  useEffect(() => {
    let timeoutId: number | null = null;
    
    if (loading) {
      // Set a timeout of 10 seconds to prevent infinite loading
      timeoutId = window.setTimeout(() => {
        setLoadingTimeout(true);
      }, 10000);
    } else {
      setLoadingTimeout(false);
    }
    
    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [loading]);
  
  // Show loading timeout error
  if (loadingTimeout && loading) {
    return (
      <ArtistErrorState 
        error={new Error("Dashboard is taking too long to load. Please try refreshing the page.")} 
        retryAction={() => window.location.reload()}
      />
    );
  }
  
  // Show error state if there's an error
  if (error) {
    return <ArtistErrorState error={error} />;
  }
  
  // Show loading state
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
