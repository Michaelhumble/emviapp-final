
export type PostType = 'job' | 'salon' | 'booth' | 'supply';

export interface PricingOptions {
  isFirstPost?: boolean;
  isNationwide?: boolean;
  fastSalePackage?: boolean;
  showAtTop?: boolean;
  bundleWithJobPost?: boolean;
  hasReferrals?: boolean;
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
