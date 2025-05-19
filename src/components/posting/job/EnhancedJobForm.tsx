
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JobFormValues } from './jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import { ReviewAndPaymentSection } from '@/components/posting/sections/ReviewAndPaymentSection';
import { CardContent } from '@/components/ui/card';
import JobForm from './JobForm';
import { toast } from 'sonner';

export interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, photoUploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  onStepChange?: (step: number) => void;
  onBack?: () => void; // Added missing onBack prop
  initialTemplate?: JobFormValues;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ 
  onSubmit, 
  onStepChange, 
  onBack,
  initialTemplate,
  isCustomTemplate = false,
  maxPhotos = 5 // Default to 5 photos
}) => {
  const [activeTab, setActiveTab] = useState('job-details');
  const [jobFormData, setJobFormData] = useState<JobFormValues | null>(initialTemplate || null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'premium', // Default to premium tier
    durationMonths: 1,             // Default to 1 month
    autoRenew: true,               // Default to auto-renew enabled
    isFirstPost: true,             // Default to first post (for free tier)
    isNationwide: false            // Default to local listing
  });

  // Update the handleJobFormSubmit to match the JobForm onSubmit signature
  const handleJobFormSubmit = (data: JobFormValues, uploads?: File[]) => {
    // Validate required fields
    if (!data.title || !data.description || !data.location || !data.contactEmail) {
      toast.error("Please complete all required fields before continuing");
      return;
    }

    // If uploads are provided, update photoUploads state
    if (uploads && uploads.length > 0) {
      setPhotoUploads(uploads);
    }

    setJobFormData(data);
    setActiveTab('review-payment');
    onStepChange?.(3);
  };

  const handlePaymentSubmit = async () => {
    if (!jobFormData) {
      toast.error("Job information is missing");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Pass all data to the onSubmit handler
      const success = await onSubmit(jobFormData, photoUploads, pricingOptions);
      
      if (!success) {
        setIsSubmitting(false);
        toast.error("There was a problem processing your payment. Please try again.");
        // If success is false, we don't navigate away so user can try again
      }
      // On success, the parent component will handle navigation
      
    } catch (error) {
      console.error('Error submitting job post:', error);
      toast.error("Error creating job post");
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
            maxPhotos={maxPhotos} // Pass maxPhotos prop
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
