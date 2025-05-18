
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JobFormValues } from './jobFormSchema';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { ReviewAndPaymentSection } from '@/components/posting/sections/ReviewAndPaymentSection';
import { CardContent } from '@/components/ui/card';
import JobForm from './JobForm';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, photoUploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  onStepChange?: (step: number) => void;
  initialTemplate?: JobFormValues;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ 
  onSubmit, 
  onStepChange, 
  initialTemplate,
  isCustomTemplate = false,
  maxPhotos = 5
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('job-details');
  const [jobFormData, setJobFormData] = useState<JobFormValues | null>(initialTemplate || null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'premium' as JobPricingTier, // Default to premium tier
    durationMonths: 1,             // Default to 1 month
    autoRenew: true,               // Default to auto-renew enabled
    isFirstPost: true,             // Default to first post (for free tier)
    isNationwide: false            // Default to local listing
  });

  // Handle job form submission
  const handleJobFormSubmit = (data: JobFormValues, uploads?: File[]) => {
    // Validate required fields
    if (!data.title || !data.description || !data.location || !data.contactEmail) {
      toast.error(t({
        english: "Please complete all required fields before continuing",
        vietnamese: "Vui lòng điền đầy đủ các trường bắt buộc trước khi tiếp tục"
      }));
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
      toast.error(t({
        english: "Job information is missing",
        vietnamese: "Thông tin công việc bị thiếu"
      }));
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Pass all data to the onSubmit handler
      const success = await onSubmit(jobFormData, photoUploads, pricingOptions);
      
      if (!success) {
        setIsSubmitting(false);
        toast.error(t({
          english: "There was a problem processing your payment. Please try again.",
          vietnamese: "Có vấn đề khi xử lý thanh toán của bạn. Vui lòng thử lại."
        }));
        // If success is false, we don't navigate away so user can try again
      }
      // On success, the parent component will handle navigation
    } catch (error) {
      console.error('Error submitting job post:', error);
      toast.error(t({
        english: "Error creating job post",
        vietnamese: "Lỗi khi tạo bài đăng công việc"
      }));
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
            pricingOptions={pricingOptions}
            setPricingOptions={setPricingOptions}
          />
        </CardContent>
      </TabsContent>
    </Tabs>
  );
};

export default EnhancedJobForm;
