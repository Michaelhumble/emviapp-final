
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePricing } from '@/context/pricing/PricingContext';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { PricingOptions } from '@/utils/posting/types';
import JobBasicInfoForm from './forms/JobBasicInfoForm';
import JobDetailsForm from './forms/JobDetailsForm';
import JobContactForm from './forms/JobContactForm';
import { PaymentSummary, type PriceData } from '@/components/posting/PaymentSummary';
import { useTranslation } from '@/hooks/useTranslation';

// Mock price calculation - replace with actual pricing logic
const calculatePrice = (pricingOptions: PricingOptions): PriceData => {
  const basePrice = pricingOptions.selectedPricingTier === 'premium' ? 99 : 49;
  return {
    basePrice,
    discountedPrice: basePrice * 0.9,
    finalPrice: basePrice * 0.9,
    discountPercentage: 10,
    discountLabel: "Early Adopter Discount",
    discountAmount: basePrice * 0.1,
    isFoundersDiscount: true
  };
};

export interface PremiumJobPostFormProps {
  onSubmit: (
    data: JobFormValues, 
    uploads: File[], 
    pricingOptions: PricingOptions
  ) => Promise<boolean>;
  initialTemplate?: JobFormValues;
  onBack?: () => void;
  isLoading?: boolean;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
  onStepChange?: (step: number) => void;
}

const PremiumJobPostForm: React.FC<PremiumJobPostFormProps> = ({
  onSubmit,
  initialTemplate,
  onBack,
  isLoading = false,
  isCustomTemplate = false,
  maxPhotos = 5,
  onStepChange
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const { pricingOptions } = usePricing();
  const { t } = useTranslation();
  
  // Create default values with proper types
  const defaultValues: JobFormValues = {
    title: "",
    description: "",
    vietnameseDescription: "",
    location: "",
    jobType: "",
    compensation_type: "",
    compensation_details: "",
    salary_range: "",
    experience_level: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    salonName: "",
    weekly_pay: false,
    has_housing: false,
    has_wax_room: false,
    owner_will_train: false,
    no_supply_deduction: false,
    specialties: [],
    requirements: [], // Ensure requirements is an array
    templateType: "",
    image: "",
    ...initialTemplate
  };
  
  // Ensure requirements is always an array
  if (initialTemplate && typeof initialTemplate.requirements === 'string') {
    defaultValues.requirements = (initialTemplate.requirements as unknown as string).split(',').map(s => s.trim());
  }
  
  const methods = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
  });
  
  const handleSubmit = async (data: JobFormValues) => {
    const success = await onSubmit(data, photoUploads, pricingOptions);
    if (success) {
      methods.reset();
      setPhotoUploads([]);
    }
  };
  
  const nextStep = () => {
    if (currentStep < 3) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      if (onStepChange) onStepChange(newStep);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      if (onStepChange) onStepChange(newStep);
      window.scrollTo(0, 0);
    } else if (onBack) {
      onBack();
    }
  };

  // Calculate price based on selected options
  const priceData = calculatePrice(pricingOptions);
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="flex-1 h-2 bg-gray-100 rounded-full">
            <div 
              className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
          <span className="ml-4 text-sm font-medium text-gray-700">
            {t({
              english: `Step ${currentStep} of 3`,
              vietnamese: `Bước ${currentStep} / 3`
            })}
          </span>
        </div>
        
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-playfair font-bold mb-4">
              {t({
                english: "Job Basics",
                vietnamese: "Thông tin cơ bản"
              })}
            </h2>
            <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6 md:p-8">
                <JobBasicInfoForm />
              </CardContent>
            </Card>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-playfair font-bold mb-4">
              {t({
                english: "Job Details",
                vietnamese: "Chi tiết công việc"
              })}
            </h2>
            <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6 md:p-8">
                <JobDetailsForm />
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-lg font-medium mb-4">
                  {t({
                    english: "Upload Photos",
                    vietnamese: "Tải lên hình ảnh"
                  })}
                </h3>
                <PhotoUploader 
                  onChange={setPhotoUploads}
                  files={photoUploads}
                />
              </CardContent>
            </Card>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-playfair font-bold mb-4">
              {t({
                english: "Contact & Review",
                vietnamese: "Liên hệ & Xem lại"
              })}
            </h2>
            <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6 md:p-8">
                <JobContactForm />
              </CardContent>
            </Card>
              
            <PaymentSummary priceData={priceData} />
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
              <div className="text-blue-500 mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <p className="text-sm text-blue-800">
                {t({
                  english: "Your job post will be reviewed and published within 24 hours after payment. You'll receive an email confirmation.",
                  vietnamese: "Bài đăng của bạn sẽ được xem xét và xuất bản trong vòng 24 giờ sau khi thanh toán. Bạn sẽ nhận được email xác nhận."
                })}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={isLoading}
            className="px-6"
          >
            {currentStep === 1 && onBack ? 
              t({
                english: "Back to Templates",
                vietnamese: "Quay lại Mẫu"
              }) : 
              t({
                english: "Previous",
                vietnamese: "Quay lại"
              })
            }
          </Button>
          
          {currentStep < 3 ? (
            <Button 
              type="button" 
              onClick={nextStep}
              className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {t({
                english: "Next",
                vietnamese: "Tiếp theo"
              })}
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={isLoading}
              className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? 
                t({
                  english: "Submitting...",
                  vietnamese: "Đang gửi..."
                }) : 
                t({
                  english: "Submit Job Posting",
                  vietnamese: "Đăng tin tuyển dụng"
                })
              }
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default PremiumJobPostForm;
