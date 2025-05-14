
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/auth';
import { JobFormValues } from '@/components/posting/job/JobForm';
import { Container } from '@/components/ui/container';
import { Layout } from '@/components/layout';
import AuthPostGuard from '@/components/posting/AuthPostGuard';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';

const JobPost: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values: JobFormValues) => {
    setIsSubmitting(true);
    
    // Store the form data in session storage for the pricing page
    sessionStorage.setItem('jobFormData', JSON.stringify(values));
    
    // Simulate API call timing
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/post-job/pricing');
    }, 500);
  };

  return (
    <Layout>
      <Helmet>
        <title>Post a Job | EmviApp</title>
      </Helmet>
      <Container className="py-8">
        <h1 className="text-3xl font-playfair mb-8">Post a Job</h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
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
