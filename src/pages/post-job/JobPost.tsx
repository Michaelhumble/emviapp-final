
import React, { useState } from 'react';
import JobForm, { JobFormValues } from '@/components/posting/job/JobForm';
import { Container } from '@/components/ui/container';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Helmet } from 'react-helmet';

const JobPost: React.FC = () => {
  const navigate = useNavigate();
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
