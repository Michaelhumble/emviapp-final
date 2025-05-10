
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import JobPostForm from '@/components/posting/JobPostForm';
import { JobDetailsSubmission } from '@/types/job';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

const PostJobFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleJobFormSubmit = (formData: JobDetailsSubmission) => {
    console.log("Job form data:", formData);
    
    // Store form data in session storage to be retrieved in the pricing page
    sessionStorage.setItem('jobPostFormData', JSON.stringify(formData));
    
    // Navigate to pricing selection page
    navigate('/post-job/pricing');
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {t("Create Your Job Post", "Tạo tin tuyển dụng của bạn")}
        </h1>

        <Card className="p-6">
          <JobPostForm onSubmit={handleJobFormSubmit} />
        </Card>
      </div>
    </Layout>
  );
};

export default PostJobFormPage;
