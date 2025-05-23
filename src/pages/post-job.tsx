
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import JobPostingWizard from '@/components/posting/job/JobPostingWizard';

const PostJob = () => {
  return (
    <Layout>
      <Helmet>
        <title>Post a Job | EmviApp</title>
        <meta name="description" content="Post a job listing to find qualified beauty professionals" />
      </Helmet>
      
      <JobPostingWizard />
    </Layout>
  );
};

export default PostJob;
