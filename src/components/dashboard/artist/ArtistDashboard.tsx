
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

const ArtistDashboard = () => {
  return (
    <ErrorBoundary>
      <ArtistDataProvider>
        <ArtistDashboardInner />
      </ArtistDataProvider>
    </ErrorBoundary>
  );
};

const ArtistDashboardInner = () => {
  const { loading, error } = useArtistData() || { loading: true, error: null };
  const { user, loading: authLoading, isError: authError } = useAuth() || { user: null, loading: true, isError: false };
  const navigate = useNavigate();
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      console.log("No user found, redirecting to sign-in");
      navigate('/auth/signin');
    }
  }, [user, authLoading, navigate]);

  // Set loading timeout
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (loading || authLoading) {
      timeoutId = setTimeout(() => {
        console.log("Loading timeout reached for artist dashboard");
        setLoadingTimeout(true);
      }, 8000); // 8 second timeout - reduced from 10
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
    return (
      <div className="container mx-auto p-6 text-center">
        <AlertTriangle size={40} className="mx-auto text-amber-500 mb-4" />
        <h2 className="text-xl font-medium mb-4">Authentication Required</h2>
        <p className="mb-6">You need to be signed in to view this page.</p>
        <Button onClick={() => navigate('/auth/signin')}>Sign In</Button>
      </div>
    );
  }

  // Show loading timeout message
  if (loadingTimeout) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <AlertTriangle size={40} className="mx-auto text-amber-500 mb-4" />
        <h2 className="text-xl font-semibold mb-4">⚠️ Unable to load dashboard. Please refresh or try again later.</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => window.location.reload()} 
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Page
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go to Homepage
          </Button>
        </div>
      </div>
    );
  }

  // Show error state if there's an error
  if (error || authError) {
    return <ArtistErrorState error={error || new Error("Authentication error")} />;
  }

  // Show loading spinner while data is loading
  if (loading) {
    return <ArtistLoadingState />;
  }
  
  return (
    <ErrorBoundary>
      <motion.div
        className="w-full"
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
