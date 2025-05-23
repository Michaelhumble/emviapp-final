
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import BillionDollarJobForm from '@/components/job-posting-new/BillionDollarJobForm';

const PostJobBillion = () => {
  return (
    <Layout>
      <Helmet>
        <title>Billion Dollar Job Posting | EmviApp</title>
        <meta name="description" content="Create your premium job posting with our advanced billion dollar form" />
      </Helmet>
      
      <BillionDollarJobForm />
    </Layout>
  );
};

export default PostJobBillion;
