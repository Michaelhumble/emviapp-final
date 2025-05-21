
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { Card } from '@/components/ui/card';
import JobTemplateSelector from '@/components/posting/job/JobTemplateSelector';
import { JobTemplateType } from '@/utils/jobs/jobTemplates';
import { usePostPayment } from '@/hooks/usePostPayment';
import { PricingOptions } from '@/utils/posting/types';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { PricingProvider } from '@/context/pricing/PricingProvider';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CreateJobPosting = () => {
  const navigate = useNavigate();
  const { initiatePayment, isLoading: isPaymentLoading } = usePostPayment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<JobFormValues | null>(null);
  const [selectedTemplateType, setSelectedTemplateType] = useState<JobTemplateType | null>(null);
  const [step, setStep] = useState<'template' | 'form'>('template');
  const [currentFormStep, setCurrentFormStep] = useState(1);

  const handleTemplateSelect = (template: JobFormValues, templateType: JobTemplateType) => {
    setSelectedTemplate(template);
    setSelectedTemplateType(templateType);
    setStep('form');
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => {
    try {
      setIsSubmitting(true);
      setPaymentError(null);
      console.log('Form submitted:', data);
      console.log('Pricing options:', pricingOptions);
      
      // Validate form data before submission
      if (!data.title || !data.contactEmail || !data.location) {
        toast.error('Please fill in all required fields');
        setIsSubmitting(false);
        return false;
      }
      
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
      
      // Generate a unique ID for idempotency 
      const postingId = crypto.randomUUID();
      
      // Initiate payment with our consolidated hook
      const result = await initiatePayment('job', jobDetails, pricingOptions, postingId);
      
      if (result.success) {
        toast.success('Job post created successfully!');
        navigate('/dashboard');
        return true;
      } else if (result.waitlisted) {
        toast.success('Your Diamond tier request has been submitted', {
          description: 'Our team will contact you soon to discuss your premium listing.'
        });
        navigate('/dashboard');
        return true;
      } else {
        const errorMessage = result.error || 'Error processing your job posting. Please try again.';
        setPaymentError(errorMessage);
        toast.error(errorMessage);
        return false;
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      const errorMessage = error.message || 'Error creating job post';
      setPaymentError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToTemplates = () => {
    setStep('template');
  };

  const handleStepChange = (step: number) => {
    setCurrentFormStep(step);
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
          <title>Post a Job | EmviApp</title>
          <meta 
            name="description" 
            content="Post a job on EmviApp. Find qualified beauty professionals for your business."
          />
        </Helmet>
        <div className="container max-w-4xl mx-auto py-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Post a Job</h1>
            <p className="text-gray-600">Find your perfect employee</p>
          </div>
          
          <Card className="bg-white shadow-md rounded-lg p-6">
            {paymentError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                <p className="font-medium">Payment Error:</p>
                <p>{paymentError}</p>
              </div>
            )}
            
            {isPaymentLoading || isSubmitting ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-purple-500 mb-4" />
                <h3 className="text-lg font-medium">Processing your job post</h3>
                <p className="text-gray-500 mt-2">Please wait while we process your request...</p>
              </div>
            ) : step === 'template' ? (
              <JobTemplateSelector onTemplateSelect={handleTemplateSelect} />
            ) : (
              <EnhancedJobForm 
                onSubmit={handleSubmit}
                initialTemplate={selectedTemplate || undefined}
                onBack={handleBackToTemplates}
                isCustomTemplate={selectedTemplateType === 'custom'}
                maxPhotos={5}
                onStepChange={handleStepChange}
              />
            )}
            
            {paymentError && (
              <div className="mt-4 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setPaymentError(null)}
                  className="text-sm"
                >
                  Try Again
                </Button>
              </div>
            )}
          </Card>
        </div>
      </Layout>
    </PricingProvider>
  );
};

export default CreateJobPosting;
