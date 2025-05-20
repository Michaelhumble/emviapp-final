
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { usePricing } from '@/context/pricing/PricingContext';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { PricingOptions } from '@/utils/posting/types';
import JobBasicInfoForm from './forms/JobBasicInfoForm';
import JobDetailsForm from './forms/JobDetailsForm';
import JobContactForm from './forms/JobContactForm';
import { PaymentSummary, type PriceData } from '@/components/posting/PaymentSummary';

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

export interface EnhancedJobFormProps {
  onSubmit: (
    data: JobFormValues, 
    uploads: File[], 
    pricingOptions: PricingOptions
  ) => Promise<boolean>;
  isLoading?: boolean;
  initialTemplate?: JobFormValues;
  onBack?: () => void;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
}

export const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({
  onSubmit,
  isLoading = false,
  initialTemplate,
  onBack,
  isCustomTemplate = false,
  maxPhotos = 5
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const { pricingOptions } = usePricing();
  
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
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
        <div className="flex items-center mb-4">
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-primary rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
          <span className="ml-4 text-sm text-gray-500">
            Step {currentStep} of 3
          </span>
        </div>
        
        {currentStep === 1 && (
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-xl font-playfair font-bold mb-6">Job Basics</h2>
              <JobBasicInfoForm />
            </CardContent>
          </Card>
        )}
        
        {currentStep === 2 && (
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-xl font-playfair font-bold mb-6">Job Details</h2>
              <JobDetailsForm />

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Upload Photos</h3>
                <PhotoUploader 
                  onChange={setPhotoUploads} 
                  files={photoUploads}
                />
              </div>
            </CardContent>
          </Card>
        )}
        
        {currentStep === 3 && (
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-xl font-playfair font-bold mb-6">Contact Information</h2>
              <JobContactForm />
              
              <Separator className="my-8" />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Job Post Summary</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Review your job post details before submitting.
                </p>
                <PaymentSummary priceData={priceData} />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={isLoading}
          >
            {currentStep === 1 && onBack ? 'Back to Templates' : 'Previous'}
          </Button>
          
          {currentStep < 3 ? (
            <Button 
              type="button" 
              onClick={nextStep}
            >
              Next
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Job Posting'}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default EnhancedJobForm;
