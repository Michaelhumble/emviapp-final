
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Pricing = () => {
  return (
    <Layout>
      <Helmet>
        <title>Pricing - EmviApp</title>
        <meta name="description" content="View our pricing plans for job posting and salon services" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">Pricing Plans</h1>
        <p className="text-center text-gray-600">Choose the perfect plan for your needs</p>
      </div>
    </Layout>
  );
};

export default Pricing;
