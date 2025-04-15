
import React, { createContext, useContext, useState } from 'react';

interface SalonDataContextType {
  loading: boolean;
  error: Error | null;
  // Add other salon data properties as needed
}

const SalonDataContext = createContext<SalonDataContextType | undefined>(undefined);

export const SalonDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return (
    <SalonDataContext.Provider value={{
      loading,
      error,
      // Add other values as needed
    }}>
      {children}
    </SalonDataContext.Provider>
  );
};

export const useSalonData = () => {
  const context = useContext(SalonDataContext);
  if (context === undefined) {
    throw new Error('useSalonData must be used within a SalonDataProvider');
  }
  return context;
};
