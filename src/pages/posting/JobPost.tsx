
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import JobTemplates from '@/components/legacy-job-templates/JobTemplates';
import BillionDollarJobForm from '@/components/job-posting-new/BillionDollarJobForm';
import { usePostPayment } from '@/hooks/usePostPayment';
import { toast } from 'sonner';

const JobPost = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const { initiatePayment } = usePostPayment();

  const handleTemplateSelect = async (template: any) => {
    console.log('Template selected:', template);
    
    // Validate required fields
    if (!template.title || !template.salonName && !template.company) {
      toast.error('Missing required fields', {
        description: 'Please ensure job title and company name are provided.'
      });
      return;
    }
    
    // Set the selected template and show the form
    setSelectedTemplate(template);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      // Combine template data with form data
      const jobData = {
        ...selectedTemplate,
        ...formData
      };

      // Default pricing options for job posting
      const pricingOptions = {
        selectedPricingTier: 'standard' as const,
        durationMonths: 1,
        autoRenew: false,
        isFirstPost: false
      };

      // Initiate payment and job posting
      const result = await initiatePayment('job', jobData, pricingOptions);
      
      if (result.success) {
        toast.success('Job posting initiated successfully!', {
          description: 'You will be redirected to complete payment.'
        });
      } else if (result.waitlisted) {
        toast.info('Added to Diamond tier waitlist', {
          description: 'Our team will contact you soon.'
        });
      } else {
        toast.error('Failed to submit job posting', {
          description: 'Please try again or contact support.'
        });
      }
    } catch (error) {
      console.error('Job posting error:', error);
      toast.error('An error occurred', {
        description: 'Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToTemplates = () => {
    setShowForm(false);
    setSelectedTemplate(null);
  };

  return (
    <Layout>
      <Helmet>
        <title>Post a Job - Billion Dollar Experience | EmviApp</title>
        <meta name="description" content="Post your job with our premium billion-dollar job posting experience" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {!showForm ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">Post Your Job</h1>
                <p className="text-xl text-gray-600">Find the perfect beauty professional with our premium job posting system</p>
              </div>
              
              <JobTemplates 
                onTemplateSelect={handleTemplateSelect} 
                isSubmitting={isSubmitting}
              />
            </>
          ) : (
            <BillionDollarJobForm 
              initialData={selectedTemplate}
              onSubmit={handleFormSubmit}
              onBack={handleBackToTemplates}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JobPost;
