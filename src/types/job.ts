
export interface Job {
  id: string;
  role?: string;
  title?: string;
  company?: string;
  salonName?: string; // Added salonName field
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
    zalo?: string;
  };
  for_sale?: boolean;
  asking_price?: string;
  number_of_stations?: string;
  square_feet?: string;
  reason_for_selling?: string;
  salon_features?: string[];
  specialties?: string[];
  is_featured?: boolean;
  featured?: boolean;
  featured_text?: string;
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
  has_dining_room?: boolean;
  has_laundry?: boolean;
  experience_level?: string;
  is_remote?: boolean;
  role_normalized?: string;
  is_urgent?: boolean;
  isPinned?: boolean;
  type?: 'salon' | 'job' | 'opportunity';
  name?: string;
  imageUrl?: string;
  is_vietnamese_listing?: boolean;
  industry?: string;
  post_type?: string; 
  
  // Updated pricing tier field to include 'gold'
  pricingTier?: 'diamond' | 'premium' | 'gold' | 'featured' | 'standard' | 'starter' | 'free' | 'expired';
  
  // Add missing properties
  monthly_revenue?: string;
  station_count?: string;
  chair_count?: string;
  sale_price?: string;
  is_salon_for_sale?: boolean;
  salon_id?: string; // Added to fix type errors
  updated_at?: string; // Added to fix type errors
}

// Add missing exported interfaces
export type JobDetailsSubmission = {
  title: string;
  salonName?: string; // Added salonName field
  description?: string;
  location: string;
  compensation_type?: string;
  compensation_details?: string;
  employment_type?: string;
  requirements?: string[] | string;
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
}

// Import the PricingOptions from the canonical source
import { PricingOptions } from '@/utils/posting/types';
export type { PricingOptions };
