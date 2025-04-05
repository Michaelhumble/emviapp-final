
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

const JobPost = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [jobDetails, setJobDetails] = useState<Partial<Job>>({
    title: '',
    location: '',
    employment_type: 'full-time',
    description: '',
    requirements: '',
    compensation_type: 'hourly',
    compensation_details: '',
    contact_info: {
      owner_name: userProfile?.full_name || '',
      phone: userProfile?.phone || '',
      email: userProfile?.email || ''
    }
  });
  
  // Pricing options state
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    isFirstPost: true,
    isNationwide: false,
    fastSalePackage: false,
    showAtTop: false
  });

  const totalSteps = 5;

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
  
  const handleFastSalePackageChange = (checked: boolean) => {
    setPricingOptions({ ...pricingOptions, fastSalePackage: checked });
  };
  
  const handleShowAtTopChange = (checked: boolean) => {
    setPricingOptions({ ...pricingOptions, showAtTop: checked });
  };

  const handleSubmit = async () => {
    navigate('/checkout');
  };

  return (
    <AuthPostGuard>
      <PostWizardLayout 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        title="Post a Job"
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
            formData={jobDetails}
            onNextStep={nextStep}
            onPrevStep={prevStep}
            isFirstPost={pricingOptions.isFirstPost}
            pricingOptions={pricingOptions}
          />
        )}
      </PostWizardLayout>
    </AuthPostGuard>
  );
};

export default JobPost;
