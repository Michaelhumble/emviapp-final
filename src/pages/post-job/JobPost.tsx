
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/auth';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { Container } from '@/components/ui/container';
import { Layout } from '@/components/layout';
import AuthPostGuard from '@/components/posting/AuthPostGuard';
import JobForm from '@/components/posting/job/JobForm';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';

const JobPost: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { isVietnamese } = useTranslation();
  
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: JobFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Upload all photos to Supabase, if any
      const imageUrls: string[] = [];
      
      if (photoUploads.length > 0) {
        // This would be handled by JobPostPhotoUpload's uploadToBucket function in production
        // For now, we'll just use the file names as placeholders
        imageUrls.push(...photoUploads.map(file => URL.createObjectURL(file)));
      }
      
      // Add image URLs to form data
      const formData = {
        ...values,
        images: imageUrls
      };
      
      // Store the form data in session storage for the pricing page
      sessionStorage.setItem('jobFormData', JSON.stringify(formData));
      
      toast.success(
        isVietnamese 
          ? "Thông tin công việc đã được lưu. Hãy chọn gói đăng tin."
          : "Your job information has been saved. Let's choose a pricing plan."
      );
      
      // Navigate to pricing page
      navigate('/post-job/pricing');
    } catch (error) {
      console.error('Error submitting job post:', error);
      toast.error(
        isVietnamese
          ? "Đã xảy ra lỗi khi lưu thông tin. Vui lòng thử lại."
          : "There was a problem saving your job post. Please try again."
      );
    } finally {
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
        <AuthPostGuard>
          <JobForm
            onSubmit={handleSubmit}
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            isSubmitting={isSubmitting}
            defaultValues={{
              contactEmail: userProfile?.email || '',
              contactPhone: userProfile?.phone || ''
            }}
          />
        </AuthPostGuard>
      </Container>
    </Layout>
  );
};

export default JobPost;
