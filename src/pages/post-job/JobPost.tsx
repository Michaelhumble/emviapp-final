
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/auth';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { Container } from '@/components/ui/container';
import { Layout } from '@/components/layout';
import AuthPostGuard from '@/components/posting/AuthPostGuard';
import JobForm from '@/components/posting/job/JobForm';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';
import PostHeader from '@/components/posting/PostHeader';

const JobPost: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userProfile } = useAuth();
  const { isVietnamese, t } = useTranslation();
  const formText = isVietnamese ? jobFormVi : jobFormEn;
  
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
        
        // In production, you would:
        // for (const file of photoUploads) {
        //   const url = await uploadToBucket(file);
        //   imageUrls.push(url);
        // }
      }
      
      // Add image URLs to form data
      const formData = {
        ...values,
        images: imageUrls
      };
      
      // Store the form data in session storage for the pricing page
      sessionStorage.setItem('jobFormData', JSON.stringify(formData));
      
      toast({
        title: isVietnamese ? "Thành công" : "Success",
        description: isVietnamese 
          ? "Thông tin công việc đã được lưu. Hãy chọn gói đăng tin."
          : "Your job information has been saved. Let's choose a pricing plan.",
      });
      
      // Navigate to pricing page
      navigate('/post-job/pricing');
    } catch (error) {
      console.error('Error submitting job post:', error);
      toast({
        title: isVietnamese ? "Lỗi" : "Error",
        description: isVietnamese
          ? "Đã xảy ra lỗi khi lưu thông tin. Vui lòng thử lại."
          : "There was a problem saving your job post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{formText.title} | EmviApp</title>
      </Helmet>
      <Container className="py-8">
        <PostHeader 
          title={formText.title}
          subtitle={isVietnamese 
            ? "Hãy cho chúng tôi biết về công việc bạn cần tuyển, chúng tôi sẽ tìm ứng viên phù hợp cho bạn."
            : "Tell us about the job you're hiring for, and we'll help you find the perfect candidates."
          }
        />
        <AuthPostGuard>
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm border">
            <JobForm
              onSubmit={handleSubmit}
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              isSubmitting={isSubmitting}
              defaultValues={{
                title: '',
                location: '',
                type: '',
                description: '',
                contactEmail: userProfile?.email || '',
                contactPhone: userProfile?.phone || ''
              }}
            />
          </div>
        </AuthPostGuard>
      </Container>
    </Layout>
  );
};

export default JobPost;
