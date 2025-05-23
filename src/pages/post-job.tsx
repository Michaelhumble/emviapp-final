
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import CleanJobForm from '@/components/posting/job/CleanJobForm';

const PostJob = () => {
  return (
    <Layout>
      <Helmet>
        <title>Post a Job | EmviApp</title>
        <meta name="description" content="Post a job listing to find qualified beauty professionals" />
      </Helmet>
      
      <CleanJobForm />
    </Layout>
  );
};

export default PostJob;
