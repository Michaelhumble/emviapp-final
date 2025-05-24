
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const TermsOfService = () => {
  return (
    <Layout>
      <Helmet>
        <title>Terms of Service - EmviApp</title>
        <meta name="description" content="Terms and conditions for using EmviApp" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">Terms of Service</h1>
        <p className="text-center text-gray-600">Terms and conditions for using our platform</p>
      </div>
    </Layout>
  );
};

export default TermsOfService;
