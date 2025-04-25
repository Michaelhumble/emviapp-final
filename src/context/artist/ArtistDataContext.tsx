
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from '@/context/auth';
import { useArtistStats } from '@/hooks/artist/useArtistStats';
import { useArtistBookings } from '@/hooks/artist/useArtistBookings';

type ArtistDataContextType = {
  loading: boolean;
  error: Error | null;
  stats: any;
  bookings: any[];
  refreshData: () => Promise<void>;
};

const ArtistDataContext = createContext<ArtistDataContextType | null>(null);

export const ArtistDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [error, setError] = useState<Error | null>(null);
  
  const { stats, isLoadingStats, fetchStats } = useArtistStats(user?.id);
  const { bookings, isLoadingBookings, fetchBookings } = useArtistBookings(user?.id);

  const refreshData = useCallback(async () => {
    try {
      await Promise.all([
        fetchStats(),
        fetchBookings()
      ]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to refresh data'));
    }
  }, [fetchStats, fetchBookings]);

  const loading = isLoadingStats || isLoadingBookings;

  const value = {
    loading,
    error,
    stats,
    bookings,
    refreshData
  };

  return (
    <ArtistDataContext.Provider value={value}>
      {children}
    </ArtistDataContext.Provider>
  );
};

export const useArtistData = () => {
  const context = useContext(ArtistDataContext);
  if (!context) {
    throw new Error('useArtistData must be used within an ArtistDataProvider');
  }
  return context;
};
