
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Salon, SalonContextType } from './types';

// Create context with default values
const SalonContext = createContext<SalonContextType>({
  salon: null,
  setSalon: () => {},
  loading: false
});

// Provider component
export const SalonProvider = ({ children }: { children: ReactNode }) => {
  const [salon, setSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState(false);

  // Create the value object
  const value = {
    salon,
    setSalon,
    loading
  };

  return <SalonContext.Provider value={value}>{children}</SalonContext.Provider>;
};

// Custom hook for using the context
export const useSalon = () => {
  const context = useContext(SalonContext);
  if (context === undefined) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};
