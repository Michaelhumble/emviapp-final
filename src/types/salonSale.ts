
export type BusinessType = 'Hair' | 'Nails' | 'Spa' | 'Barbershop' | 'Waxing' | 'Beauty' | 'Other';

export interface SalonSalePhoto {
  id: string;
  salon_sale_id: string;
  photo_url: string;
  order_number?: number;
  created_at: string;
}

export interface SalonSale {
  id: string;
  user_id: string;
  salon_name: string;
  city: string;
  state: string;
  asking_price: number;
  size?: string;
  business_type?: string;
  description: string;
  is_urgent: boolean;
  is_private: boolean;
  status: 'active' | 'sold' | 'inactive';
  created_at: string;
  updated_at: string;
  photos?: SalonSalePhoto[];
}

export interface SalonSaleFormValues {
  salon_name: string;
  city: string;
  state: string;
  asking_price: string;
  size: string;
  business_type: string;
  description: string;
  is_urgent: boolean;
  is_private: boolean;
}
