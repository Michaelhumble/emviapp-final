
export interface Job {
  id: string;
  role?: string;
  title?: string;
  company?: string;
  location: string;
  posted_at?: string;
  created_at: string;
  description?: string;
  employment_type?: string;
  compensation_details?: string;
  compensation_type?: string;
  contact_info?: {
    owner_name?: string;
    phone?: string;
    email?: string;
    notes?: string;
  };
  for_sale?: boolean;
  asking_price?: string;
  number_of_stations?: string;
  square_feet?: string;
  reason_for_selling?: string;
  salon_features?: string[];
  specialties?: string[];
  is_featured?: boolean;
  status?: string;
  image?: string;
  weekly_pay?: boolean;
  has_housing?: boolean;
  has_wax_room?: boolean;
  no_supply_deduction?: boolean;
  owner_will_train?: boolean;
  tip_range?: string;
  salary_range?: string;
  vietnamese_description?: string;
  salon_type?: string;
  expires_at?: string;
  boosted_until?: string;
  user_id?: string;
  requirements?: string[] | string;
  preferred_languages?: string[];
  benefits?: string[];
  features?: string[];
  price?: string;
  monthly_rent?: string;
  trust_indicators?: any;
  revenue?: string;
  monthly_revenue?: string;
  yearly_revenue?: string;
  has_dining_room?: boolean;
  has_laundry?: boolean;
  experience_level?: string;
  is_remote?: boolean;
  role_normalized?: string;
  is_urgent?: boolean;
  type?: 'salon' | 'job' | 'opportunity';
  // Add name field for compatibility with Salon type
  name?: string;
  // Add imageUrl property that's needed for consistent image handling
  imageUrl?: string;
  // Add established property for Salon compatibility
  established?: number | string;
  // Add website for Salon compatibility
  website?: string;
  // Add the missing property
  is_vietnamese_listing?: boolean;
}
