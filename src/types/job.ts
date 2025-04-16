
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
  contact_info?: {
    owner_name?: string;
    phone?: string;
    email?: string;
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
  salon_type?: string; // Added this property
  expires_at?: string;
  boosted_until?: string;
}
