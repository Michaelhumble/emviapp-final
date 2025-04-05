
export type PostType = 'job' | 'salon' | 'booth' | 'supply';

export interface PricingOptions {
  isFirstPost?: boolean;
  isNationwide?: boolean;
  fastSalePackage?: boolean;
  showAtTop?: boolean;
  bundleWithJobPost?: boolean;
  hasReferrals?: boolean;
  isRenewal?: boolean;
  featuredPost?: boolean;
}

export interface UserPostingStats {
  jobPostCount: number;
  salonPostCount: number;
  boothPostCount: number;
  supplyPostCount: number;
  totalPostCount: number;
  hasReferrals: boolean;
}

export interface PostingFormContextType {
  formData: any;
  setFormData: (data: any) => void;
  step: number;
  setStep: (step: number) => void;
  resetForm: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  pricing: {
    showNationwide: boolean;
    setShowNationwide: (show: boolean) => void;
    fastSalePackage: boolean;
    setFastSalePackage: (enabled: boolean) => void;
    showAtTop: boolean;
    setShowAtTop: (show: boolean) => void;
    bundleWithJobPost: boolean;
    setBundleWithJobPost: (bundle: boolean) => void;
  };
}
