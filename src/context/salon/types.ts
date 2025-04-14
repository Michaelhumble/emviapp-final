
export interface Salon {
  id: string;
  salon_name?: string;
  about?: string;
  logo_url?: string;
  location?: string;
  owner_id?: string;
  website?: string;
  instagram?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SalonContextType {
  salon: Salon | null;
  setSalon: (salon: Salon | null) => void;
  loading: boolean;
  
  // Additional properties needed by components
  salons: Salon[];
  currentSalon: Salon | null;
  isLoadingSalons: boolean;
  createSalon: (salonData: Partial<Salon>) => Promise<boolean>;
  selectSalon: (salonId: string) => void;
  refreshSalons: () => Promise<void>;
  updateSalon: (salonId: string, data: Partial<Salon>) => Promise<boolean>;
  deleteSalon: (salonId: string) => Promise<boolean>;
}
