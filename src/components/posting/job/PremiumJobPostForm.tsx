
import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import JobBasicInfoForm from './forms/JobBasicInfoForm';
import JobDetailsForm from './forms/JobDetailsForm';
import JobContactForm from './forms/JobContactForm';
import JobPhotosForm from './forms/JobPhotosForm';
import JobPreviewForm from './forms/JobPreviewForm';
import { ProgressBar } from './ProgressBar';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { PricingOptions } from '@/utils/posting/types';
import { usePricingContext } from '@/context/pricing/PricingProvider';
import PricingSection from '../pricing/PricingSection';
import PhotoUploader from './PhotoUploader';

interface PremiumJobPostFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions?: PricingOptions) => Promise<boolean>;
  initialTemplate?: JobFormValues;
  isCustomTemplate?: boolean;
  onBack?: () => void;
  isLoading?: boolean;
  maxPhotos?: number;
  onStepChange?: (step: number) => void;
}

const STEPS = [
  'Basic Info',
  'Job Details',
  'Contact Info',
  'Photos',
  'Preview',
  'Pricing'
];

const PremiumJobPostForm: React.FC<PremiumJobPostFormProps> = ({
  onSubmit,
  initialTemplate,
  isCustomTemplate = false,
  onBack,
  isLoading = false,
  maxPhotos = 5,
  onStepChange
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const { pricingOptions, setPricingOptions } = usePricingContext();

  // Initialize form with default values or template
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
    salonName: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    weekly_pay: false,
    has_housing: false,
    has_wax_room: false,
    owner_will_train: false,
    no_supply_deduction: false,
    specialties: [],
    requirements: [],
    templateType: "",
    image: "",
    ...initialTemplate
  };

  const methods = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
  });

  // Update parent component whenever step changes
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep);
    }
  }, [currentStep, onStepChange]);

  const nextStep = async () => {
    const isValid = await methods.trigger();
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePhotoUploadsChange = (files: File[]) => {
    setPhotoUploads(files);
  };

  const handleFormSubmit = async (data: JobFormValues) => {
    const success = await onSubmit(data, photoUploads, pricingOptions);
    return success;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <JobBasicInfoForm />;
      case 2:
        return <JobDetailsForm />;
      case 3:
        return <JobContactForm />;
      case 4:
        return (
          <JobPhotosForm>
            <PhotoUploader
              uploads={photoUploads}
              onUploadsChange={handlePhotoUploadsChange}
              maxPhotos={maxPhotos}
            />
          </JobPhotosForm>
        );
      case 5:
        return (
          <JobPreviewForm
            formData={methods.getValues()}
            photoUploads={photoUploads}
          />
        );
      case 6:
        return (
          <PricingSection
            postType="job"
            onPricingOptionsChange={(options) => setPricingOptions(options)}
            pricingOptions={pricingOptions}
          />
        );
      default:
        return <JobBasicInfoForm />;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        {/* Back button and progress header */}
        <div className="flex items-center justify-between">
          {onBack && (
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="flex items-center text-gray-600"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Templates
            </Button>
          )}
          <div className="text-sm text-gray-500">
            Step {currentStep} of {STEPS.length}
          </div>
        </div>

        {/* Progress bar */}
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={STEPS.length} 
        />

        {/* Main step content */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 pb-6">
            <CardTitle className="text-xl font-bold text-gray-800">
              {STEPS[currentStep - 1]}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="space-y-6">
              {renderStepContent()}
              
              <div className="flex justify-between pt-4">
                {currentStep > 1 ? (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={prevStep}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                  </Button>
                ) : (
                  <div></div>
                )}

                {currentStep < STEPS.length ? (
                  <Button 
                    type="button"
                    onClick={nextStep}
                  >
                    Next <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    {isLoading ? 'Submitting...' : 'Complete & Pay'}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  );
};

export default PremiumJobPostForm;
