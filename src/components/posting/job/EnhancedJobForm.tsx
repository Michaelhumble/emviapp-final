
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JobFormValues } from './jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import { ReviewAndPaymentSection } from '@/components/posting/sections/ReviewAndPaymentSection';
import { CardContent } from '@/components/ui/card';
import JobForm from './JobForm';

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, photoUploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  onStepChange?: (step: number) => void;
  initialTemplate?: JobFormValues;
  isCustomTemplate?: boolean;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ 
  onSubmit, 
  onStepChange, 
  initialTemplate,
  isCustomTemplate = false
}) => {
  const [activeTab, setActiveTab] = useState('job-details');
  const [jobFormData, setJobFormData] = useState<JobFormValues | null>(initialTemplate || null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'premium',
    isNationwide: false,
    durationMonths: 1,
    autoRenew: false,
    isFirstPost: true
  });

  const handleJobFormSubmit = (data: JobFormValues, photos: File[]) => {
    setJobFormData(data);
    setPhotoUploads(photos);
    setActiveTab('review-payment');
    onStepChange?.(3);
  };

  const handlePaymentSubmit = async () => {
    if (!jobFormData) return;
    
    setIsSubmitting(true);
    try {
      const success = await onSubmit(jobFormData, photoUploads, pricingOptions);
      if (!success) {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting job post:', error);
      setIsSubmitting(false);
    }
  };

  const handleBackToEdit = () => {
    setActiveTab('job-details');
    onStepChange?.(2);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="hidden">
        <TabsTrigger value="job-details">Job Details</TabsTrigger>
        <TabsTrigger value="review-payment">Review & Payment</TabsTrigger>
      </TabsList>
      
      <TabsContent value="job-details" className="space-y-4">
        <CardContent className="p-0 sm:p-2">
          <JobForm 
            onSubmit={handleJobFormSubmit}
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            initialValues={jobFormData || undefined}
            isCustomTemplate={isCustomTemplate}
          />
        </CardContent>
      </TabsContent>
      
      <TabsContent value="review-payment" className="space-y-4">
        <CardContent className="p-0 sm:p-2">
          <ReviewAndPaymentSection 
            formData={jobFormData} 
            photoUploads={photoUploads}
            onBack={handleBackToEdit} 
            onSubmit={handlePaymentSubmit}
            isSubmitting={isSubmitting}
            pricingOptions={pricingOptions}
            setPricingOptions={setPricingOptions}
          />
        </CardContent>
      </TabsContent>
    </Tabs>
  );
};

export default EnhancedJobForm;
