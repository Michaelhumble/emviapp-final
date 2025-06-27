
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import EditFreeJobForm from '@/components/free-posting/EditFreeJobForm';

const EditFreeJob = () => {
  return (
    <Layout>
      <Helmet>
        <title>Edit Job | EmviApp</title>
        <meta name="description" content="Edit your job posting" />
      </Helmet>
      
      <EditFreeJobForm />
    </Layout>
  );
};

export default EditFreeJob;
