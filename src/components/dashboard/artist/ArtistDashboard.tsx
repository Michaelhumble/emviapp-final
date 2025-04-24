
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArtistDashboardContent from './components/ArtistDashboardContent';
import { useArtistData } from './context/ArtistDataContext';
import { ArtistDataProvider } from './context/ArtistDataContext';
import DashboardLoadingState from '../DashboardLoadingState';
import ArtistErrorState from './ArtistErrorState';

const ArtistDashboard = () => {
  return (
    <ArtistDataProvider>
      <ArtistDashboardInner />
    </ArtistDataProvider>
  );
};

const ArtistDashboardInner = () => {
  const { loading } = useArtistData();
  const [loadingTime, setLoadingTime] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  
  // Track loading time
  useEffect(() => {
    if (!loading) return;
    
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      setLoadingTime(elapsedSeconds);
      
      // If loading takes more than 30 seconds, treat it as an error
      if (elapsedSeconds > 30) {
        setError(new Error("Dashboard is taking too long to load. Please try refreshing the page."));
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [loading]);
  
  // Handle emergency logout
  const handleEmergencyLogout = () => {
    // Clear any local storage that might be causing issues
    localStorage.removeItem('artist_dashboard_tab');
    // Redirect to sign-in page
    window.location.href = '/auth/signin';
  };
  
  if (error) {
    return <ArtistErrorState error={error} retryAction={() => window.location.reload()} />;
  }
  
  if (loading) {
    return <DashboardLoadingState loadingTime={loadingTime} handleEmergencyLogout={handleEmergencyLogout} />;
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
