
export interface Job {
  id: string;
  title: string;
  compensation_type: string;
  compensation_details: string;
  created_at: string;
  expires_at: string;
  status: string;
  requirements?: string;
  description?: string;
  salon_id?: string;
  updated_at?: string;
  _count?: {
    applications: number;
  };
  is_sample?: boolean;
  
  // Additional fields used across the application
  company?: string;
  location?: string;
  employment_type?: string;
  salary_range?: string;
  weekly_pay?: boolean;
  owner_will_train?: boolean;
  has_housing?: boolean;
  no_supply_deduction?: boolean;
  specialties?: string[];
  vietnamese_description?: string;
  company_description?: string;
  responsibilities?: string[];
  qualifications?: string[];
  benefits?: string[];
  tip_range?: string;
  contact_info?: {
    owner_name?: string;
    phone?: string;
    email?: string;
  };
  trust_indicators?: {
    verified?: boolean;
    activelyHiring?: boolean;
    chatAvailable?: boolean;
  };
  user_id?: string;
  is_nationwide?: boolean;
  
  // Salon for sale fields
  image?: string;
  asking_price?: string;
  monthly_rent?: string;
  square_feet?: string;
  number_of_stations?: number;
  number_of_chairs?: number; // Added because it's used in salonData.ts
  revenue?: string;
  reason_for_selling?: string;
  salon_features?: string[];
  has_wax_room?: boolean;
  has_dining_room?: boolean;
  has_laundry?: boolean;
  emvi_ai_boosted?: boolean;
  work_hours?: string;
  posted_date?: string;
  closing_date?: string | null;
  contact_email?: string;
  is_featured?: boolean;
  is_remote?: boolean;
  experience_level?: string;
}
