
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JobFormValues } from './jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import { ReviewAndPaymentSection } from '@/components/posting/sections/ReviewAndPaymentSection';
import { CardContent } from '@/components/ui/card';
import JobForm from './JobForm';
import { toast } from 'sonner';
import { usePricing } from '@/context/pricing/PricingProvider';
import { PricingProvider } from '@/context/pricing/PricingProvider';

export interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, photoUploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  onStepChange?: (step: number) => void;
  onBack?: () => void;
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
  maxPhotos = 5
}) => {
  const [activeTab, setActiveTab] = useState('job-details');
  const [jobFormData, setJobFormData] = useState<JobFormValues | null>(initialTemplate || null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Safely use the pricing context, with a fallback if needed
  const usePricingHook = () => {
    try {
      return usePricing();
    } catch (error) {
      console.error("Pricing context not available in EnhancedJobForm, using internal fallback", error);
      // Return null if the context is not available
      return null;
    }
  };
  
  const pricingContext = usePricingHook();
  
  // If no external pricing context is available, use a default one
  const defaultPricingOptions: PricingOptions = {
    selectedPricingTier: 'premium',
    durationMonths: 1,
    autoRenew: true,
    isFirstPost: true,
    isNationwide: false
  };
  
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
    
    // Use pricing options from context if available, otherwise use default
    const pricingOptions = pricingContext?.pricingOptions || defaultPricingOptions;
    
    // Validation check for paid plans
    if (pricingOptions.selectedPricingTier !== 'free' && 
        pricingContext?.priceData && pricingContext.priceData.finalPrice <= 0) {
      toast.error("Invalid price calculation. Please try again or contact support.");
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

  // If no pricing context is available, wrap with our own provider
  if (!pricingContext) {
    console.log('EnhancedJobForm: No pricing context available, using internal provider with defaults:', defaultPricingOptions);
    
    return (
      <PricingProvider initialOptions={defaultPricingOptions}>
        <EnhancedJobFormContent 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          jobFormData={jobFormData}
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
          isSubmitting={isSubmitting}
          handleJobFormSubmit={handleJobFormSubmit}
          handleBackToEdit={handleBackToEdit}
          handlePaymentSubmit={handlePaymentSubmit}
          isCustomTemplate={isCustomTemplate}
          maxPhotos={maxPhotos}
        />
      </PricingProvider>
    );
  }

  return (
    <EnhancedJobFormContent 
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      jobFormData={jobFormData}
      photoUploads={photoUploads}
      setPhotoUploads={setPhotoUploads}
      isSubmitting={isSubmitting}
      handleJobFormSubmit={handleJobFormSubmit}
      handleBackToEdit={handleBackToEdit}
      handlePaymentSubmit={handlePaymentSubmit}
      isCustomTemplate={isCustomTemplate}
      maxPhotos={maxPhotos}
    />
  );
};

// Separate content component to avoid duplication
interface EnhancedJobFormContentProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  jobFormData: JobFormValues | null;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting: boolean;
  handleJobFormSubmit: (data: JobFormValues, uploads?: File[]) => void;
  handleBackToEdit: () => void;
  handlePaymentSubmit: () => Promise<void>;
  isCustomTemplate: boolean;
  maxPhotos: number;
}

const EnhancedJobFormContent: React.FC<EnhancedJobFormContentProps> = ({
  activeTab,
  setActiveTab,
  jobFormData,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  handleJobFormSubmit,
  handleBackToEdit,
  handlePaymentSubmit,
  isCustomTemplate,
  maxPhotos
}) => {
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
            maxPhotos={maxPhotos}
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
          />
        </CardContent>
      </TabsContent>
    </Tabs>
  );
};

export default EnhancedJobForm;
