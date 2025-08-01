
import { createContext, useContext, ReactNode } from 'react';
import { useSalonProvider } from './useSalonProvider';
import { useAuth } from '@/context/auth';
import { Salon, SalonContextType } from './types';

// Create the context with default values
const SalonContext = createContext<SalonContextType>({
  salons: [],
  currentSalon: null,
  isLoadingSalons: true,
  createSalon: async () => false,
  selectSalon: () => {},
  refreshSalons: async () => {},
  updateSalon: async () => false,
  deleteSalon: async () => false,
});

export const SalonProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const salonState = useSalonProvider(user?.id);

  return (
    <SalonContext.Provider value={salonState}>
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => useContext(SalonContext);
