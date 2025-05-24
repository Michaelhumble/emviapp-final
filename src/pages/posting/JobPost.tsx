
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ConsolidatedJobTemplateSelector from '@/components/job-posting-new/ConsolidatedJobTemplateSelector';
import ConsolidatedJobForm from '@/components/job-posting-new/ConsolidatedJobForm';
import PricingSelectionStep from '@/components/job-posting-new/PricingSelectionStep';
import { usePostPayment } from '@/hooks/usePostPayment';
import { PricingOptions } from '@/utils/posting/types';
import { toast } from 'sonner';

type FlowStep = 'template' | 'form' | 'pricing' | 'processing';

interface JobFormData {
  title: string;
  salonName: string;
  location: string;
  employmentType: string;
  description: string;
  vietnameseDescription?: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  compensationType?: string;
  compensationDetails?: string;
  benefits?: string[];
  profession: string;
}

const JobPost = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FlowStep>('template');
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [jobFormData, setJobFormData] = useState<JobFormData | null>(null);
  const { initiatePayment, isLoading } = usePostPayment();

  const handleTemplateSelect = (profession: string) => {
    console.log('Profession selected:', profession);
    setSelectedProfession(profession);
    setCurrentStep('form');
  };

  const handleFormSubmit = (formData: JobFormData) => {
    console.log('Job form submitted:', formData);
    setJobFormData(formData);
    setCurrentStep('pricing');
  };

  const handlePricingSelect = async (pricingOptions: PricingOptions) => {
    if (!jobFormData) {
      toast.error('Job data is missing');
      return;
    }

    setCurrentStep('processing');
    
    try {
      console.log('Processing payment with:', { jobFormData, pricingOptions });

      // Transform the form data to match expected format
      const jobData = {
        title: jobFormData.title,
        salonName: jobFormData.salonName,
        company: jobFormData.salonName,
        location: jobFormData.location,
        employment_type: jobFormData.employmentType,
        compensation_type: jobFormData.compensationType,
        compensation_details: jobFormData.compensationDetails,
        jobDescription: jobFormData.description,
        vietnameseDescription: jobFormData.vietnameseDescription,
        description: jobFormData.description,
        vietnamese_description: jobFormData.vietnameseDescription,
        contact_info: {
          owner_name: jobFormData.contactName,
          phone: jobFormData.contactPhone,
          email: jobFormData.contactEmail
        },
        benefits: jobFormData.benefits || [],
        profession: jobFormData.profession
      };

      const result = await initiatePayment('job', jobData, pricingOptions);
      
      if (result.success) {
        toast.success('Job posting created successfully!', {
          description: 'Redirecting to listings page...'
        });
        navigate('/jobs');
      } else if (result.waitlisted) {
        toast.info('Added to Diamond tier waitlist', {
          description: 'Our team will contact you soon.'
        });
        navigate('/jobs');
      } else {
        toast.error('Failed to submit job posting', {
          description: result.error || 'Please try again or contact support.'
        });
        setCurrentStep('pricing'); // Go back to pricing step
      }
    } catch (error) {
      console.error('Job posting error:', error);
      toast.error('An error occurred', {
        description: 'Please try again later.'
      });
      setCurrentStep('pricing'); // Go back to pricing step
    }
  };

  const handleBackToTemplates = () => {
    setSelectedProfession(null);
    setJobFormData(null);
    setCurrentStep('template');
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'template':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent leading-tight">
                  Build Your Beauty Empire: Start with the Perfect Hire.
                </h1>
                <p className="font-inter text-lg md:text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                  Unlock the most beautiful job posting experience ever built for the beauty industry. Select your profession below to begin.
                </p>
                <div className="flex items-center justify-center gap-2 text-purple-600 font-medium animate-pulse">
                  <span className="text-2xl">🚀</span>
                  <p className="text-base md:text-lg bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent font-semibold">
                    1,000+ salons have found top talent on Emvi.App — be the next success story.
                  </p>
                </div>
              </div>
              
              <ConsolidatedJobTemplateSelector 
                onTemplateSelect={handleTemplateSelect} 
                isSubmitting={isLoading}
              />
            </div>
          </div>
        );
      
      case 'form':
        return selectedProfession ? (
          <ConsolidatedJobForm 
            selectedProfession={selectedProfession}
            onSubmit={handleFormSubmit}
            onBack={handleBackToTemplates}
            isSubmitting={isLoading}
          />
        ) : null;
      
      case 'pricing':
        return (
          <PricingSelectionStep
            onBack={handleBackToForm}
            onPricingSelect={handlePricingSelect}
            isSubmitting={isLoading}
          />
        );
      
      case 'processing':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold mb-2">Processing Your Job Posting</h2>
              <p className="text-gray-600">Please wait while we process your payment and create your listing...</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Post a Job - Premium Job Posting | EmviApp</title>
        <meta name="description" content="Post your job with our premium job posting experience - find the perfect beauty professional" />
      </Helmet>
      
      {renderCurrentStep()}
    </Layout>
  );
};

export default JobPost;
