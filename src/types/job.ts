
export interface Job {
  id: string;
  role?: string;
  title?: string;
  company: string;
  location: string;
  description?: string;
  vietnamese_description?: string;
  for_sale?: boolean;
  asking_price?: string;
  number_of_stations?: string;
  square_feet?: string;
  monthly_rent?: string;
  revenue?: string;
  reason_for_selling?: string;
  salon_features?: string[];
  specialties?: string[];
  has_wax_room?: boolean;
  has_dining_room?: boolean;
  has_laundry?: boolean;
  has_housing?: boolean;
  owner_will_train?: boolean;
  created_at?: string;
  posted_at?: string;
  contact_info?: {
    owner_name?: string;
    phone?: string;
    email?: string;
    notes?: string;
  };
  is_featured?: boolean;
  price_range?: string;
  rating?: number;
  employment_type?: string;
  compensation_details?: string;
  status?: string;
  image?: string;
  weekly_pay?: boolean;
  tip_range?: string;
  salary_range?: string;
  no_supply_deduction?: boolean;
  
  // Additional properties needed by the job components
  user_id?: string;
  requirements?: string[] | string;
  compensation_type?: string;
  preferred_languages?: string[];
  benefits?: string[];
  experience_level?: string;
  expires_at?: string;
  is_remote?: boolean;
  is_urgent?: boolean;
  role_normalized?: string;
  trust_indicators?: {
    verified?: boolean;
    activelyHiring?: boolean;
    chatAvailable?: boolean;
    [key: string]: boolean | undefined;
  };
  
  // Properties needed by ListingCard
  features?: string[];
  price?: string;
  years_experience?: number;
  profile_views?: number;
}
