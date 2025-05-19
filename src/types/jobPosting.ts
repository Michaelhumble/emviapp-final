
// Job posting state management types
import { JobFormValues } from '@/components/posting/job/jobFormSchema';

export interface JobPostingState {
  // Form data
  jobData: JobFormValues;
  // Pricing selection
  pricingOptions: PricingOptions;
  // Uploaded files
  photoUploads: File[];
  // Current step in wizard
  currentStep: 'details' | 'review' | 'payment' | 'success';
  // Calculated pricing information
  calculatedPrice: PricingSummary;
  // Validation state
  validation: {
    hasValidJobData: boolean;
    hasValidPricing: boolean;
    errors: string[];
  };
  // UI state
  ui: {
    isSubmitting: boolean;
    isNavigatingBack: boolean;
    showDebugPanel: boolean;
  };
  // Tracking & analytics data
  analytics: {
    startTime: number;
    stepTimes: Record<string, number>;
    pricingChanges: number;
    formSubmitAttempts: number;
  };
}

// Price calculation result
export interface PricingSummary {
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  isFreeTrial: boolean;
  currency: string;
  formattedOriginalPrice: string;
  formattedFinalPrice: string;
  recurringBilling: boolean;
  nextBillingDate?: string;
}

// Complete pricing options
export interface PricingOptions {
  // Core pricing selections
  selectedPricingTier: JobPricingTier;
  durationMonths: number;
  autoRenew: boolean;
  
  // Special flags
  isFirstPost: boolean;
  isNationwide?: boolean;
  
  // Promotional options
  expertReview?: boolean;
  priorityPlacement?: boolean;
  extendedReach?: boolean;
  
  // Flags for renewal and bundling
  isRenewal?: boolean;
  bundleWithSalonPost?: boolean;
  bundleWithJobPost?: boolean;
  
  // Additional options
  fastSalePackage?: boolean;
  showAtTop?: boolean;
  hasReferrals?: boolean;
}

// Valid pricing tiers
export type JobPricingTier = 'free' | 'standard' | 'premium' | 'gold' | 'diamond';

// Job details normalized to match backend expectations
export interface JobDetailsSubmission {
  // Basic information
  title: string;
  description?: string;
  vietnameseDescription?: string;
  location: string;
  
  // Compensation information
  compensation_type?: string;
  compensation_details?: string;
  employment_type?: string;
  salary_range?: string;
  tip_range?: string;
  
  // Benefits and features
  requirements?: string[] | string;
  specialties?: string[];
  benefits?: string[];
  features?: string[];
  preferred_languages?: string[];
  
  // Special flags
  weekly_pay?: boolean;
  has_housing?: boolean;
  has_wax_room?: boolean;
  no_supply_deduction?: boolean;
  owner_will_train?: boolean;
  is_urgent?: boolean;
  
  // Contact information
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactZalo?: string;
  
  // For backend use
  user_id?: string;
  post_type?: string;
  salon_type?: string;
}

// Extended JobFormValues type to ensure compatibility with JobDetailsSubmission
// This type augmentation helps fix the type errors in JobPostPreview and CreateJobPosting
export interface ExtendedJobFormValues extends JobFormValues {
  // No need for additional fields, just ensure compatibility
}

// Action types for reducer
export type JobPostingAction =
  | { type: 'UPDATE_JOB_DATA'; payload: Partial<JobFormValues> }
  | { type: 'UPDATE_PRICING_OPTIONS'; payload: Partial<PricingOptions> }
  | { type: 'SET_PHOTO_UPLOADS'; payload: File[] }
  | { type: 'SET_STEP'; payload: JobPostingState['currentStep'] }
  | { type: 'VALIDATE_FORM' }
  | { type: 'START_SUBMISSION' }
  | { type: 'SUBMISSION_SUCCESS' }
  | { type: 'SUBMISSION_FAILURE'; payload: string }
  | { type: 'NAVIGATE_BACK' }
  | { type: 'TOGGLE_DEBUG_PANEL' }
  | { type: 'RESET_FORM' };
