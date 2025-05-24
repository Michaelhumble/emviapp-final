
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Jobs = () => {
  return (
    <Layout>
      <Helmet>
        <title>Jobs - EmviApp</title>
        <meta name="description" content="Find beauty industry jobs and career opportunities" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">Jobs</h1>
        <p className="text-center text-gray-600">Find your next opportunity in the beauty industry</p>
      </div>
    </Layout>
  );
};

export default Jobs;
