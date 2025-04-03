
export interface Job {
  id: string;
  created_at: string;
  title: string;
  company: string;
  location: string;
  salary_range?: string;
  description?: string;
  vietnamese_description?: string;
  weekly_pay?: boolean;
  owner_will_train?: boolean;
  employment_type?: string;
  user_id: string;
  responsibilities?: string[];
  qualifications?: string[];
  benefits?: string[];
  specialties?: string[];
  has_housing?: boolean;
  no_supply_deduction?: boolean;
  tip_range?: string;
  work_hours?: string; // Added for Vietnamese job listings
  company_description?: string;
  contact_info?: {
    phone?: string;
    email?: string;
    website?: string;
    owner_name?: string;
  };
  trust_indicators?: {
    verified?: boolean;
    reviewCount?: number;
    rating?: number;
    activelyHiring?: boolean;
    chatAvailable?: boolean;
  };
  is_sample?: boolean;
  is_nationwide?: boolean;
  
  // Additional fields for salon listings
  asking_price?: string;
  monthly_rent?: string;
  square_feet?: string;
  number_of_stations?: number;
  number_of_chairs?: number;
  revenue?: string;
  reason_for_selling?: string;
  has_wax_room?: boolean;
  has_dining_room?: boolean;
  has_laundry?: boolean;
  salon_features?: string[];
  boost_status?: 'standard' | 'nationwide';
  emvi_ai_boosted?: boolean;
}
