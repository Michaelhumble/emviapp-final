
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import BillionDollarJobForm from '@/components/job-posting-new/BillionDollarJobForm';
import { usePostPayment } from '@/hooks/usePostPayment';
import { toast } from 'sonner';

const PostJobBillion = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { initiatePayment } = usePostPayment();

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting job form data:', formData);

      // Default pricing options for job posting
      const pricingOptions = {
        selectedPricingTier: 'premium' as const,
        durationMonths: 1,
        autoRenew: false,
        isFirstPost: false
      };

      // Initiate payment and job posting
      const result = await initiatePayment('job', formData, pricingOptions);
      
      if (result.success) {
        toast.success('Job posting submitted successfully!', {
          description: 'You will be redirected to complete payment.'
        });
        // Redirect to dashboard or confirmation page
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

  const handleBack = () => {
    // Navigate back to the job posting template selection
    navigate('/post-job');
  };

  return (
    <Layout>
      <Helmet>
        <title>Billion Dollar Job Posting | EmviApp</title>
        <meta name="description" content="Create your premium job posting with our advanced billion dollar form" />
      </Helmet>
      
      <BillionDollarJobForm 
        onSubmit={handleFormSubmit}
        onBack={handleBack}
        isSubmitting={isSubmitting}
      />
    </Layout>
  );
};

export default PostJobBillion;
