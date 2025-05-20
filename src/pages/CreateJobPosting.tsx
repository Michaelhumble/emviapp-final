
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { Card } from '@/components/ui/card';
import { PricingProvider } from '@/context/pricing/PricingProvider';
import PremiumJobPostForm from '@/components/posting/job/PremiumJobPostForm';
import { PricingOptions } from '@/utils/posting/types';
import { usePostPayment } from '@/hooks/usePostPayment';
import { JobDetailsSubmission } from '@/types/job';

const CreateJobPosting = () => {
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = async (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => {
    try {
      console.log('Form submitted:', data);
      console.log('Pricing options:', pricingOptions);
      
      // Convert form data to the expected format for the API
      const jobDetails: JobDetailsSubmission = {
        title: data.title,
        description: data.description,
        vietnameseDescription: data.vietnameseDescription,
        location: data.location,
        jobType: data.jobType, 
        compensation_type: data.compensation_type,
        compensation_details: data.compensation_details,
        weekly_pay: data.weekly_pay,
        has_housing: data.has_housing,
        has_wax_room: data.has_wax_room,
        owner_will_train: data.owner_will_train,
        no_supply_deduction: data.no_supply_deduction,
        salonName: data.salonName,
        contactName: data.contactName,
        contactPhone: data.contactPhone,
        contactEmail: data.contactEmail,
        requirements: data.requirements || [],
        specialties: data.specialties || [],
        post_type: 'job'
      };
      
      // Initiate payment with our consolidated hook
      const result = await initiatePayment('job', jobDetails, pricingOptions);
      
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
      <Layout>
        <Helmet>
          <title>Create Job Posting | EmviApp</title>
          <meta 
            name="description" 
            content="Create a job posting on EmviApp to find qualified beauty professionals."
          />
        </Helmet>

        <div className="container max-w-4xl mx-auto py-8 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold font-playfair mb-2">Create Job Posting</h1>
            <p className="text-gray-600">Find qualified beauty professionals for your business</p>
          </div>
          
          <Card className="bg-white shadow-md rounded-lg border-0 overflow-hidden">
            <PremiumJobPostForm 
              onSubmit={handleSubmit}
              onStepChange={handleStepChange}
              maxPhotos={5}
              isLoading={isLoading}
            />
          </Card>
        </div>
      </Layout>
    </PricingProvider>
  );
};

export default CreateJobPosting;
