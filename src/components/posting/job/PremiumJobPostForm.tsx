
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import PhotoUploader from '../PhotoUploader';
import { PricingSection } from '../PricingSection';
import { getJobPrice, jobPricingOptions } from '@/utils/posting/jobPricing';
import { JobPricingTier, PricingOptions } from '@/utils/posting/types';
import PaymentSummary from '../PaymentSummary';
import { usePricing } from '@/context/pricing/PricingContext';
import JobDetailsSection from '../sections/JobDetailsSection';
import ContactInfoSection from '../sections/ContactInfoSection';
import { useTranslation } from '@/hooks/useTranslation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, ChevronLeft } from 'lucide-react';

interface PremiumJobPostFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  initialTemplate?: JobFormValues;
  onBack?: () => void;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
  onStepChange?: (step: number) => void;
}

const PremiumJobPostForm: React.FC<PremiumJobPostFormProps> = ({
  onSubmit,
  initialTemplate,
  onBack,
  isCustomTemplate = false,
  maxPhotos = 3,
  onStepChange
}) => {
  const { t } = useTranslation();
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const { pricingOptions, setPricingOptions } = usePricing();

  // Ensure proper types for the initial values
  const defaultValues: JobFormValues = {
    title: "",
    description: "",
    vietnameseDescription: "",
    location: "",
    jobType: "Full-time",
    compensation_type: "",
    compensation_details: "",
    salary_range: "",
    experience_level: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    contactZalo: "",
    salonName: "",
    weekly_pay: false,
    has_housing: false,
    has_wax_room: false,
    owner_will_train: false,
    no_supply_deduction: false,
    specialties: [],
    requirements: [],
    templateType: isCustomTemplate ? "custom" : "",
    image: "",
    ...initialTemplate
  };

  // Ensure requirements is always an array
  if (initialTemplate && typeof initialTemplate.requirements === 'string') {
    defaultValues.requirements = initialTemplate.requirements ? [initialTemplate.requirements as string] : [];
  }

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues
  });

  const handleSubmit = async (data: JobFormValues) => {
    return await onSubmit(data, photoUploads, pricingOptions);
  };

  const handleTierSelect = (tier: string) => {
    setPricingOptions({
      ...pricingOptions,
      selectedPricingTier: tier as JobPricingTier
    });
  };

  const nextStep = () => {
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    if (onStepChange) onStepChange(newStep);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    const newStep = currentStep - 1;
    setCurrentStep(newStep);
    if (onStepChange) onStepChange(newStep);
    window.scrollTo(0, 0);
  };

  const availableTiers = jobPricingOptions.filter(option => !option.hidden);

  // Define steps
  const steps = [
    { title: "Job Details", key: "details" },
    { title: "Contact Information", key: "contact" },
    { title: "Photos & Pricing", key: "photos" }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <JobDetailsSection form={form} showVietnameseByDefault={true} />;
      case 2:
        return <ContactInfoSection form={form} />;
      case 3:
        return (
          <>
            {/* Photos */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">
                {t({
                  english: "Add Photos (Optional)",
                  vietnamese: "Thêm Hình Ảnh (Không bắt buộc)"
                })}
              </h3>
              <PhotoUploader 
                maxPhotos={maxPhotos} 
                onUploadsChange={setPhotoUploads} 
                uploads={photoUploads}
              />
            </div>
            
            {/* Pricing */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">
                {t({
                  english: "Select Your Pricing Plan",
                  vietnamese: "Chọn Gói Dịch Vụ"
                })}
              </h3>
              <PricingSection 
                pricingOptions={availableTiers}
                selectedTier={pricingOptions.selectedPricingTier}
                onSelectTier={handleTierSelect}
              />
            </div>
            
            <div className="border rounded-lg p-4 bg-gray-50">
              <PaymentSummary
                pricingOptions={pricingOptions}
                setPricingOptions={setPricingOptions}
                basePrice={getJobPrice(pricingOptions.selectedPricingTier, pricingOptions)}
                postType="job"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Step indicator */}
        <div className="mb-8">
          <div className="flex mb-6 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
                  currentStep > index + 1 
                    ? 'bg-green-500 text-white' 
                    : currentStep === index + 1 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200'
                }`}>
                  {currentStep > index + 1 ? <Check size={16} /> : index + 1}
                </div>
                <span className={`mr-4 text-sm font-medium ${
                  currentStep === index + 1 ? 'text-primary' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-8 h-px bg-gray-300 mr-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <Card className="p-6">
          {renderStepContent()}
        </Card>
        
        <div className="flex justify-between mt-6">
          {currentStep > 1 ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={currentStep === 1 && onBack ? onBack : prevStep}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {t({
                english: "Previous",
                vietnamese: "Quay lại"
              })}
            </Button>
          ) : onBack ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {t({
                english: "Back to Templates",
                vietnamese: "Trở về Mẫu"
              })}
            </Button>
          ) : (
            <div></div>
          )}
          
          {currentStep < steps.length ? (
            <Button 
              type="button" 
              onClick={nextStep}
            >
              {t({
                english: "Next",
                vietnamese: "Tiếp theo"
              })}
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 
                t({
                  english: "Submitting...",
                  vietnamese: "Đang gửi..."
                }) : 
                t({
                  english: "Submit Job Posting",
                  vietnamese: "Đăng Tin Tuyển Dụng"
                })
              }
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default PremiumJobPostForm;
