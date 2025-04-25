
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArtistDashboardContent from './ArtistDashboardContent';
import { useArtistData } from './context/ArtistDataContext';
import { ArtistDataProvider } from './context/ArtistDataContext';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import ArtistLoadingState from './components/ArtistLoadingState';
import ArtistErrorState from './components/ArtistErrorState';
import ErrorBoundary from '@/components/error-handling/ErrorBoundary';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ArtistDashboard = () => {
  return (
    <ErrorBoundary 
      fallback={
        <div className="container mx-auto p-6 text-center">
          <AlertTriangle size={40} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-xl font-semibold mb-4">⚠️ Dashboard Unavailable</h2>
          <p className="text-gray-600 mb-6">
            We couldn't load your artist dashboard. Please try again later.
          </p>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Reload Dashboard
          </Button>
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
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Simplified loading and error handling
  useEffect(() => {
    if (!authLoading && !user) {
      toast.info("Sign in required");
      navigate('/auth/signin');
    }
  }, [user, authLoading, navigate]);

  // Simple timeout mechanism
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (dataLoading || authLoading) {
        setLoadingTimeout(true);
      }
    }, 6000);
    
    return () => clearTimeout(timeoutId);
  }, [dataLoading, authLoading]);

  // Loading state
  if (authLoading || dataLoading) {
    return <ArtistLoadingState />;
  }

  // Error states - Here's where the type error was
  if (dataError || authError || loadingTimeout) {
    // Convert the error value to the expected type (string | Error)
    let errorToDisplay: string | Error;
    
    if (dataError) {
      errorToDisplay = dataError;
    } else if (authError) {
      // Convert boolean to an Error object
      errorToDisplay = new Error("Authentication error occurred");
    } else {
      // Handle timeout case
      errorToDisplay = new Error("Dashboard loading timed out");
    }
    
    return (
      <ArtistErrorState 
        error={errorToDisplay} 
      />
    );
  }

  // Successful render
  return (
    <ErrorBoundary>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ArtistDashboardContent />
      </motion.div>
    </ErrorBoundary>
  );
};

export default ArtistDashboard;
