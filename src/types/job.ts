
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
}
