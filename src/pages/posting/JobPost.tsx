
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import JobTemplates from '@/components/legacy-job-templates/JobTemplates';
import SinglePageJobForm from '@/components/job-posting-new/SinglePageJobForm';
import { usePostPayment } from '@/hooks/usePostPayment';
import { toast } from 'sonner';

const JobPost = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { initiatePayment } = usePostPayment();

  const handleTemplateSelect = async (template: any) => {
    console.log('Template selected:', template);
    // Just proceed to the form - no pre-filling
    setShowForm(true);
  };

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting job form data:', formData);

      // Transform the form data to match expected format
      const jobData = {
        title: `${formData.profession.replace('-', ' ')} Position`,
        salonName: formData.salonName,
        company: formData.salonName,
        location: formData.location,
        employment_type: formData.employmentType,
        compensation_type: formData.compensationType,
        compensation_details: formData.compensationDetails,
        jobDescription: formData.jobDescriptionEnglish,
        vietnameseDescription: formData.jobDescriptionVietnamese,
        description: formData.jobDescriptionEnglish,
        vietnamese_description: formData.jobDescriptionVietnamese,
        contact_info: {
          owner_name: formData.contactName,
          phone: formData.contactPhone,
          email: formData.contactEmail
        },
        benefits: formData.benefits || [],
        profession: formData.profession,
        // Photo uploads will be handled separately in a real implementation
        photos: formData.photoUploads || []
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
        navigate('/dashboard');
      } else if (result.waitlisted) {
        toast.info('Added to Diamond tier waitlist', {
          description: 'Our team will contact you soon.'
        });
        navigate('/dashboard');
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
  };

  return (
    <Layout>
      <Helmet>
        <title>Post a Job - Premium Job Posting | EmviApp</title>
        <meta name="description" content="Post your job with our premium job posting experience - find the perfect beauty professional" />
      </Helmet>
      
      {!showForm ? (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Post Your Job</h1>
              <p className="text-xl text-gray-600">Find the perfect beauty professional with our premium job posting system</p>
            </div>
            
            <JobTemplates 
              onTemplateSelect={handleTemplateSelect} 
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      ) : (
        <SinglePageJobForm 
          onSubmit={handleFormSubmit}
          onBack={handleBackToTemplates}
          isSubmitting={isSubmitting}
        />
      )}
    </Layout>
  );
};

export default JobPost;
