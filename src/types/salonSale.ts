
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
  description_combined?: string; // Updated to match database column
  vietnamese_description?: string;
  english_description?: string;
  is_urgent?: boolean;
  is_private?: boolean;
  is_featured?: boolean;
  status: 'active' | 'sold' | 'inactive' | string;
  created_at: string;
  updated_at: string;
  photos?: SalonSalePhoto[];
  
  // Contact information
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_facebook?: string;
  contact_zalo?: string;
  contact_notes?: string;
  
  // Location details
  address?: string;
  zip_code?: string;
  neighborhood?: string;
  hide_exact_address?: boolean;
  
  // Business details
  established_year?: string;
  monthly_rent?: number;
  monthly_revenue?: string;
  monthly_profit?: string;
  number_of_staff?: string;
  number_of_tables?: string;
  number_of_chairs?: string;
  square_feet?: string;
  yearly_revenue?: string;
  gross_revenue?: string;
  net_profit?: string;
  
  // Features and amenities
  will_train?: boolean;
  has_housing?: boolean;
  has_wax_room?: boolean;
  has_dining_room?: boolean;
  has_laundry?: boolean;
  has_parking?: boolean;
  equipment_included?: boolean;
  lease_transferable?: boolean;
  seller_financing?: boolean;
  help_with_transition?: boolean;
  features?: string[];
  
  // Descriptions and details
  reason_for_selling?: string;
  virtual_tour_url?: string;
  other_notes?: string;
  
  // Pricing and payment
  selected_pricing_tier?: string;
  featured_addon?: boolean;
  payment_status?: string;
  expires_at?: string;
  
  // Images
  images?: string[];
  logo_url?: string;
  image_url?: string; // For backward compatibility
  
  // Backward compatibility for description field
  description?: string; // This will be computed from vietnamese_description or english_description
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
