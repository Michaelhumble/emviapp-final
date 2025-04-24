
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArtistDashboardContent from './components/ArtistDashboardContent';
import { useArtistData } from './context/ArtistDataContext';
import { ArtistDataProvider } from './context/ArtistDataContext';
import DashboardLoadingState from '../DashboardLoadingState';
import ArtistErrorState from './ArtistErrorState';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { signOut } from '@/services/auth';

const ArtistDashboard = () => {
  return (
    <ArtistDataProvider>
      <ArtistDashboardInner />
    </ArtistDataProvider>
  );
};

const ArtistDashboardInner = () => {
  const { loading, error: artistDataError, refreshArtistProfile } = useArtistData();
  const [loadingTime, setLoadingTime] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const { user, signOut: contextSignOut } = useAuth();
  const navigate = useNavigate();
  
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
  
  // Set error if artistDataError exists
  useEffect(() => {
    if (artistDataError) {
      setError(artistDataError);
    }
  }, [artistDataError]);

  // Check if user exists, if not redirect to login
  useEffect(() => {
    if (!user && !loading) {
      toast.error("Session expired. Please sign in again.");
      navigate('/auth/signin', { replace: true });
    }
  }, [user, loading, navigate]);
  
  // Handle emergency logout
  const handleEmergencyLogout = async () => {
    try {
      toast.info("Signing out...");
      
      // Use the enhanced service function for more robust logout
      await signOut();
      
      // Also use context signOut as backup
      if (contextSignOut) {
        await contextSignOut();
      }
      
      // Redirect to sign-in page
      navigate('/auth/signin', { replace: true });
    } catch (logoutError) {
      console.error("Failed to log out:", logoutError);
      toast.error("Failed to log out. Forcing redirect...");
      
      // Clear localStorage and sessionStorage
      localStorage.clear();
      sessionStorage.clear();
      
      // Force redirect to signin as fallback
      window.location.href = '/auth/signin';
    }
  };
  
  // Handle retry action
  const handleRetry = () => {
    setError(null);
    refreshArtistProfile();
    window.location.reload();
  };
  
  if (error) {
    return (
      <ArtistErrorState 
        error={error} 
        retryAction={handleRetry}
        logoutAction={handleEmergencyLogout}
      />
    );
  }
  
  if (loading) {
    return (
      <DashboardLoadingState 
        loadingTime={loadingTime} 
        handleEmergencyLogout={handleEmergencyLogout} 
      />
    );
  }
  
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleEmergencyLogout}
          className="flex items-center gap-1"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
      <ArtistDashboardContent />
    </motion.div>
  );
};

export default ArtistDashboard;
