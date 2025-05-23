
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import SimpleJobForm from '@/components/experimental-job-forms/SimpleJobForm';

const PostJobExperimental = () => {
  return (
    <Layout>
      <Helmet>
        <title>Experimental Job Posting | EmviApp</title>
        <meta name="description" content="Testing new simplified job posting form" />
      </Helmet>
      
      <SimpleJobForm />
    </Layout>
  );
};

export default PostJobExperimental;
