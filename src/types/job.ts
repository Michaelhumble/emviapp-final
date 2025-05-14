export interface Job {
  id: string;
  title: string;
  description?: string;
  location: string;
  company?: string;
  // Add image fields
  photo?: string;
  image?: string;
  imageUrl?: string;
  type?: 'job' | 'salon' | 'opportunity';
  salary?: string;
  is_featured?: boolean;
  employment_type?: string;
  compensation_details?: string;
  specialties?: string[];
  weekly_pay?: boolean;
  has_housing?: boolean;
  owner_will_train?: boolean;
  created_at: string;
  vietnamese_description?: string;
  contact_info?: {
    phone?: string;
  };
  pricingTier?: string;
  status?: string;
}
