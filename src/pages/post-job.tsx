
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import CleanJobPostingForm from '@/components/job-posting/CleanJobPostingForm';

const PostJob = () => {
  return (
    <Layout>
      <Helmet>
        <title>Post a Job | EmviApp</title>
        <meta name="description" content="Post a job listing to find qualified beauty professionals" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
        <CleanJobPostingForm />
      </div>
    </Layout>
  );
};

export default PostJob;
