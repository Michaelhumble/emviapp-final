
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Container } from '@/components/ui/container';
import { Layout } from '@/components/layout';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import JobForm from '@/components/posting/job/JobForm';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from "sonner";

const JobPost: React.FC = () => {
  const navigate = useNavigate();
  const { isVietnamese } = useTranslation();
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values: JobFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Store the form data in session storage for the pricing page
      sessionStorage.setItem('jobFormData', JSON.stringify(values));
      
      toast.success(
        isVietnamese 
          ? "Thông tin công việc đã được lưu. Hãy chọn gói đăng tin." 
          : "Your job information has been saved. Let's choose a pricing plan."
      );
      
      // Simulate API call timing
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/post-job/pricing');
      }, 500);
    } catch (error) {
      console.error('Error saving job data:', error);
      toast.error(
        isVietnamese 
          ? "Có lỗi xảy ra. Vui lòng thử lại." 
          : "An error occurred. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{isVietnamese ? "Đăng Tin Tuyển Dụng | EmviApp" : "Post a Job | EmviApp"}</title>
        <meta 
          name="description" 
          content={isVietnamese 
            ? "Đăng tin tuyển dụng trên EmviApp để kết nối với những chuyên gia làm đẹp giỏi nhất." 
            : "Post your job on EmviApp to connect with top beauty professionals."}
        />
      </Helmet>
      <Container className="py-8">
        <JobForm 
          onSubmit={handleSubmit}
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
          isSubmitting={isSubmitting}
        />
      </Container>
    </Layout>
  );
};

export default JobPost;
