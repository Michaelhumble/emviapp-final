
export interface JobDetailsSubmission {
  title: string;
  description: string;
  location: string;
  jobType: string;
  salary?: string;
  contactEmail?: string;
  phoneNumber?: string;
  requirements?: string[];
  jobSummary?: string;
  startDate?: Date;
  language?: string;
}

export interface Job {
  id: string;
  title: string;
  company?: string;
  location: string;
  created_at: string;
  description: string;
  image?: string;
  imageUrl?: string;
  price?: string;
  status?: 'active' | 'expired' | 'pending';
  type?: string;
  role?: string;
  salary_range?: string;
  compensation_type?: string;
  compensation_details?: string;
  contact_info?: {
    phone?: string;
    email?: string;
    owner_name?: string;
    zalo?: string;
    notes?: string;
  };
  specialties?: string[];
  pricingTier?: 'free' | 'starter' | 'premium' | 'gold' | 'diamond' | 'expired';
  is_featured?: boolean;
  industry?: string;
  expires_at?: string;
  owner_id?: string;
  vietnamese_description?: string;
  is_vietnamese_listing?: boolean;
  
  // Salon specific fields
  salon_features?: string[];
  for_sale?: boolean;
  monthly_revenue?: string;
  revenue?: string;
  chair_count?: number;
  station_count?: number;
  sale_price?: string;
  
  // Additional job fields
  employment_type?: string;
  compensation?: string;
  has_housing?: boolean;
  weekly_pay?: boolean;
  owner_will_train?: boolean;
  
  // Additional fields that were missing but referenced in components
  user_id?: string;
  benefits?: string[];
  features?: string[];
  is_urgent?: boolean;
  isPinned?: boolean;
  salon_type?: string;
  no_supply_deduction?: boolean;
  tip_range?: string;
  trust_indicators?: string[];
  monthly_rent?: string;
  reason_for_selling?: string;
  asking_price?: string | number;
  square_feet?: number;
  verified?: boolean;
  featured_text?: string;
  
  // Requirements-related fields
  requirements?: string[];
  experience_level?: string;
  has_wax_room?: boolean;
  preferred_languages?: string[];
}

export interface PricingOptions {
  selectedPricingTier: string;
  isFirstPost?: boolean;
  isRenewal?: boolean;
  durationMonths?: number;
  isNationwide?: boolean;
  fastSalePackage?: boolean;
  showAtTop?: boolean;
  bundleWithJobPost?: boolean;
  hasReferrals?: boolean;
  autoRenew?: boolean;
  isHotListing?: boolean;
}

export interface JobWithApplications extends Job {
  applications: JobApplication[];
  applicationCount: number;
}

export interface JobApplication {
  id: string;
  job_id: string;
  applicant_id: string;
  applicant_name?: string;
  status: 'pending' | 'viewed' | 'contacted' | 'interviewed' | 'hired' | 'rejected';
  created_at: string;
  updated_at: string;
}

// Update ListingType enum to include all valid values
export type ListingType = 'job' | 'booth' | 'salon' | 'supply' | 'opportunity' | string;
