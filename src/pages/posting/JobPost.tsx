
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PostWizardLayout from '@/components/posting/PostWizardLayout';
import { JobForm } from '@/components/posting/job/JobForm';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'sonner';

const JobPost = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting job post:', formData);
      
      // Simulating a submission process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(t({
        english: 'Job post submitted successfully!',
        vietnamese: 'Đã đăng tin tuyển dụng thành công!'
      }));
      
      // Navigate to success page or redirect back to jobs
      navigate('/post-success');
    } catch (error) {
      console.error('Error submitting job post:', error);
      toast.error(t({
        english: 'Error submitting job post. Please try again.',
        vietnamese: 'Lỗi khi đăng tin tuyển dụng. Vui lòng thử lại.'
      }));
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
        <JobForm
          onSubmit={handleSubmit}
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
          isSubmitting={isSubmitting}
        />
      </PostWizardLayout>
    </Layout>
  );
};

export default JobPost;
