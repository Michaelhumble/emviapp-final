
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import FreeJobForm from '@/components/free-posting/FreeJobForm';

const PostJobFree = () => {
  return (
    <Layout>
      <Helmet>
        <title>Post a Free Job | EmviApp</title>
        <meta name="description" content="Post your job listing for free and connect with talented beauty professionals" />
      </Helmet>
      
      <FreeJobForm />
    </Layout>
  );
};

export default PostJobFree;
