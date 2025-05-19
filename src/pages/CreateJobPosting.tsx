
import React from 'react';
import { Helmet } from 'react-helmet-async';
import PostWizardLayout from '@/components/posting/PostWizardLayout';
import { Card } from '@/components/ui/card';
import { PricingProvider } from '@/context/pricing/PricingProvider';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import { useNavigate } from 'react-router-dom';
import { usePostPayment } from '@/hooks/usePostPayment';
import { toast } from 'sonner';

const CreateJobPosting = () => {
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();
  const [currentStep, setCurrentStep] = React.useState(1);

  const handleSubmit = async (
    data: JobFormValues, 
    uploads: File[], 
    pricingOptions: PricingOptions,
    exactUiPrice?: number
  ) => {
    try {
      console.log('Form submitted:', data);
      console.log('Pricing options:', pricingOptions);
      console.log('Exact UI price:', exactUiPrice);
      
      // Convert form data to the expected format for the API
      const jobDetails = {
        title: data.title,
        description: data.description,
        vietnamese_description: data.vietnameseDescription,
        location: data.location,
        employment_type: data.jobType, 
        compensation_type: data.compensation_type,
        compensation_details: data.compensation_details,
        weekly_pay: data.weekly_pay,
        has_housing: data.has_housing,
        has_wax_room: data.has_wax_room,
        owner_will_train: data.owner_will_train,
        no_supply_deduction: data.no_supply_deduction,
        contact_info: {
          owner_name: data.contactName,
          phone: data.contactPhone,
          email: data.contactEmail,
        },
        post_type: 'job'
      };
      
      // Initiate payment with our consolidated hook - pass the exact UI price
      const result = await initiatePayment('job', jobDetails, pricingOptions, exactUiPrice);
      
      if (result.success) {
        toast.success('Job post created successfully!');
        navigate('/dashboard');
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
    setCurrentStep(step);
  };

  // Set the default pricing options
  const defaultPricingOptions: PricingOptions = {
    selectedPricingTier: 'premium',
    durationMonths: 1,
    autoRenew: true,
    isFirstPost: true,
    isNationwide: false
  };

  return (
    <PricingProvider initialOptions={defaultPricingOptions}>
      <PostWizardLayout currentStep={currentStep} totalSteps={3}>
        <Helmet>
          <title>Create Job Posting | EmviApp</title>
          <meta 
            name="description" 
            content="Create a job posting on EmviApp to find qualified beauty professionals."
          />
        </Helmet>

        <Card className="bg-white shadow-md rounded-lg p-6">
          <EnhancedJobForm 
            onSubmit={handleSubmit}
            onStepChange={handleStepChange}
            maxPhotos={5}
          />
        </Card>
      </PostWizardLayout>
    </PricingProvider>
  );
};

export default CreateJobPosting;
