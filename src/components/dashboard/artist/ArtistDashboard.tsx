
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArtistDashboardContent from './ArtistDashboardContent';
import { useArtistData } from './context/ArtistDataContext';
import { ArtistDataProvider } from './context/ArtistDataContext';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import ArtistLoadingState from './components/ArtistLoadingState';
import ArtistErrorState from './components/ArtistErrorState';

const ArtistDashboard = () => {
  return (
    <ArtistDataProvider>
      <ArtistDashboardInner />
    </ArtistDataProvider>
  );
};

const ArtistDashboardInner = () => {
  const { loading, error } = useArtistData();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth/signin');
    }
  }, [user, authLoading, navigate]);

  // Set loading timeout
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (loading || authLoading) {
      timeoutId = setTimeout(() => {
        setLoadingTimeout(true);
      }, 10000); // 10 second timeout
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loading, authLoading]);

  // If auth is still loading, show simple loading state
  if (authLoading) {
    return <ArtistLoadingState />;
  }

  // Redirect if no user (handled by the above useEffect)
  if (!user) {
    return <ArtistLoadingState />;
  }

  // Show loading timeout message
  if (loadingTimeout) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">We're having trouble loading your dashboard. Please refresh.</h2>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    return <ArtistErrorState error={error} />;
  }

  // Show loading spinner while data is loading
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
