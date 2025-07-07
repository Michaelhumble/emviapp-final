
export interface Job {
  id: string;
  title: string;
  
  // Core required fields
  category: string;
  location?: string;
  description?: string;
  user_id?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  expires_at?: string;
  
  // Job-specific fields
  compensation_type?: string;
  compensation_details?: string;
  requirements?: string; // Always string, not array
  pricing_tier?: string;
  
  // Contact information as object
  contact_info?: {
    owner_name?: string;
    phone?: string;
    email?: string;
    notes?: string;
    zalo?: string;
  };
  
  // Legacy/optional fields for compatibility
  role?: string;
  company?: string;
  posted_at?: string;
  employment_type?: string;
  image?: string;
  vietnamese_description?: string;
  preferred_languages?: string[];
  benefits?: string[];
  features?: string[];
  salon_type?: string;
  specialties?: string[];
  weekly_pay?: boolean;
  has_housing?: boolean;
  has_wax_room?: boolean;
  no_supply_deduction?: boolean;
  owner_will_train?: boolean;
  tip_range?: string;
  salary_range?: string;
  is_featured?: boolean;
  featured?: boolean;
  featured_text?: string;
  boosted_until?: string;
  is_urgent?: boolean;
  isPinned?: boolean;
  type?: 'salon' | 'job' | 'opportunity';
  name?: string;
  imageUrl?: string;
  is_vietnamese_listing?: boolean;
  industry?: string;
  post_type?: string;
  pricingTier?: 'diamond' | 'premium' | 'gold' | 'featured' | 'standard' | 'starter' | 'free' | 'expired';
  salonName?: string;
  salon_id?: string;
  monthly_revenue?: string;
  station_count?: string;
  chair_count?: string;
  sale_price?: string;
  is_salon_for_sale?: boolean;
  badge?: string;
  color?: string;
  hidden?: boolean;
  for_sale?: boolean;
  asking_price?: string;
  number_of_stations?: string;
  square_feet?: string;
  reason_for_selling?: string;
  salon_features?: string[];
  trust_indicators?: any;
  revenue?: string;
  has_dining_room?: boolean;
  has_laundry?: boolean;
  experience_level?: string;
  is_remote?: boolean;
  role_normalized?: string;
  price?: string;
  monthly_rent?: string;
}

export type JobDetailsSubmission = {
  title: string;
  description?: string;
  location?: string;
  compensation_type?: string;
  compensation_details?: string;
  employment_type?: string;
  category?: string;
  requirements?: string; // Always string
  contact_info?: {
    owner_name?: string;
    phone?: string;
    email?: string;  
    notes?: string;
    zalo?: string;
  };
  image?: string;
  vietnamese_description?: string;
  preferred_languages?: string[];
  benefits?: string[];
  features?: string[];
  salon_type?: string;
  specialties?: string[];
  weekly_pay?: boolean;
  has_housing?: boolean;
  has_wax_room?: boolean;
  no_supply_deduction?: boolean;
  owner_will_train?: boolean;
  tip_range?: string;
  salary_range?: string;
  is_urgent?: boolean;
  user_id?: string;
  post_type?: string;
  salonName?: string;
}

import { PricingOptions } from '@/utils/posting/types';
export type { PricingOptions };
