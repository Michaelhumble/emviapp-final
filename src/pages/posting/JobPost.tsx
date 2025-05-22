
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PostWizardLayout from '@/components/posting/PostWizardLayout';
import { Card } from '@/components/ui/card';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { useNavigate } from 'react-router-dom';
import { usePostPayment } from '@/hooks/usePostPayment';
import { toast } from 'sonner';
import { PricingOptions } from '@/utils/posting/types';
import ConfettiExplosion from '@/components/ui/ConfettiExplosion';
import JobPreview from '@/components/posting/JobPreview';
import ThankYouModal from '@/components/posting/ThankYouModal';

const JobPost = () => {
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();
  const [currentStep, setCurrentStep] = useState(1);
  const [expressMode, setExpressMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [previewData, setPreviewData] = useState<JobFormValues | null>(null);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'premium',
    durationMonths: 1,
    autoRenew: true,
    isFirstPost: true
  });

  const handleSubmit = async (formData: JobFormValues, uploads: File[], pricing: PricingOptions) => {
    if (expressMode && currentStep === 1) {
      // In Express Mode, first submission moves to preview
      setPreviewData(formData);
      setPhotoUploads(uploads);
      setPricingOptions(pricing);
      setCurrentStep(2);
      return true; // Return true to prevent form reset
    }
    
    try {
      console.log('Form submitted with data:', formData);
      console.log('Salon name in data:', formData.salonName);
      console.log('Pricing options:', pricing);
      
      // Convert form data to the expected format for the API
      const jobDetails = {
        title: formData.title,
        description: formData.description,
        vietnamese_description: formData.vietnameseDescription,
        location: formData.location,
        employment_type: formData.jobType, 
        compensation_type: formData.compensation_type,
        compensation_details: formData.compensation_details,
        weekly_pay: formData.weekly_pay,
        has_housing: formData.has_housing,
        has_wax_room: formData.has_wax_room,
        owner_will_train: formData.owner_will_train,
        no_supply_deduction: formData.no_supply_deduction,
        salary_range: formData.salary_range,
        experience_level: formData.experience_level,
        salonName: formData.salonName,
        contact_info: {
          owner_name: formData.contactName,
          phone: formData.contactPhone,
          email: formData.contactEmail,
        },
        post_type: 'job'
      };
      
      // Initiate payment with our consolidated hook
      const result = await initiatePayment('job', jobDetails, pricing);
      
      if (result.success) {
        setShowConfetti(true);
        setShowThankYouModal(true);
        
        return true;
      } else {
        toast.error('Error processing your job posting. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error creating job post');
      return false;
    }
  };

  const handleStepChange = (step: number) => {
    console.log(`Changing step to ${step}`);
    setCurrentStep(step);
  };

  const handleToggleExpressMode = () => {
    setExpressMode(!expressMode);
    // Reset to step 1 when toggling mode
    setCurrentStep(1);
    setPreviewData(null);
  };
  
  const handleEditFromPreview = (section?: string) => {
    setCurrentStep(1);
    // Optional: Pass the section to focus on when returning to the form
    console.log(`Editing section: ${section}`);
  };
  
  const handlePublishFromPreview = async () => {
    if (previewData) {
      await handleSubmit(previewData, photoUploads, pricingOptions);
    }
  };
  
  const handleBoostPost = () => {
    setShowThankYouModal(false);
    // Navigate to boost page or show boost options
    navigate('/dashboard');
  };

  // Define default values for the form, ensuring salonName is included
  const defaultFormValues: Partial<JobFormValues> = {
    salonName: '',
    contactEmail: '',
    contactName: '',
    contactPhone: '',
    salary_range: '',
    experience_level: ''
  };

  return (
    <PostWizardLayout 
      currentStep={currentStep} 
      totalSteps={expressMode ? 2 : 4} 
      expressMode={expressMode} 
      onToggleExpressMode={handleToggleExpressMode}
    >
      <Helmet>
        <title>Create Job Listing | EmviApp</title>
        <meta 
          name="description" 
          content="Create a job posting on EmviApp to find qualified beauty professionals."
        />
      </Helmet>

      {currentStep === 1 && (
        <Card className="bg-white shadow-md rounded-lg p-6">
          <EnhancedJobForm 
            onSubmit={handleSubmit}
            onStepChange={handleStepChange}
            maxPhotos={5}
            defaultFormValues={defaultFormValues}
            expressMode={expressMode}
          />
        </Card>
      )}
      
      {currentStep === 2 && expressMode && previewData && (
        <JobPreview 
          jobData={previewData}
          onEdit={handleEditFromPreview}
          onPublish={handlePublishFromPreview}
          isPublishing={isLoading}
        />
      )}
      
      {/* Celebration confetti effect on successful job post */}
      {showConfetti && <ConfettiExplosion duration={3000} particleCount={100} />}
      
      {/* Thank you modal after successful submission */}
      <ThankYouModal
        open={showThankYouModal}
        onOpenChange={setShowThankYouModal}
        postType="job"
        onBoostClick={handleBoostPost}
      />
    </PostWizardLayout>
  );
};

export default JobPost;
