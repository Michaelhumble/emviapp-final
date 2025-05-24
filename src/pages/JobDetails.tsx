
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const JobDetails = () => {
  const { id } = useParams();
  
  return (
    <Layout>
      <Helmet>
        <title>Job Details - EmviApp</title>
        <meta name="description" content="View job details" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">Job Details</h1>
        <p className="text-center text-gray-600">Job ID: {id}</p>
      </div>
    </Layout>
  );
};

export default JobDetails;
