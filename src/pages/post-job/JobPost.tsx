
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/auth';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { Container } from '@/components/ui/container';
import { Layout } from '@/components/layout';
import AuthPostGuard from '@/components/posting/AuthPostGuard';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { useToast } from '@/hooks/use-toast';

const JobPost: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userProfile } = useAuth();
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: JobFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Store the form data in session storage for the pricing page
      sessionStorage.setItem('jobFormData', JSON.stringify(values));
      
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
        <title>Post a Job | EmviApp</title>
      </Helmet>
      <Container className="py-8">
        <h1 className="text-3xl font-playfair mb-8">Post a Job</h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <AuthPostGuard>
            <EnhancedJobForm
              onSubmit={handleSubmit}
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              isSubmitting={isSubmitting}
            />
          </AuthPostGuard>
        </div>
      </Container>
    </Layout>
  );
};

export default JobPost;
