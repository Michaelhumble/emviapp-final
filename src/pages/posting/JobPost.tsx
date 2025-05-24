import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ConsolidatedJobTemplateSelector from '@/components/job-posting-new/ConsolidatedJobTemplateSelector';
import ConsolidatedJobForm from '@/components/job-posting-new/ConsolidatedJobForm';
import { usePostPayment } from '@/hooks/usePostPayment';
import { toast } from 'sonner';

const JobPost = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const { initiatePayment } = usePostPayment();

  const handleTemplateSelect = (profession: string) => {
    console.log('Profession selected:', profession);
    setSelectedProfession(profession);
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
        toast.success('Job posting created successfully!', {
          description: 'Redirecting to listings page...'
        });
        navigate('/listings');
      } else if (result.waitlisted) {
        toast.info('Added to Diamond tier waitlist', {
          description: 'Our team will contact you soon.'
        });
        navigate('/listings');
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
    setSelectedProfession(null);
  };

  return (
    <Layout>
      <Helmet>
        <title>Post a Job - Premium Job Posting | EmviApp</title>
        <meta name="description" content="Post your job with our premium job posting experience - find the perfect beauty professional" />
      </Helmet>
      
      {!selectedProfession ? (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent leading-tight">
                Build Your Beauty Empire: Start with the Perfect Hire.
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-6 max-w-4xl mx-auto leading-relaxed">
                Unlock the most beautiful job posting experience ever built for the beauty industry. Select your profession below to begin.
              </p>
              <div className="flex items-center justify-center gap-2 text-purple-600 font-medium">
                <span className="text-2xl">🚀</span>
                <p className="text-lg">
                  1,000+ salons have found top talent on Emvi.App — be the next success story.
                </p>
              </div>
            </div>
            
            <ConsolidatedJobTemplateSelector 
              onTemplateSelect={handleTemplateSelect} 
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      ) : (
        <ConsolidatedJobForm 
          selectedProfession={selectedProfession}
          onSubmit={handleFormSubmit}
          onBack={handleBackToTemplates}
          isSubmitting={isSubmitting}
        />
      )}
    </Layout>
  );
};

export default JobPost;
