
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArtistDashboardContent from './ArtistDashboardContent';
import { useArtistData } from './context/ArtistDataContext';
import { ArtistDataProvider } from './context/ArtistDataContext';
import { Loader } from 'lucide-react';

const ArtistDashboard = () => {
  return (
    <ArtistDataProvider>
      <ArtistDashboardInner />
    </ArtistDataProvider>
  );
};

const ArtistDashboardInner = () => {
  const { loading } = useArtistData();
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [loadingAttempts, setLoadingAttempts] = useState(0);
  
  // Add loading timeout to prevent infinite loading
  useEffect(() => {
    if (loading) {
      // Set a hard timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        if (loading) {
          setLoadingTimeout(true);
          console.log("Dashboard loading timeout reached");
        }
      }, 8000); // 8 second timeout
      
      return () => clearTimeout(timeoutId);
    }
  }, [loading]);
  
  // Track loading attempts to detect potential issues
  useEffect(() => {
    if (loading) {
      setLoadingAttempts(prev => prev + 1);
    }
  }, [loading]);
  
  if (loadingTimeout || loadingAttempts > 3) {
    return (
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto py-8 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-serif mb-3">Dashboard Loading Issue</h2>
            <p className="text-gray-600 mb-4">
              We encountered an issue loading your dashboard. This might be due to connection problems or temporary server issues.
            </p>
            <div className="space-x-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Refresh Page
              </button>
              <button
                onClick={() => {
                  setLoadingTimeout(false);
                  setLoadingAttempts(0);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  
  if (loading) {
    return (
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto py-12">
          <div className="flex flex-col items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-purple-600 mb-4" />
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </motion.div>
    );
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
