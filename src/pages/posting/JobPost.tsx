
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PostWizardLayout from '@/components/posting/PostWizardLayout';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'sonner';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';

const JobPost = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: JobFormValues, photoUploads: File[], pricingOptions: PricingOptions) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting job post:', formData);
      console.log('Pricing options:', pricingOptions);
      
      // Store the values temporarily in sessionStorage
      sessionStorage.setItem('jobPostData', JSON.stringify(formData));
      sessionStorage.setItem('jobPricingOptions', JSON.stringify(pricingOptions));
      
      // Don't immediately redirect to success page
      // We'll let the payment flow handle the redirect
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
      
      <PostWizardLayout>
        <EnhancedJobForm onSubmit={handleSubmit} />
      </PostWizardLayout>
    </Layout>
  );
};

export default JobPost;
