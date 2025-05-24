
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy - EmviApp</title>
        <meta name="description" content="Privacy policy and data protection information" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">Privacy Policy</h1>
        <p className="text-center text-gray-600">How we protect and handle your data</p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
