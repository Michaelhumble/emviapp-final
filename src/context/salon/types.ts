
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
}
