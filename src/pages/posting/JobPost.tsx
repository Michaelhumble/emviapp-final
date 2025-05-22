import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from '@/components/posting/job/jobFormSchema';
import PostWizardLayout from '@/components/layout/PostWizardLayout';
import BasicInfoSection from '@/components/posting/sections/BasicInfoSection';
import LocationSection from '@/components/posting/sections/LocationSection';
import DetailsSection from '@/components/posting/sections/DetailsSection';
import CompensationSection from '@/components/posting/sections/CompensationSection';
import ContactInfoSection from '@/components/posting/sections/ContactInfoSection';
import PhotoUploadSection from '@/components/posting/sections/PhotoUploadSection';
import ReviewSection from '@/components/posting/sections/ReviewSection';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from '@/hooks/useTranslation';
import { uploadImage } from '@/utils/uploadImage';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { useSession } from "next-auth/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { UploadSection } from '@/components/posting/sections/UploadSection';
import { showSuccessToast, showErrorToast } from '@/utils/toastUtils';
import { useRouter } from '@/hooks/useRouter';

const steps = ['basic', 'location', 'details', 'compensation', 'contact', 'photos', 'review'];

const JobPost: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { push } = useRouter();
  const isMobile = useIsMobile();
  const { data: session } = useSession();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expressMode, setExpressMode] = useState(false);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'free' as JobPricingTier,
    durationMonths: 1,
  });

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      jobTitle: '',
      employmentType: '',
      city: '',
      state: '',
      zipCode: '',
      address: '',
      salaryRangeFrom: '',
      salaryRangeTo: '',
      salaryType: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      description: '',
      companyName: '',
      experienceLevel: '',
    },
    mode: "onChange",
  });

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    const step = steps[currentStep];
    
    if (expressMode) {
      const isLastStep = currentStep === steps.length - 1;

      return (
        <UploadSection
          uploads={photoUploads}
          setUploads={setPhotoUploads}
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
          isLastStep={isLastStep}
        />
      );
    }

    switch (step) {
      case 'basic':
        return <BasicInfoSection control={form.control} onNext={handleNextStep} />;
      case 'location':
        return <LocationSection control={form.control} onNext={handleNextStep} onPrevious={handlePreviousStep} />;
      case 'details':
        return <DetailsSection control={form.control} onNext={handleNextStep} onPrevious={handlePreviousStep} />;
      case 'compensation':
        return <CompensationSection control={form.control} onNext={handleNextStep} onPrevious={handlePreviousStep} />;
      case 'contact':
        return <ContactInfoSection control={form.control} onNext={handleNextStep} onPrevious={handlePreviousStep} />;
      case 'photos':
        return (
          <PhotoUploadSection 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            onPrevious={handlePreviousStep}
            onNext={handleNextStep}
            isLastStep={currentStep === steps.length - 1}
          />
        );
      case 'review':
        return <ReviewSection formValues={form.getValues()} photoUploads={photoUploads} onPrevious={handlePreviousStep} onSubmit={handleSubmit} />;
      default:
        return <div>{t({english: 'Unknown step', vietnamese: 'Bước không xác định'})}</div>;
    }
  };

  const handleSubmit = async () => {
    if (!session?.user?.email) {
      showErrorToast(
        t({ english: 'Authentication required', vietnamese: 'Yêu cầu xác thực' }),
        t({ english: 'Please sign in to post a job.', vietnamese: 'Vui lòng đăng nhập để đăng tin tuyển dụng.' })
      );
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload images
      const imageUrls = [];
      for (const file of photoUploads) {
        try {
          const imageUrl = await uploadImage(file, (progress) => {
            console.log(`Uploading ${file.name}: ${progress}%`);
          });
          imageUrls.push(imageUrl);
        } catch (uploadError) {
          console.error("Failed to upload image:", uploadError);
          showErrorToast(
            t({ english: 'Image upload failed', vietnamese: 'Tải ảnh lên thất bại' }),
            t({ english: 'Please try again or use a different image.', vietnamese: 'Vui lòng thử lại hoặc sử dụng một hình ảnh khác.' })
          );
          setIsSubmitting(false);
          return;
        }
      }

      // 2. Prepare form data
      const formData = form.getValues();
      const postData = {
        ...formData,
        imageUrls: imageUrls,
        pricingOptions: pricingOptions,
        email: session.user.email,
      };

      // 3. Post data to API
      const response = await fetch('/api/postJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        showSuccessToast(
          t({ english: 'Job posted successfully!', vietnamese: 'Đăng tin tuyển dụng thành công!' }),
          t({ english: 'Your job is now live.', vietnamese: 'Tin tuyển dụng của bạn đã được đăng.' })
        );
        push('/jobs');
      } else {
        const errorData = await response.json();
        console.error("Failed to post job:", errorData);
        showErrorToast(
          t({ english: 'Job posting failed', vietnamese: 'Đăng tin tuyển dụng thất bại' }),
          t({ english: errorData.message || 'Please check your information and try again.' , vietnamese: 'Vui lòng kiểm tra thông tin của bạn và thử lại.' })
        );
      }
    } catch (error: any) {
      console.error("Error during job posting:", error);
      showErrorToast(
        t({ english: 'An unexpected error occurred', vietnamese: 'Đã xảy ra lỗi không mong muốn' }),
        t({ english: error.message || 'Please try again later.', vietnamese: 'Vui lòng thử lại sau.' })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleExpressMode = () => {
    setExpressMode(!expressMode);
  };

  return (
    <PostWizardLayout 
      currentStep={currentStep + 1} 
      totalSteps={steps.length}
      expressMode={expressMode}
      onToggleExpressMode={toggleExpressMode}
    >
      {renderCurrentStep()}

      {isMobile && !expressMode && (
        <div className="sticky bottom-0 bg-white p-4 flex justify-between items-center border-t">
          <Button 
            variant="outline" 
            onClick={handlePreviousStep} 
            disabled={currentStep === 0}
          >
            {t({ english: 'Previous', vietnamese: 'Trước' })}
          </Button>
          <Button 
            onClick={handleNextStep} 
            disabled={currentStep === steps.length - 1}
          >
            {currentStep === steps.length - 1 ? 
              t({ english: 'Submit', vietnamese: 'Gửi' }) : 
              t({ english: 'Next', vietnamese: 'Tiếp theo' })
            }
          </Button>
        </div>
      )}
    </PostWizardLayout>
  );
};

export default JobPost;
