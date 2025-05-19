
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { Card } from '@/components/ui/card';
import JobTemplateSelector from '@/components/posting/job/JobTemplateSelector';
import { JobTemplateType } from '@/utils/jobs/jobTemplates';
import { usePostPayment } from '@/hooks/usePostPayment';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { PricingProvider } from '@/context/pricing'; // [SUNSHINE FIX] Import PricingProvider

const CreateJobPosting = () => {
  const navigate = useNavigate();
  const { initiatePayment, isLoading: isPaymentLoading } = usePostPayment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<JobFormValues | null>(null);
  const [selectedTemplateType, setSelectedTemplateType] = useState<JobTemplateType | null>(null);
  const [step, setStep] = useState<'template' | 'form'>('template');

  const handleTemplateSelect = (template: JobFormValues, templateType: JobTemplateType) => {
    setSelectedTemplate(template);
    setSelectedTemplateType(templateType);
    setStep('form');
    window.scrollTo(0, 0);
  };

  // Initial pricing options
  const initialPricingOptions: PricingOptions = {
    selectedPricingTier: 'premium' as JobPricingTier,
    durationMonths: 1,
    autoRenew: true,
    isFirstPost: true,
    isNationwide: false
  };

  const handleSubmit = async (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => {
    try {
      setIsSubmitting(true);
      console.log('Form submitted:', data);
      console.log('Pricing options:', pricingOptions);
      
      // Convert form data to the expected format for the API
      const jobDetails = {
        title: data.title,
        description: data.description,
        vietnamese_description: data.vietnameseDescription,
        location: data.location,
        employment_type: data.jobType, // Updated from employmentType to jobType
        compensation_type: data.compensation_type, // Use snake_case as per schema
        compensation_details: data.compensation_details, // Use snake_case as per schema
        weekly_pay: data.weekly_pay, // Use snake_case as per schema
        has_housing: data.has_housing, // Use snake_case as per schema
        has_wax_room: data.has_wax_room, // Use snake_case as per schema
        owner_will_train: data.owner_will_train, // Use snake_case as per schema
        no_supply_deduction: data.no_supply_deduction, // Use snake_case as per schema
        contact_info: {
          owner_name: data.contactName,
          phone: data.contactPhone,
          email: data.contactEmail,
        },
        post_type: 'job'
      };
      
      // Initiate payment with our consolidated hook
      const result = await initiatePayment('job', jobDetails, pricingOptions);
      
      if (result.success) {
        return true;
      } else {
        toast.error('Error processing your job posting. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error creating job post');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToTemplates = () => {
    setStep('template');
  };

  return (
    <Layout>
      <Helmet>
        <title>Create Job Posting | EmviApp</title>
        <meta 
          name="description" 
          content="Create a new job posting to find qualified beauty professionals for your salon."
        />
      </Helmet>
      <div className="container max-w-4xl mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Create Job Posting</h1>
          <p className="text-gray-600">Find your perfect employee</p>
        </div>
        
        <Card className="bg-white shadow-md rounded-lg p-6">
          {step === 'template' ? (
            <JobTemplateSelector onTemplateSelect={handleTemplateSelect} />
          ) : (
            // [SUNSHINE FIX] Added PricingProvider to wrap EnhancedJobForm
            <PricingProvider initialOptions={initialPricingOptions}>
              <EnhancedJobForm 
                onSubmit={handleSubmit}
                initialTemplate={selectedTemplate || undefined}
                onBack={handleBackToTemplates}
                isCustomTemplate={selectedTemplateType === 'custom'}
                maxPhotos={5} // Set maximum photos to 5
                onStepChange={(step) => console.log(`Changed to step ${step}`)}
              />
            </PricingProvider>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default CreateJobPosting;
