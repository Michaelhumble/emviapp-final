
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import PostWizardLayout from '@/components/posting/PostWizardLayout';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import RequirementsSection from '@/components/posting/sections/RequirementsSection';
import CompensationSection from '@/components/posting/sections/CompensationSection';
import ContactInformationSection from '@/components/posting/sections/ContactInformationSection';
import ReviewAndPaymentSection from '@/components/posting/sections/ReviewAndPaymentSection';
import JobPostPaymentStep from '@/components/posting/sections/JobPostPaymentStep';
import JobPostConfirmation from '@/components/posting/sections/JobPostConfirmation';
import AuthPostGuard from '@/components/posting/AuthPostGuard';
import { Job } from '@/types/job';
import { PricingOptions } from '@/utils/posting/types';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { StripeProvider } from '@/components/providers/StripeProvider';
import { useJobPaymentHandler, JobPaymentData } from '@/hooks/useJobPaymentHandler';
import { toast } from 'sonner';

const JobPost = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { t } = useTranslation();
  const { handlePaymentSetup, isProcessing: isPaymentProcessing } = useJobPaymentHandler();

  const [currentStep, setCurrentStep] = useState(1);
  const [jobDetails, setJobDetails] = useState<Partial<Job>>({
    title: '',
    location: '',
    employment_type: 'full-time',
    description: '',
    requirements: [] as string[],
    compensation_type: 'hourly',
    compensation_details: '',
    contact_info: {
      owner_name: userProfile?.full_name || '',
      phone: userProfile?.phone || '',
      email: userProfile?.email || ''
    }
  });
  
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
    extendedDuration: false
  });

  const [selectedPricing, setSelectedPricing] = useState("standard");
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);
  const [autoRenew, setAutoRenew] = useState(false);
  const [jobSubmitted, setJobSubmitted] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);

  const totalSteps = 6; // Increased to include payment step

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
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
  
  const handlePricingChange = (pricingId: string) => {
    setSelectedPricing(pricingId);
  };

  const handlePaymentComplete = async (paymentMethodId: string, autoRenew: boolean) => {
    setPaymentMethodId(paymentMethodId);
    setAutoRenew(autoRenew);
    
    // Submit the job with payment info
    const result = await handleSubmit();
    if (result) {
      nextStep();
    }
  };

  const handleSubmit = async () => {
    // Prepare the job data with pricing tier info
    const jobData = {
      ...jobDetails,
      pricingTier: selectedPricing,
      auto_renew: autoRenew
    };

    try {
      // First, create the job post in the database
      // This would be replaced with your actual API call to create the job
      const { data, error } = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      })
      .then(res => res.json());

      if (error) {
        throw new Error(error.message || 'Failed to create job post');
      }

      const createdJobId = data?.id;
      setJobId(createdJobId);

      // Now set up the payment method
      if (paymentMethodId) {
        const paymentData: JobPaymentData = {
          jobId: createdJobId,
          paymentMethodId,
          pricingTier: selectedPricing,
          autoRenew
        };

        const paymentResult = await handlePaymentSetup(paymentData);
        
        if (!paymentResult.success) {
          toast.error(t('Failed to process payment information', 'Không thể xử lý thông tin thanh toán'));
          return false;
        }
      }

      setJobSubmitted(true);
      return true;
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error(t('Failed to create job post', 'Không thể tạo bài đăng việc làm'));
      return false;
    }
  };

  // For demonstration purposes, simulate the API call to create the job
  // This would be replaced with a real API call in a production application
  const simulateJobCreation = async () => {
    return new Promise<{id: string}>(resolve => {
      setTimeout(() => {
        resolve({ id: 'job_' + Date.now() });
      }, 1000);
    });
  };

  return (
    <AuthPostGuard>
      <div className="container mx-auto px-4">
        <Link to="/" className="text-sm text-gray-500 hover:text-purple-600 underline mt-4 block">
          {t('← Back to Home', '← Trở về Trang chủ')}
        </Link>
      </div>
      <StripeProvider>
        <PostWizardLayout 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          title={t("Post a Job", "Đăng Tin Tuyển Thợ")}
          onNext={nextStep}
          onPrev={prevStep}
          onSubmit={jobSubmitted ? undefined : handleSubmit}
          isSubmitting={isPaymentProcessing}
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
              formData={jobDetails}
              onNextStep={nextStep}
              onPrevStep={prevStep}
              isFirstPost={pricingOptions.isFirstPost}
              pricingOptions={pricingOptions}
              selectedPricing={selectedPricing}
              onPricingChange={handlePricingChange}
            />
          )}
          {currentStep === 6 && paymentMethodId ? (
            <JobPostConfirmation
              jobTitle={jobDetails.title || ''}
              autoRenew={autoRenew}
              pricingTier={selectedPricing}
            />
          ) : currentStep === 6 && (
            <JobPostPaymentStep
              onComplete={handlePaymentComplete}
              pricingTier={selectedPricing}
              isFreeTier={selectedPricing === 'free'}
            />
          )}
        </PostWizardLayout>
      </StripeProvider>
    </AuthPostGuard>
  );
};

export default JobPost;
