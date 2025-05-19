
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JobFormValues } from './jobFormSchema';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { ReviewAndPaymentSection } from '@/components/posting/sections/ReviewAndPaymentSection';
import { CardContent } from '@/components/ui/card';
import JobForm from './JobForm';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { useJobPosting } from '@/context/JobPostingContext';

interface EnhancedJobFormProps {
  // Props for both legacy and context modes
  onSubmit: (data: JobFormValues, photoUploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  onBack?: () => void;
  initialTemplate?: JobFormValues;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
  
  // Flag to enable context API usage
  useContextAPI?: boolean;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ 
  onSubmit, 
  onBack, 
  initialTemplate,
  isCustomTemplate = false,
  maxPhotos = 5,
  useContextAPI = false
}) => {
  const { t } = useTranslation();
  
  // Local state for legacy mode
  const [activeTab, setActiveTab] = useState('job-details');
  const [jobFormData, setJobFormData] = useState<JobFormValues | null>(initialTemplate || null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'premium' as JobPricingTier,
    durationMonths: 1,
    autoRenew: true,
    isFirstPost: true,
    isNationwide: false
  });

  // Access context if enabled
  const jobPostingContext = useContextAPI ? useJobPosting() : null;
  
  // Initialize context from initialTemplate if provided
  useEffect(() => {
    if (useContextAPI && jobPostingContext && initialTemplate) {
      jobPostingContext.updateJobData(initialTemplate);
    }
  }, [useContextAPI, jobPostingContext, initialTemplate]);
  
  // Handle job form submission - Legacy Path
  const handleLegacyJobFormSubmit = (data: JobFormValues, uploads?: File[]) => {
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

    // Store job form data and proceed to review/payment tab
    setJobFormData(data);
    setActiveTab('review-payment');
  };
  
  // Handle job form submission - Context Path
  const handleContextJobFormSubmit = (data: JobFormValues, uploads?: File[]) => {
    if (!jobPostingContext) return; // Safety check
    
    // Validate required fields
    if (!data.title || !data.description || !data.location || !data.contactEmail) {
      toast.error(t({
        english: "Please complete all required fields before continuing",
        vietnamese: "Vui lòng điền đầy đủ các trường bắt buộc trước khi tiếp tục"
      }));
      return;
    }

    // Update context state
    jobPostingContext.updateJobData(data);
    
    if (uploads && uploads.length > 0) {
      jobPostingContext.setPhotoUploads(uploads);
    }
    
    // Validate form data in context
    jobPostingContext.validateForm();
    
    // Proceed to review tab
    setActiveTab('review-payment');
  };
  
  // Handle job form submission - Router
  const handleJobFormSubmit = (data: JobFormValues, uploads?: File[]) => {
    if (useContextAPI) {
      handleContextJobFormSubmit(data, uploads);
    } else {
      handleLegacyJobFormSubmit(data, uploads);
    }
  };

  // Handle payment submission - Legacy Path
  const handleLegacyPaymentSubmit = async () => {
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
  
  // Handle payment submission - Context Path
  const handleContextPaymentSubmit = async () => {
    if (!jobPostingContext) return; // Safety check
    
    try {
      // Use the parent component's onSubmit but with context data
      const success = await onSubmit(
        jobPostingContext.jobData, 
        jobPostingContext.photoUploads, 
        jobPostingContext.pricingOptions
      );
      
      if (!success) {
        jobPostingContext.submissionFailure(t({
          english: "There was a problem processing your payment",
          vietnamese: "Có vấn đề khi xử lý thanh toán của bạn"
        }));
        
        toast.error(t({
          english: "There was a problem processing your payment. Please try again.",
          vietnamese: "Có vấn đề khi xử lý thanh toán của bạn. Vui lòng thử lại."
        }));
      } else {
        jobPostingContext.submissionSuccess();
      }
    } catch (error) {
      console.error('Error submitting job post:', error);
      jobPostingContext.submissionFailure(error.message);
      toast.error(t({
        english: "Error creating job post",
        vietnamese: "Lỗi khi tạo bài đăng công việc"
      }));
    }
  };
  
  // Handle payment submission - Router
  const handlePaymentSubmit = () => {
    if (useContextAPI) {
      return handleContextPaymentSubmit();
    } else {
      return handleLegacyPaymentSubmit();
    }
  };

  // Handle back button - Legacy Path
  const handleLegacyBackToEdit = () => {
    setActiveTab('job-details');
  };
  
  // Handle back button - Context Path
  const handleContextBackToEdit = () => {
    if (!jobPostingContext) return; // Safety check
    
    jobPostingContext.navigateBack();
    setActiveTab('job-details');
  };
  
  // Handle back button - Router
  const handleBackToEdit = () => {
    if (useContextAPI) {
      handleContextBackToEdit();
    } else {
      handleLegacyBackToEdit();
    }
  };
  
  // Update pricing options - Context Path
  const handleContextPricingOptionsChange = (options: PricingOptions) => {
    if (!jobPostingContext) return; // Safety check
    
    jobPostingContext.updatePricingOptions(options);
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
            photoUploads={useContextAPI && jobPostingContext ? jobPostingContext.photoUploads : photoUploads}
            setPhotoUploads={useContextAPI && jobPostingContext ? jobPostingContext.setPhotoUploads : setPhotoUploads}
            initialValues={useContextAPI && jobPostingContext ? jobPostingContext.jobData : (jobFormData || initialTemplate)}
            isCustomTemplate={isCustomTemplate}
            maxPhotos={maxPhotos}
            useContextAPI={useContextAPI}
          />
        </CardContent>
      </TabsContent>
      
      <TabsContent value="review-payment" className="space-y-4">
        <CardContent className="p-0 sm:p-2">
          <ReviewAndPaymentSection 
            formData={useContextAPI && jobPostingContext ? jobPostingContext.jobData : jobFormData} 
            photoUploads={useContextAPI && jobPostingContext ? jobPostingContext.photoUploads : photoUploads}
            onBack={onBack || handleBackToEdit} 
            onSubmit={handlePaymentSubmit}
            isSubmitting={useContextAPI && jobPostingContext ? jobPostingContext.ui.isSubmitting : isSubmitting}
            pricingOptions={useContextAPI && jobPostingContext ? jobPostingContext.pricingOptions : pricingOptions}
            setPricingOptions={useContextAPI && jobPostingContext ? handleContextPricingOptionsChange : setPricingOptions}
            useContextAPI={useContextAPI}
          />
        </CardContent>
      </TabsContent>
    </Tabs>
  );
};

export default EnhancedJobForm;
