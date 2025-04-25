
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from '@/context/auth';
import { useArtistProfile } from '@/hooks/artist/useArtistProfile';
import { useToast } from '@/components/ui/use-toast';

// Define types for context data
interface ArtistDataContextType {
  profile: any;
  stats: any;
  loading: boolean;
  error: Error | string | null;
  refresh: () => void;
}

// Create context with default values
const ArtistDataContext = createContext<ArtistDataContextType | undefined>(undefined);

// Provider component
export const ArtistDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { profile, isLoading: profileLoading } = useArtistProfile();
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | string | null>(null);
  const { toast } = useToast();

  const fetchArtistStats = async () => {
    // Simulate fetching artist stats - replace with actual stats fetching
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStats({
        bookingCount: 12,
        completedServices: 8,
        totalEarnings: 750,
        averageRating: 4.8,
        referralCount: 3,
        repeatClientPercentage: 65,
        profileViews: 108
      });
    } catch (err) {
      console.error('Error fetching artist stats:', err);
      setError(err instanceof Error ? err : String(err));
    }
  };

  const loadData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await fetchArtistStats();
    } catch (err) {
      console.error('Error loading artist data:', err);
      setError(err instanceof Error ? err : String(err));
      
      // Show toast for errors
      toast({
        variant: "destructive",
        title: "Error loading dashboard data",
        description: "Please try again or contact support if the issue persists."
      });
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount and when user changes
  useEffect(() => {
    loadData();
  }, [user]);

  // Detect loading state from both sources
  useEffect(() => {
    setLoading(profileLoading);
  }, [profileLoading]);

  // Context value
  const value = {
    profile,
    stats,
    loading,
    error,
    refresh: loadData
  };

  return (
    <ArtistDataContext.Provider value={value}>
      {children}
    </ArtistDataContext.Provider>
  );
};

// Hook to use the context
export const useArtistData = () => {
  const context = useContext(ArtistDataContext);
  
  // Return a safe default if used outside provider
  if (context === undefined) {
    console.warn('useArtistData must be used within an ArtistDataProvider');
    return {
      profile: null,
      stats: {},
      loading: false,
      error: new Error('ArtistDataContext used outside of provider'),
      refresh: () => {}
    };
  }
  
  return context;
};
