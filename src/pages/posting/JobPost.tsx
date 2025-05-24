
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ConsolidatedJobTemplateSelector from '@/components/job-posting-new/ConsolidatedJobTemplateSelector';
import ConsolidatedJobForm from '@/components/job-posting-new/ConsolidatedJobForm';
import { usePostPayment } from '@/hooks/usePostPayment';
import { usePremiumPricingFlag } from '@/hooks/usePremiumPricingFlag';
import { toast } from 'sonner';

const JobPost = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const { initiatePayment } = usePostPayment();
  const { config: pricingConfig, togglePremiumPricing } = usePremiumPricingFlag();

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
      
      {/* Development Testing Controls */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-20 right-4 z-50">
          <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-lg">
            <div className="text-sm font-semibold text-gray-700 mb-2">
              Pricing Test Controls
            </div>
            <button
              onClick={togglePremiumPricing}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                pricingConfig.enabled
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {pricingConfig.enabled ? 'Disable Premium' : 'Enable Premium'}
            </button>
            <div className="text-xs text-gray-500 mt-1">
              URL: ?premium_pricing=true
            </div>
          </div>
        </div>
      )}
      
      {!selectedProfession ? (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent leading-tight" 
                  style={{ textShadow: '0 2px 4px rgba(147, 51, 234, 0.1)' }}>
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
