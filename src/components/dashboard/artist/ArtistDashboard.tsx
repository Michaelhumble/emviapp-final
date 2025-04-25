
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ArtistDashboardContent from './ArtistDashboardContent';
import { useArtistData } from './context/ArtistDataContext';
import { ArtistDataProvider } from './context/ArtistDataContext';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import ArtistLoadingState from './components/ArtistLoadingState';
import ArtistErrorState from './components/ArtistErrorState';
import ErrorBoundary from '@/components/error-handling/ErrorBoundary';
import { AlertTriangle } from 'lucide-react';

const ArtistDashboard = () => {
  return (
    <ErrorBoundary 
      fallback={
        <div className="container mx-auto p-6">
          <AlertTriangle size={40} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-center">Dashboard Unavailable</h2>
          <p className="text-gray-600 text-center">
            We couldn't load your artist dashboard. Please try again.
          </p>
        </div>
      }
    >
      <ArtistDataProvider>
        <ArtistDashboardInner />
      </ArtistDataProvider>
    </ErrorBoundary>
  );
};

const ArtistDashboardInner = () => {
  const { 
    loading: dataLoading, 
    error: dataError 
  } = useArtistData() || { loading: true, error: null };
  
  const { 
    user, 
    loading: authLoading, 
    isError: authError 
  } = useAuth() || { user: null, loading: true, isError: false };
  
  const navigate = useNavigate();
  
  // Simple auth check - redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth/signin');
    }
  }, [user, authLoading, navigate]);

  // Loading state
  if (authLoading || dataLoading) {
    return <ArtistLoadingState />;
  }

  // Simple error handling
  if (dataError || authError) {
    const errorMessage = dataError || (authError ? "Authentication error" : "");
    return <ArtistErrorState error={errorMessage} />;
  }

  // Successful render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ArtistDashboardContent />
    </motion.div>
  );
};

export default ArtistDashboard;
