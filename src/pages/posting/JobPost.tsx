
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import PostWizardLayout from '@/components/posting/PostWizardLayout';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'sonner';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import WalletConfetti from '@/components/customer/WalletConfetti';

const JobPost = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (formData: JobFormValues, photoUploads: File[], pricingOptions: PricingOptions) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting job post:', formData);
      console.log('Pricing options:', pricingOptions);
      
      // Store the values temporarily in sessionStorage
      sessionStorage.setItem('jobPostData', JSON.stringify(formData));
      sessionStorage.setItem('jobPricingOptions', JSON.stringify(pricingOptions));
      
      // Simulate success and show confetti
      setTimeout(() => {
        setShowConfetti(true);
      }, 500);
      
      return true;
    } catch (error) {
      console.error('Error submitting job post:', error);
      toast.error(t({
        english: 'Error submitting job post. Please try again.',
        vietnamese: 'Lỗi khi đăng tin tuyển dụng. Vui lòng thử lại.'
      }));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormStepChange = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <Layout>
      <Helmet>
        <title>
          {t({
            english: 'Post a Job | EmviApp',
            vietnamese: 'Đăng Tin Tuyển Dụng | EmviApp'
          })}
        </title>
        <meta 
          name="description" 
          content={t({
            english: 'Create your job posting on EmviApp to find skilled professionals in the beauty industry.',
            vietnamese: 'Tạo tin đăng tuyển dụng trên EmviApp để tìm các chuyên gia có kỹ năng trong ngành làm đẹp.'
          })}
        />
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PostWizardLayout currentStep={currentStep} totalSteps={3}>
          <EnhancedJobForm 
            onSubmit={handleSubmit} 
            onStepChange={handleFormStepChange}
          />
          {showConfetti && (
            <WalletConfetti 
              trigger={showConfetti} 
              onDone={() => {
                // Redirect after confetti animation
                setTimeout(() => {
                  navigate('/dashboard');
                  toast.success(t({
                    english: 'Job posted successfully!',
                    vietnamese: 'Đăng tin tuyển dụng thành công!'
                  }));
                }, 1500);
              }} 
            />
          )}
        </PostWizardLayout>
      </motion.div>
    </Layout>
  );
};

export default JobPost;
