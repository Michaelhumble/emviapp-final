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
  wasPrice?: number; // Add the 'was' price
  description: string;
  vietnameseDescription?: string; // Add Vietnamese description
  features: string[];
  duration: number; // in days
  popular?: boolean;
  tag?: string; // Add tag for promotional display
  note?: string; // Add note for additional information
}

// Add missing types
export type PostType = 'job' | 'salon' | 'booth' | 'supply';

export interface PricingOptions {
  isFirstPost?: boolean;
  isRenewal?: boolean; // Added the missing property
  isNationwide?: boolean;
  fastSalePackage?: boolean;
  showAtTop?: boolean;
  bundleWithJobPost?: boolean;
  hasReferrals?: boolean;
  isHotListing?: boolean;
  isUrgent?: boolean;
  bundleWithSalonPost?: boolean;
  boostVisibility?: boolean;
  featuredListing?: boolean;
  extendedDuration?: boolean;
  featuredPost?: boolean;
}

// Added the missing interface
export interface UserPostingStats {
  jobPostCount: number;
  salonPostCount: number;
  boothPostCount: number;
  supplyPostCount: number;
  totalPostCount: number;
  hasReferrals: boolean;
}
