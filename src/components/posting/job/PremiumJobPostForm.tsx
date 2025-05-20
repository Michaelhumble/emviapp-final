
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobFormValues, jobFormSchema, CompensationTypes } from './jobFormSchema';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle, Upload } from 'lucide-react';
import JobBasicInfoForm from './forms/JobBasicInfoForm';
import JobDetailsForm from './forms/JobDetailsForm';
import JobContactForm from './forms/JobContactForm';
import JobSummary from '@/components/jobs/card-sections/JobSummary';
import { PricingOptions } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';
import PhotoUploader from './PhotoUploader';

interface PremiumJobPostFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  initialTemplate?: JobFormValues;
  isLoading?: boolean;
  onBack?: () => void;
  onStepChange?: (step: number) => void;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
}

const PremiumJobPostForm: React.FC<PremiumJobPostFormProps> = ({
  onSubmit,
  initialTemplate,
  isLoading = false,
  onBack,
  onStepChange,
  isCustomTemplate = false,
  maxPhotos = 5
}) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'premium',
    durationMonths: 1,
    autoRenew: true,
    isFirstPost: true,
    isNationwide: false
  });

  const methods = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialTemplate || {
      title: '',
      description: '',
      vietnameseDescription: '',
      location: '',
      jobType: '',
      compensation_type: '',
      compensation_details: '',
      salary_range: '',
      experience_level: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      salonName: '',
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
      specialties: [],
      requirements: []
    }
  });

  const handleNextStep = () => {
    setStep(step + 1);
    if (onStepChange) onStepChange(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    if (onStepChange) onStepChange(step - 1);
  };

  const handleSubmitForm = async (data: JobFormValues) => {
    try {
      // Convert any string requirements to array to ensure consistency
      if (typeof data.requirements === 'string') {
        data.requirements = [data.requirements];
      }

      return await onSubmit(data, photoUploads, pricingOptions);
    } catch (error) {
      console.error("Form submission error:", error);
      return false;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <JobBasicInfoForm />;
      case 2:
        return <JobDetailsForm />;
      case 3:
        return <JobContactForm />;
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Upload Photos (Optional)</h3>
            <p className="text-sm text-gray-600">Add up to {maxPhotos} images that showcase your salon or workplace.</p>
            <PhotoUploader
              maxPhotos={maxPhotos}
              uploads={photoUploads}
              onUploadsChange={setPhotoUploads}
            />
          </div>
        );
      case 5:
        const formValues = methods.getValues();
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Review Your Job Posting</h3>
            <JobSummary
              title={formValues.title}
              description={formValues.description}
              location={formValues.location}
              contactEmail={formValues.contactEmail}
              contactPhone={formValues.contactPhone}
              jobType={formValues.jobType}
              salonName={formValues.salonName}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center space-x-2 mb-8">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={`w-2.5 h-2.5 rounded-full ${
              s === step 
                ? 'bg-primary' 
                : s < step 
                  ? 'bg-green-500' 
                  : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderStepTitle = () => {
    switch (step) {
      case 1:
        return "Basic Information";
      case 2:
        return "Job Details";
      case 3:
        return "Contact Information";
      case 4:
        return "Upload Photos";
      case 5:
        return "Review & Submit";
      default:
        return "";
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="py-6 px-6">
        {renderStepIndicator()}
        
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-center">
            {renderStepTitle()}
          </h2>
          <p className="text-center text-gray-600 mt-1">
            Step {step} of 5
          </p>
        </div>

        <Card className="bg-white overflow-hidden mb-6">
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          {(step > 1 && onBack) && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={step === 1 ? onBack : handlePreviousStep}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          
          {step > 1 && !onBack && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={handlePreviousStep}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}

          {step < 5 ? (
            <Button 
              type="button" 
              onClick={handleNextStep}
              className="flex items-center ml-auto"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              type="button" 
              onClick={methods.handleSubmit(handleSubmitForm)}
              disabled={isLoading}
              className="flex items-center ml-auto"
            >
              {isLoading ? 'Submitting...' : 'Submit Job Posting'}
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default PremiumJobPostForm;
