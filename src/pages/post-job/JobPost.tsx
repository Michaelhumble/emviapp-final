
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

const JobPost: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userProfile } = useAuth();
  const { isVietnamese } = useTranslation();
  const t = isVietnamese ? jobFormVi : jobFormEn;
  
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
        title: "Success",
        description: "Your job information has been saved. Let's choose a pricing plan.",
      });
      
      // Navigate to pricing page
      navigate('/post-job/pricing');
    } catch (error) {
      console.error('Error submitting job post:', error);
      toast({
        title: "Error",
        description: "There was a problem saving your job post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{t.title} | EmviApp</title>
      </Helmet>
      <Container className="py-8">
        <AuthPostGuard>
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
        </AuthPostGuard>
      </Container>
    </Layout>
  );
};

export default JobPost;
