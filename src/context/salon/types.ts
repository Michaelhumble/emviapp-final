export type Salon = {
  id: string;
  owner_id?: string;
  salon_name: string;
  logo_url?: string;
  location?: string;
  about?: string;
  website?: string;
  instagram?: string;
  phone?: string;
  created_at: string;
  updated_at?: string;
};

export type SalonContextType = {
  salons: Salon[];
  currentSalon: Salon | null;
  isLoadingSalons: boolean;
  createSalon: (salonData: Partial<Salon>) => Promise<boolean>;
  selectSalon: (salonId: string) => void;
  refreshSalons: () => Promise<void>;
  updateSalon: (salonId: string, data: Partial<Salon>) => Promise<boolean>;
  deleteSalon: (salonId: string) => Promise<boolean>;
};
