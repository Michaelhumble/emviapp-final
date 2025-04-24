
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

const ArtistDashboard = () => {
  return (
    <ArtistDataProvider>
      <ArtistDashboardInner />
    </ArtistDataProvider>
  );
};

const ArtistDashboardInner = () => {
  const { loading, error: artistDataError } = useArtistData();
  const [loadingTime, setLoadingTime] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const { signOut } = useAuth();
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
  
  // Handle emergency logout
  const handleEmergencyLogout = async () => {
    try {
      // Clear any local storage that might be causing issues
      localStorage.removeItem('artist_dashboard_tab');
      
      // Sign out using auth context
      await signOut();
      
      toast.success("Successfully signed out");
      
      // Redirect to sign-in page
      navigate('/auth/signin');
    } catch (logoutError) {
      console.error("Failed to log out:", logoutError);
      toast.error("Failed to log out. Forcing redirect...");
      
      // Force redirect to signin as fallback
      setTimeout(() => {
        window.location.href = '/auth/signin';
      }, 1000);
    }
  };
  
  if (error) {
    return (
      <ArtistErrorState 
        error={error} 
        retryAction={() => window.location.reload()} 
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
