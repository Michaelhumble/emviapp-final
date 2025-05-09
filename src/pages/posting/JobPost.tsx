
import { useState } from 'react';
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

const JobPost = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { t } = useTranslation();

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
    // Here we would submit both job details and pricing options
    // For now, we'll just navigate to checkout
    navigate('/checkout', { 
      state: { 
        jobDetails,
        pricingOptions
      }
    });
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
          />
        )}
      </PostWizardLayout>
    </AuthPostGuard>
  );
};

export default JobPost;
