
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
  address?: string;  // Add this line
  services?: string[];  // Add this line with the correct type
  created_at: string;
  updated_at?: string;
};
