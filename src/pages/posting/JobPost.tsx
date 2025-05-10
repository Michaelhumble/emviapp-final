import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import PostWizardLayout from '@/components/posting/PostWizardLayout';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import RequirementsSection from '@/components/posting/sections/RequirementsSection';
import CompensationSection from '@/components/posting/sections/CompensationSection';
import ContactInformationSection from '@/components/posting/sections/ContactInformationSection';
import ReviewAndPaymentSection from '@/components/posting/sections/ReviewAndPaymentSection';
import AuthPostGuard from '@/components/posting/AuthPostGuard';
import { Job } from '@/types/job';
import { PricingOptions } from '@/utils/posting/types';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { usePostPayment } from '@/hooks/usePostPayment';
import { toast } from 'sonner';

const JobPost = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { t } = useTranslation();
  const { initiatePayment, isLoading, setIsSubmitting } = usePostPayment();

  const [currentStep, setCurrentStep] = useState(1);
  const [jobDetails, setJobDetails] = useState<Partial<Job>>({
    title: '',
    location: '',
    employment_type: 'full-time',
    description: '',
    requirements: [] as string[], // Initialize as an empty string array
    compensation_type: 'hourly',
    compensation_details: '',
    contact_info: {
      owner_name: userProfile?.full_name || '',
      phone: userProfile?.phone || '',
      email: userProfile?.email || ''
    }
  });
  
  // Pricing options state with all required properties
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    isFirstPost: true,
    isNationwide: false,
    fastSalePackage: false,
    showAtTop: false,
    isHotListing: false,
    isUrgent: false,
    bundleWithJobPost: false,
    bundleWithSalonPost: false,
    boostVisibility: false,
    featuredListing: false,
    extendedDuration: false,
    selectedPricingTier: 'standard', // Default pricing tier
    autoRenew: false // Initialize autoRenew
  });

  const totalSteps = 5;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final submission
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDetailsChange = (details: Partial<Job>) => {
    setJobDetails({ ...jobDetails, ...details });
  };

  const handleContactChange = (contactInfo: Job['contact_info']) => {
    setJobDetails({ ...jobDetails, contact_info: contactInfo });
  };
  
  const handleNationwideChange = (checked: boolean) => {
    setPricingOptions({ ...pricingOptions, isNationwide: checked });
  };
  
  const handleFastSalePackageChange = (checked: boolean) => {
    setPricingOptions({ ...pricingOptions, fastSalePackage: checked });
  };
  
  const handleShowAtTopChange = (checked: boolean) => {
    setPricingOptions({ ...pricingOptions, showAtTop: checked });
  };
  
  const handlePricingChange = (pricingTier: string) => {
    setPricingOptions({ ...pricingOptions, selectedPricingTier: pricingTier });
  };
  
  const handleUpdatePricing = (options: Partial<PricingOptions>) => {
    setPricingOptions({ ...pricingOptions, ...options });
  };

  const handleSubmit = async () => {
    try {
      // Show loading state
      toast.loading(
        t("Processing your submission...", "Đang xử lý đơn của bạn..."),
        { id: "job-submission" }
      );
      
      // Pass both job details and pricing options to the payment hook
      const response = await initiatePayment('job', jobDetails, pricingOptions);
      setIsSubmitting(false);
      
      if (response.success) {
        // Check if redirect property exists and use it if it does
        if (response.redirect) {
          window.location.href = response.redirect;
        } else {
          // Otherwise navigate to the dashboard
          navigate('/dashboard', { state: { status: 'success' } });
        }
      } else {
        // Error handling
        const errorMessage = response.data?.message || 'Job post failed. Please try again.';
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Job post submission error:", error);
      toast.error(
        t("Submission error", "Lỗi khi gửi đơn"),
        { description: t("Please check your details and try again", "Vui lòng kiểm tra thông tin của bạn và thử lại") }
      );
    }
  };

  const [autoRenew, setAutoRenew] = useState(pricingOptions.autoRenew);
  const [savePaymentMethod, setSavePaymentMethod] = useState(false);

  const handleAutoRenewChange = (checked: boolean) => {
    setAutoRenew(checked);
    onUpdatePricing({ autoRenew: checked });
  };

  return (
    <AuthPostGuard>
      <div className="container mx-auto px-4">
        <Link to="/" className="text-sm text-gray-500 hover:text-purple-600 underline mt-4 block">
          {t('← Back to Home', '← Trở về Trang chủ')}
        </Link>
      </div>
      <PostWizardLayout 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        title={t("Post a Job", "Đăng Tin Tuyển Thợ")}
        onNext={nextStep}
        onPrev={prevStep}
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      >
        {currentStep === 1 && (
          <JobDetailsSection 
            details={jobDetails} 
            onChange={handleDetailsChange} 
          />
        )}
        {currentStep === 2 && (
          <RequirementsSection 
            details={jobDetails} 
            onChange={handleDetailsChange} 
          />
        )}
        {currentStep === 3 && (
          <CompensationSection 
            details={jobDetails} 
            onChange={handleDetailsChange} 
          />
        )}
        {currentStep === 4 && (
          <ContactInformationSection 
            contactInfo={jobDetails.contact_info}
            onChange={handleContactChange}
          />
        )}
        {currentStep === 5 && (
          <ReviewAndPaymentSection 
            postType="job"
            jobData={jobDetails}
            onNextStep={nextStep}
            onPrevStep={prevStep}
            isFirstPost={pricingOptions.isFirstPost}
            pricingOptions={pricingOptions}
            onPricingChange={handlePricingChange}
            onUpdatePricing={handleUpdatePricing}
            isSubmitting={isLoading}
          />
        )}
      </PostWizardLayout>
    </AuthPostGuard>
  );
};

export default JobPost;
