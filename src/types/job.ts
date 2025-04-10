
// Job type definition
export interface Job {
  id: string;
  role: string;
  role_normalized?: string;
  company: string;
  location: string;
  for_sale?: boolean;
  posted_at: string;
  created_at: string;
  experience_level?: string;
  employment_type?: string;
  description: string;
  requirements?: string[];
  specialties?: string[];
  benefits?: string[];
  is_featured?: boolean;
  is_remote?: boolean;
  is_urgent?: boolean;
  salon_features?: string[];
  vietnamese_description?: string;
  monthly_rent?: string;
  asking_price?: string;
  number_of_stations?: string;
  square_feet?: string;
  reason_for_selling?: string;
  has_housing?: boolean;
  owner_will_train?: boolean;
  revenue?: string;
  contact_info?: {
    phone?: string;
    email?: string;
    owner_name?: string; // Added owner_name property
  };
  emvi_ai_boosted?: boolean;
  status?: string;
  image?: string;
  
  // Additional properties needed by components
  title?: string;
  compensation_type?: string;
  compensation_details?: string;
  salary_range?: string;
  tip_range?: string;
  weekly_pay?: boolean;
  no_supply_deduction?: boolean;
  preferred_languages?: string[];
  trust_indicators?: string[];
  user_id?: string;
  expires_at?: string;
  has_wax_room?: boolean;
  has_dining_room?: boolean;
  has_laundry?: boolean;
}
