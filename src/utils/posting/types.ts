
export interface JobPosting {
  id: string;
  title: string;
  company?: string;
  location: string;
  salary?: string;
  description?: string;
  requirements?: string[];
  benefits?: string[];
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  posted?: string;
  expires?: string;
  isPinned?: boolean; // New property for pinned jobs
}

export type JobPricingTier = 'basic' | 'premium' | 'featured';

export interface JobPricingOption {
  id: string;
  name: string;
  tier: JobPricingTier;
  price: number;
  description: string;
  features: string[];
  duration: number; // in days
  popular?: boolean;
}
