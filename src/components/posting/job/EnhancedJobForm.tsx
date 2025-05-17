
import React, { useState } from 'react';
import { JobForm } from './JobForm';
import { PricingStep } from '../PricingStep';
import { Steps } from '@/components/ui/steps';
import { JobFormValues, IndustryType } from './jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import { PricingOptions } from '@/utils/posting/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EnhancedJobFormProps {
  onSubmit: (formData: JobFormValues, photoUploads: File[], pricingOptions: PricingOptions) => boolean | Promise<boolean>;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [jobFormData, setJobFormData] = useState<JobFormValues | null>(null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'free',
    durationMonths: 1,
    autoRenew: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleJobFormSubmit = (formData: any) => {
    setJobFormData(formData);
    setCurrentStep(1);
    return true;
  };
  
  const handlePricingSubmit = (options: PricingOptions) => {
    if (jobFormData) {
      setIsSubmitting(true);
      setPricingOptions(options);
      
      const result = onSubmit(jobFormData, photoUploads, options);
      
      // Handle both synchronous boolean return and Promise<boolean> return
      if (result instanceof Promise) {
        result
          .then((success) => {
            if (!success) {
              setIsSubmitting(false);
            }
          })
          .catch(() => {
            setIsSubmitting(false);
          });
      } else if (!result) {
        // If it's a synchronous false result
        setIsSubmitting(false);
      }
    }
  };
  
  const steps = [
    {
      title: t({
        english: 'Job Details',
        vietnamese: 'Chi Tiết Công Việc'
      }),
      description: t({
        english: 'Describe the position',
        vietnamese: 'Mô tả vị trí'
      })
    },
    {
      title: t({
        english: 'Review & Publish',
        vietnamese: 'Xem Lại & Đăng'
      }),
      description: t({
        english: 'Set posting options',
        vietnamese: 'Đặt tùy chọn đăng'
      })
    }
  ];
  
  return (
    <div className="w-full">
      <Steps 
        steps={steps} 
        currentStep={currentStep}
        className="mb-8"
      />
      
      <Tabs defaultValue="job-details" value={currentStep === 0 ? "job-details" : "pricing"}>
        <TabsList className="hidden">
          <TabsTrigger value="job-details">Job Details</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="job-details" className="m-0">
          <JobForm 
            onSubmit={handleJobFormSubmit}
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            isSubmitting={isSubmitting}
            initialValues={jobFormData || undefined}
          />
        </TabsContent>
        
        <TabsContent value="pricing" className="m-0">
          <PricingStep 
            onSubmit={handlePricingSubmit}
            onBack={() => setCurrentStep(0)}
            isSubmitting={isSubmitting}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedJobForm;
