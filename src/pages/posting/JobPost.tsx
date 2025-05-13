
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import AuthPostGuard from '@/components/posting/AuthPostGuard';
import { Helmet } from 'react-helmet';

const JobPost = () => {
  const navigate = useNavigate();
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (values: JobFormValues) => {
    setIsSubmitting(true);
    
    // Save form data to localStorage for persistence between steps
    localStorage.setItem('job_post_data', JSON.stringify(values));
    
    // For photo uploads, you would typically upload these to your server/storage
    // and get back URLs to store with the job post.
    
    // Navigate to pricing page after short delay to simulate processing
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/pricing');
    }, 500);
  };
  
  return (
    <AuthPostGuard>
      <Layout>
        <Helmet>
          <title>Post a Job | EmviApp</title>
        </Helmet>
        <div className="container mx-auto py-8 px-4">
          <EnhancedJobForm
            onSubmit={handleSubmit}
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            isSubmitting={isSubmitting}
          />
        </div>
      </Layout>
    </AuthPostGuard>
  );
};

export default JobPost;
